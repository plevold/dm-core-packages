import { IUIPlugin, Loading } from '@development-framework/dm-core'
import { TViewSelectorConfig } from './types'
import * as React from 'react'
import { Tabs } from './Tabs'
import { Content } from './Content'
import { useViewSelector } from './useViewSelector'

export const TabsPlugin = (
  props: IUIPlugin & { config?: TViewSelectorConfig }
): React.ReactElement => {
  const { idReference, config, type } = props

  const {
    addView,
    removeView,
    isLoading,
    error,
    viewSelectorItems,
    selectedViewId,
    formData,
    setSelectedViewId,
    setFormData,
  } = useViewSelector(idReference, config)

  if (error) {
    throw new Error(JSON.stringify(error, null, 2))
  }
  if (isLoading || !viewSelectorItems.length || !selectedViewId) {
    return <Loading />
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Tabs
        viewSelectorItems={viewSelectorItems}
        selectedViewId={selectedViewId}
        setSelectedViewId={setSelectedViewId}
        removeView={removeView}
      />
      <div
        style={{
          paddingTop: '8px',
          paddingRight: '8px',
        }}
      >
        <Content
          style={{
            paddingTop: '8px',
            paddingRight: '8px',
          }}
          type={type}
          onOpen={addView}
          formData={formData}
          selectedViewId={selectedViewId}
          viewSelectorItems={viewSelectorItems}
          setFormData={setFormData}
        />
      </div>
    </div>
  )
}
