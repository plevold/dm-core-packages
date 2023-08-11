import {
  EBlueprint,
  ErrorResponse,
  Stack,
  TGenericObject,
  TJob,
  splitAddress,
  useDMSS,
} from '@development-framework/dm-core'
import { Button } from '@equinor/eds-core-react'
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
  const destinationIsAPackage: boolean = !(
    jobEntityDestination.includes('.') || jobEntityDestination.includes('[')
  )
  const { dataSource: dataSourceId } = splitAddress(jobEntityDestination)
  const [createdJobEntity, setCreatedJobEntity] = useState<TGenericObject>()

  const createJobEntity = (jobEntityFormData: TJob) => {
    if (defaultJobOutputTarget && !jobEntityFormData.outputTarget) {
      jobEntityFormData = {
        ...jobEntityFormData,
        outputTarget: defaultJobOutputTarget,
      }
    }
    if (destinationIsAPackage) {
      DmssApi.documentAdd({
        address: jobEntityDestination,
        document: JSON.stringify(jobEntityFormData),
      })
        .then((response: AxiosResponse) => {
          onCreate(`${dataSourceId}/$${response.data.uid}`)
          setCreatedJobEntity(jobEntityFormData)
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          console.error(error.response?.data)
        })
    } else {
      DmssApi.documentUpdate({
        idAddress: jobEntityDestination,
        data: JSON.stringify(jobEntityFormData),
      })
        .then((response: AxiosResponse<any>) => {
          onCreate(jobEntityDestination)
          setCreatedJobEntity(jobEntityFormData)
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          console.error(error.response?.data)
        })
    }
  }

  if (createdJobEntity) {
    return (
      <>
        <p>Job entity already created at location {jobEntityDestination} </p>
      </>
    )
  }

  return (
    <div>
      <Stack spacing={1}>
        <h3>Create new object of type: {EBlueprint.JOB}</h3>
        {defaultJobEntity ? (
          <>
            <p>
              Using default job entity. Will be saved to destination{' '}
              {jobEntityDestination}
            </p>
            <Button
              onClick={() => {
                createJobEntity(defaultJobEntity)
              }}
            >
              Create
            </Button>
          </>
        ) : (
          <JobForm
            onSubmit={(jobEntityFormData: TJob) => {
              createJobEntity(jobEntityFormData as TJob)
            }}
            defaultJobOutputTarget={defaultJobOutputTarget}
          />
        )}
      </Stack>
    </div>
  )
}