import {
  ErrorResponse,
  TGenericObject,
  TJob,
  useDMSS,
} from '@development-framework/dm-core'
import { Button, Typography } from '@equinor/eds-core-react'
import { AxiosError, AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { JobForm } from './JobForm'

type TCreateJobEntityProps = {
  jobEntityDestination: string
  defaultJobEntity?: TJob
  onCreate: (jobEntityId: string) => void
  defaultJobOutputTarget?: string
}

/**
 * A component for creating a Job entity.
 *
 * If the defaultJobEntity is included as props, this is the entity that will be uplaoded to DMSS when clicking on Create.
 * If the defaultJobEntity is NOT included, a form is used to create input fields to let the user create the job entity.
 *
 *

 * @param jobEntityDestination Where job entity will be uploaded. Must be an address, either to a Package (PROTOCOL://DATA SOURCE/ROOT PACKAGE/SUB PACKAGE) or to an attribute inside an object (PROTOCOL://DATA SOURCE/$123-123-123.list[2].job).
 * @param onCreate Function to run when Job entity is created.
 * @param defaultJobEntity An optional default entity.
 * @param defaultJobOutputTarget An optional value for outputTarget in the job entity to create. This value is used in the job handler to specify where results of the job should be uploaded/inserted.
 */
export const CreateJobEntity = (props: TCreateJobEntityProps) => {
  const {
    jobEntityDestination,
    onCreate,
    defaultJobEntity,
    defaultJobOutputTarget,
  } = props

  const DmssApi = useDMSS()
  // const { dataSource: dataSourceId } = splitAddress(jobEntityDestination)
  const [createdJobEntity, setCreatedJobEntity] = useState<TGenericObject>()

  const createJobEntity = (jobEntityFormData: TJob) => {
    if (defaultJobOutputTarget && !jobEntityFormData.outputTarget) {
      jobEntityFormData = {
        ...jobEntityFormData,
        outputTarget: defaultJobOutputTarget,
      }
    }

    const updateDocument = (
      jobEntityDestination: string,
      jobEntityFormData: TJob
    ) => {
      DmssApi.documentUpdate({
        idAddress: jobEntityDestination,
        data: JSON.stringify(jobEntityFormData),
      })
        .then(() => {
          onCreate(jobEntityDestination)
          setCreatedJobEntity(jobEntityFormData)
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          console.error(error.response?.data)
        })
    }

    const addDocument = (
      jobEntityDestination: string,
      jobEntityFormData: TJob
    ) => {
      DmssApi.documentAdd({
        address: jobEntityDestination,
        document: JSON.stringify(jobEntityFormData),
      })
        .then(() => {
          // UID cannot be used until the job has been started
          // onCreate(`${dataSourceId}/$${response.data.uid}`)
          onCreate(jobEntityDestination)
          setCreatedJobEntity(jobEntityFormData)
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          console.error(error.response?.data)
        })
    }

    const addOrUpdateDocument = (
      jobExists: boolean,
      jobEntityDestination: string,
      jobEntityFormData: TJob
    ) => {
      if (jobExists) {
        updateDocument(jobEntityDestination, jobEntityFormData)
      } else {
        addDocument(jobEntityDestination, jobEntityFormData)
      }
    }

    DmssApi.documentCheck({
      address: jobEntityDestination,
    }).then((response: AxiosResponse) =>
      addOrUpdateDocument(
        response.data,
        jobEntityDestination,
        jobEntityFormData
      )
    )
  }

  if (createdJobEntity) return <></>

  return (
    <div>
      {defaultJobEntity ? (
        <div style={{ padding: '1rem' }}>
          <Typography variant={'h5'}>Create new job</Typography>

          <div>
            <p>
              This will create a new job with a default job entity. The job will
              be saved to the following destination:
            </p>

            <pre>{jobEntityDestination}</pre>
          </div>
          <Button
            onClick={() => {
              createJobEntity(defaultJobEntity)
            }}
          >
            Create new job
          </Button>
        </div>
      ) : (
        <JobForm
          onSubmit={(jobEntityFormData: TJob) => {
            createJobEntity(jobEntityFormData as TJob)
          }}
          defaultJobOutputTarget={defaultJobOutputTarget}
        />
      )}
    </div>
  )
}
