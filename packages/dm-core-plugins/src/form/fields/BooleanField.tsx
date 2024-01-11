import React from 'react'
import { Controller } from 'react-hook-form'
import { getWidget } from '../context/WidgetContext'
import { TField } from '../types'
import { useRegistryContext } from '../context/RegistryContext'
import { getDisplayLabel } from '../utils/getDisplayLabel'

export const BooleanField = (props: TField) => {
  const { namePath, uiAttribute, attribute } = props

  const Widget = getWidget(uiAttribute?.widget ?? 'CheckboxWidget')
  const { config } = useRegistryContext()
  const readOnly = uiAttribute?.readOnly || config.readOnly
  return (
    <Controller
      name={namePath}
      defaultValue={attribute.default === 'True'} // we need to convert default values coming from the API since they are always strings
      render={({
        field: { ref, value, ...props },
        fieldState: { invalid, error },
      }) => (
        <Widget
          {...props}
          readOnly={readOnly}
          id={namePath}
          value={value}
          inputRef={ref}
          label={
            !uiAttribute?.config?.hideLabel
              ? getDisplayLabel(attribute, true)
              : ''
          }
          helperText={error?.message}
          variant={invalid ? 'error' : undefined}
          config={uiAttribute?.config}
        />
      )}
    />
  )
}
