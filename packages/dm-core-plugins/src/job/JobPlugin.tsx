import {
  EBlueprint,
  ErrorResponse,
  GetJobResultResponse,
  IUIPlugin,
  JobStatus,
  TJob,
  TJobHandler,
  TSchedule,
  useDMSS,
  useDocument,
  useJob,
} from '@development-framework/dm-core'
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Button, Card, Icon, Switch } from '@equinor/eds-core-react'
import { JobControlButton } from './JobControlButton'
import { expand_screen, refresh } from '@equinor/eds-icons'
import styled from 'styled-components'
import { AxiosError } from 'axios'
import { AuthContext } from 'react-oauth2-code-pkce'
import { CreateRecurringJob } from './CronJob'
import { JobLogsDialog } from './JobLogsDialog'
import { LogBlock } from './LogBlock'

const JobButtonWrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 0.5rem;
`

const JobLogBox = styled.div`
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

interface ITargetAddress {
  targetAddress: string
  addressScope?: 'local' | 'global'
}

interface JobPluginConfig {
  jobTargetAddress: ITargetAddress
  label: string
  runner: TJobHandler
  outputTarget: string
  jobInput: ITargetAddress
}

export const JobPlugin = (
  props: IUIPlugin & {
    config: JobPluginConfig
  }
) => {
  const {
    config,
    idReference,
  }: {
    config: JobPluginConfig
    idReference: string
  } = props
  const DmssApi = useDMSS()
  const emptyJob: TSchedule = {
    type: EBlueprint.CRON_JOB,
    cron: '0 8 * * *',
    startDate: '',
    endDate: '',
  }
  const jobTargetAddress = useMemo((): string => {
    if ((config.jobTargetAddress.addressScope ?? 'local') !== 'local') {
      return config.jobTargetAddress.targetAddress
    }
    if (['self', '.'].includes(config?.jobTargetAddress.targetAddress)) {
      return idReference
    }
    return idReference + config.jobTargetAddress.targetAddress
  }, [config])

  const jobInputAddress = useMemo((): string => {
    if ((config.jobInput.addressScope ?? 'local') !== 'local') {
      return config.jobInput.targetAddress
    }
    if (['self', '.'].includes(config.jobInput.targetAddress)) {
      return idReference
    }
    return idReference + config.jobInput.targetAddress
  }, [config])
  const { tokenData } = useContext(AuthContext)
  const username = tokenData?.preferred_username

  const [jobExists, setJobExists] = useState(false)
  const [result, setResult] = useState<GetJobResultResponse | null>(null)
  const [asCronJob, setAsCronJob] = useState<boolean>(false)
  const [jobSchedule, setJobSchedule] = useState<TSchedule>(emptyJob)
  const [showLogs, setShowLogs] = useState(false)
  const [showLogDialog, setShowLogDialog] = useState(false)

  const canSubmit =
    !asCronJob || Boolean(jobSchedule.startDate && jobSchedule.endDate)
  const {
    document: jobDocument,
    isLoading,
    error: jobEntityError,
    updateDocument,
  } = useDocument<TJob>(jobTargetAddress, 0, false)

  const { start, error, fetchResult, fetchStatusAndLogs, logs, status } =
    useJob(jobTargetAddress, jobDocument?.uid)

  const jobEntity: TJob = {
    label: config?.label,
    type: EBlueprint.JOB,
    status: JobStatus.NotStarted,
    triggeredBy: username ?? 'unknown user', // TODO: Add proper fallback
    applicationInput: {
      type: EBlueprint.REFERENCE,
      referenceType: 'link',
      address: jobInputAddress,
    },
    runner: config?.runner,
  }

  if (config?.outputTarget) jobEntity.outputTarget = config.outputTarget
  if (asCronJob)
    jobEntity.schedule = {
      type: EBlueprint.CRON_JOB,
      cron: jobSchedule.cron,
      startDate: jobSchedule.startDate,
      endDate: jobSchedule.endDate,
    }

  const addDocument = async (): Promise<unknown> => {
    return DmssApi.documentAdd({
      address: jobTargetAddress,
      document: JSON.stringify(jobEntity),
    }).catch((error: AxiosError<ErrorResponse>) => {
      console.error(error.response?.data)
    })
  }

  function createAndStartJob() {
    setResult(null)
    if (jobExists) {
      updateDocument(jobEntity, false).then(() => start())
      return
    }
    addDocument().then(() => {
      start().then(() => setJobExists(true))
    })
  }

  useEffect(() => {
    if (!jobDocument) return
    if (Object.keys(jobDocument).length) setJobExists(true)
    if (jobDocument.schedule) setJobSchedule(jobDocument.schedule)
  }, [isLoading, jobEntityError, jobDocument])

  return (
    <div>
      <Switch
        size="small"
        label="Recurring"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAsCronJob(e.target.checked)
        }
        checked={asCronJob}
      />
      {asCronJob && (
        <CreateRecurringJob
          cronJob={jobSchedule}
          close={() => setAsCronJob(false)}
          removeJob={() => setJobSchedule(emptyJob)}
          setCronJob={(e: TSchedule) => setJobSchedule(e)}
        />
      )}
      <JobButtonWrapper>
        <JobControlButton
          jobStatus={status}
          createJob={createAndStartJob}
          asCronJob={asCronJob}
          disabled={!canSubmit}
        />
        {status === JobStatus.Running && (
          <Button
            variant="outlined"
            onClick={() => fetchStatusAndLogs()}
            aria-label="Get job status"
          >
            <Icon data={refresh} />
          </Button>
        )}
        <Button
          onClick={() =>
            fetchResult().then((res: GetJobResultResponse) => setResult(res))
          }
          variant={'outlined'}
          disabled={status === JobStatus.NotStarted}
        >
          Get results
        </Button>
        <Button onClick={() => setShowLogs(!showLogs)} variant="ghost">
          {showLogs ? 'Hide' : 'Show'} logs
        </Button>
      </JobButtonWrapper>

      {status === JobStatus.Failed && (
        <Card variant="danger" style={{ marginTop: '8px' }}>
          <Card.Header>Job status: {status}</Card.Header>
        </Card>
      )}
      {showLogs && (
        <JobLogBox>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '.5rem',
            }}
          >
            <Button
              variant="ghost_icon"
              size={16}
              label="Expand logs"
              onClick={() => setShowLogDialog(true)}
              style={{ position: 'absolute', right: 0, top: -8 }}
            >
              <Icon data={expand_screen} />
            </Button>
            <LogBlock
              title="Logs"
              content={error ?? logs}
              style={{ maxWidth: '40rem', maxHeight: '20rem' }}
            />
            {result && (
              <LogBlock
                title="Result"
                content={result}
                style={{ maxWidth: '40rem', maxHeight: '20rem' }}
              />
            )}
          </div>
        </JobLogBox>
      )}
      <JobLogsDialog
        isOpen={showLogDialog}
        setIsOpen={setShowLogDialog}
        logs={logs}
        error={error}
        result={result}
      />
    </div>
  )
}
