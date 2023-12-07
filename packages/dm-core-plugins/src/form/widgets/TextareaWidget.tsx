import React from 'react'

import { TextField, Typography } from '@equinor/eds-core-react'
import { TWidget } from '../types'

const TextareaWidget = (props: TWidget) => {
  const { label, onChange } = props

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const formattedValue = value === '' ? null : value
    onChange?.(formattedValue)
  }

  return (
    // @ts-ignore
    <>
      <Typography className={'self-center pb-2'} bold={true}>
        {label}
      </Typography>
      <TextField
        {...props}
        label={''}
        multiline={true}
        rows={5}
        onChange={onChangeHandler}
      />
    </>
  )
}

export default TextareaWidget
