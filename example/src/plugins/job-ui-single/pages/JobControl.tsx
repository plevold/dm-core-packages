import {
  GetJobResultResponse,
  JobStatus,
  Loading,
  useJob,
} from '@development-framework/dm-core'
import React, { useEffect, useState } from 'react'
import { Button, Chip, Icon } from '@equinor/eds-core-react'
import { stop } from '@equinor/eds-icons'

export const JobControl = (props: { jobEntityId: string }) => {
  const { jobEntityId } = props
  const {
    start,
    error,
    isLoading,
    fetchResult,
    fetchStatusAndLogs,
    logs,
    status,
    remove,
  } = useJob(jobEntityId)
  const [result, setResult] = useState<GetJobResultResponse>()

  //run once when the object is rendered
  useEffect(() => {
    start()
  }, [])

  if (isLoading) return <Loading />
  if (error)
    return (
      <pre style={{ color: 'red', backgroundColor: 'palegreen' }}>
        {JSON.stringify(error, null, 2)}
      </pre>
    )

  return (
    <div>
      <Chip>Status: {status}</Chip>

      <Button onClick={() => remove()} variant="contained">
        <Icon data={stop}></Icon>
        Stop
      </Button>

      <button
        onClick={() => fetchStatusAndLogs()}
        disabled={status === JobStatus.NotStarted}
      >
        Refresh status and logs
      </button>
      <button
        onClick={() =>
          fetchResult().then((res: GetJobResultResponse) => setResult(res))
        }
        disabled={status === JobStatus.NotStarted}
      >
        Get results
      </button>

      <h4>Logs:</h4>
      <pre>{logs}</pre>

      <h4>Result:</h4>
      {result && (
        <>
          <pre>{result.message}</pre>
          <pre>{result.result}</pre>
        </>
      )}
    </div>
  )
}