import { ViewCreator } from '@development-framework/dm-core'
import { Typography } from '@equinor/eds-core-react'
import React from 'react'
import styled from 'styled-components'
import { TGridItem, TItemBorder } from './types'

type TElementProps = {
  item: TGridItem
  itemBorder: TItemBorder
  showItemBorders: boolean
}

const Element = styled.div<TElementProps>`
  grid-area: ${(props: TElementProps) =>
    `${props.item.gridArea.rowStart} / ${props.item.gridArea.columnStart} / ${
      props.item.gridArea.rowEnd + 1
    } / ${props.item.gridArea.columnEnd + 1} `};

  border: ${(props: TElementProps) =>
    props.showItemBorders &&
    `${props.itemBorder.size} ${props.itemBorder.style} ${props.itemBorder.color}`};
  border-radius: ${(props: TElementProps) =>
    props.showItemBorders && props.itemBorder.radius};
  overflow: auto;
`

type TGridItemProps = {
  idReference: string
  item: TGridItem
  type: string
  itemBorder: TItemBorder
  showItemBorders: boolean
  onSubmit?: (data: any) => void
  onChange?: (data: any) => void
}

export const GridElement = (props: TGridItemProps): React.ReactElement => {
  const { idReference, item, itemBorder, showItemBorders, onSubmit, onChange } =
    props

  return (
    <Element
      data-testid={item.viewConfig.scope}
      item={item}
      showItemBorders={showItemBorders}
      itemBorder={itemBorder}
    >
      <div className='flex flex-col w-full h-full'>
        {item?.title && <Typography variant='h4'>{item.title}</Typography>}
        <div
          style={{
            height: item?.title ? 'calc(100% - 32px)' : '100%',
          }}
        >
          <ViewCreator
            idReference={idReference}
            viewConfig={item.viewConfig}
            onSubmit={onSubmit}
            onChange={onChange}
          />
        </div>
      </div>
    </Element>
  )
}
