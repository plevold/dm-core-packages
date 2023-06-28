import React from 'react'

import { Checkbox } from '@equinor/eds-core-react'
import { TWidget } from '../types'

const CheckboxWidget = (props: TWidget) => {
  const { value } = props

  return (
    <Checkbox
      {...props}
      checked={typeof value === 'undefined' ? false : value}
      type="checkbox"
      data-testid="form-checkbox"
    />
  )
}

export default CheckboxWidget