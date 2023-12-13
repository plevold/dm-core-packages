import { Button, CircularProgress, Icon } from '@equinor/eds-core-react'
import { IconData, play, refresh, save, stop } from '@equinor/eds-icons'
import { JobStatus } from '@development-framework/dm-core'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'

export const JobControlButton = (props: {
  jobStatus: JobStatus
  createJob: () => void
  remove: () => void
  confirmRemove: () => void
  disableControls: boolean
  afterClick: () => void
  asCronJob: boolean
  exists: boolean
}) => {
  const {
    jobStatus,
    createJob,
    asCronJob,
    exists,
    remove,
    confirmRemove,
    disableControls,
    afterClick,
  } = props
  const [hovering, setHovering] = useState(false)
  const [buttonColor, setButtonColor] = useState<
    'primary' | 'secondary' | 'danger'
  >('primary')
  const [buttonIcon, setButtonIcon] = useState<IconData>(play)
  const buttonRef: MutableRefObject<HTMLButtonElement | undefined> = useRef()

  useEffect(() => {
    switch (jobStatus) {
      case JobStatus.Unknown:
        break
      case JobStatus.Completed:
      case JobStatus.Failed:
        setButtonColor('primary')
        setButtonIcon(asCronJob ? save : refresh)
        break
      case JobStatus.Running:
      case JobStatus.Starting:
      case JobStatus.Registered:
        setButtonColor('danger')
        setButtonIcon(stop)
        break
      default:
        setButtonColor('primary')
        setButtonIcon(asCronJob ? save : play)
    }
  }, [jobStatus, asCronJob])

  return (
    <Button
      variant='contained_icon'
      disabled={disableControls}
      aria-label='Run'
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      color={buttonColor}
      onClick={() => {
        if (
          (
            [
              JobStatus.Running,
              JobStatus.Starting,
              JobStatus.Registered,
            ] as JobStatus[]
          ).includes(jobStatus) &&
          exists
        ) {
          confirmRemove()
        } else if (
          ([JobStatus.Completed, JobStatus.Failed] as JobStatus[]).includes(
            jobStatus
          ) &&
          exists
        ) {
          remove()
          createJob()
        } else {
          createJob()
        }
        afterClick()
      }}
    >
      {jobStatus === JobStatus.Running && !hovering ? (
        <CircularProgress size={16} variant='indeterminate' color='neutral' />
      ) : (
        <Icon data={buttonIcon} />
      )}
    </Button>
  )
}
