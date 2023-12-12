import { TFormConfig, TObjectTemplate } from '../types'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRegistryContext } from '../context/RegistryContext'
import RemoveObject from '../components/RemoveObjectButton'
import AddObject from '../components/AddObjectButton'
import { OpenObjectButton } from '../components/OpenObjectButton'
import { ViewCreator } from '@development-framework/dm-core'
import AddObjectBySearchButton from '../components/AddObjectBySearchButton'
import FormObjectBorder from './shared/FormObjectBorder'
import ObjectLegendHeader from './shared/ObjectLegendHeader'
import FormExpandedViewWrapper from './shared/FormExpandedViewWrapper'
import ObjectLegendWrapper from './shared/ObjectLegendWrapper'
import ObjectLegendActionsWrapper from './shared/ObjectLegendActionsWrapper'
import {
  getExpandViewConfig,
  getOpenViewConfig,
  getCanOpenOrExpand as getCanOpenExpand,
} from './shared/utils'

export const ObjectModelContainedTemplate = (
  props: TObjectTemplate
): React.ReactElement => {
  const { namePath, uiAttribute, attribute } = props
  const { watch, setValue } = useFormContext()
  const { idReference, onOpen, config } = useRegistryContext()

  const [isExpanded, setIsExpanded] = useState(
    uiAttribute?.showExpanded ?? config.showExpanded
  )
  const value = watch(namePath)
  const objectIsNotEmpty = value && Object.keys(value).length > 0

  const { canExpand, canOpen } = getCanOpenExpand(
    objectIsNotEmpty,
    config,
    uiAttribute,
    onOpen
  )
  return (
    <FormObjectBorder>
      <ObjectLegendWrapper>
        <ObjectLegendHeader
          canExpand={canExpand}
          canOpen={canOpen}
          isExpanded={isExpanded}
          attribute={attribute}
          objectIsNotEmpty={objectIsNotEmpty}
          setIsExpanded={setIsExpanded}
          onOpen={() =>
            onOpen?.(
              namePath,
              getOpenViewConfig(uiAttribute, namePath),
              idReference
            )
          }
        />
        <ObjectLegendActionsWrapper>
          {canOpen && (
            <OpenObjectButton
              viewId={namePath}
              idReference={idReference}
              viewConfig={getOpenViewConfig(uiAttribute, namePath)}
            />
          )}
          {attribute.optional && !config.readOnly && !objectIsNotEmpty && (
            <>
              {uiAttribute?.searchByType && (
                <AddObjectBySearchButton
                  namePath={namePath}
                  type={attribute.attributeType}
                />
              )}
              {!uiAttribute?.searchByType && (
                <AddObject
                  namePath={namePath}
                  type={attribute.attributeType}
                  defaultValue={attribute.default}
                />
              )}
            </>
          )}
          {attribute.optional && objectIsNotEmpty && !config.readOnly && (
            <RemoveObject
              popupTitle={`Confirm Removal`}
              popupMessage={`Are sure you want to remove reference to '${namePath}'`}
              namePath={namePath}
            />
          )}
        </ObjectLegendActionsWrapper>
      </ObjectLegendWrapper>
      {canExpand && isExpanded && (
        <FormExpandedViewWrapper>
          <ViewCreator
            idReference={`${idReference}.${namePath}`}
            onOpen={onOpen}
            viewConfig={getExpandViewConfig(uiAttribute)}
            onChange={(data: any) => setValue(namePath, data)}
          />
        </FormExpandedViewWrapper>
      )}
    </FormObjectBorder>
  )
}
