import {
  Button,
  EdsProvider,
  Icon,
  Input,
  Table,
  Tooltip,
} from '@equinor/eds-core-react'
import React, { ChangeEvent } from 'react'
import { TTableRow } from '../types'
import { TGenericObject, ViewCreator } from '@development-framework/dm-core'
import {
  add,
  chevron_down,
  chevron_up,
  delete_to_trash,
  minimize,
} from '@equinor/eds-icons'
import { moveItem } from '../../generic_list/utils'

export function TableRow(props: TTableRow) {
  const {
    config,
    item,
    index,
    idReference,
    items,
    setItems,
    onOpen,
    setDirtyState,
    rowsPerPage,
  } = props

  function updateItem(
    index: number,
    attribute: string,
    newValue: string | number | boolean
  ) {
    const itemsCopy = [...items]
    itemsCopy[index].data[attribute] = newValue
    itemsCopy[index].isSaved = false
    setItems(itemsCopy)
    setDirtyState(true)
  }

  function deleteItem(reference: string, key: string) {
    const itemIndex = items.findIndex((item) => item.key === key)
    const itemsCopy = [...items]
    itemsCopy.splice(itemIndex, 1)
    setItems(itemsCopy)
    setDirtyState(true)
  }

  function openItemAsTab(item: TGenericObject, index: number) {
    const view = { label: item?.data?.name, type: 'ViewConfig' }
    onOpen(crypto.randomUUID(), view, `${idReference}[${index}]`)
  }

  function expandItem(index: number) {
    const itemsCopy = [...items]
    itemsCopy[index].expanded = !itemsCopy[index].expanded
    setItems(itemsCopy)
  }

  function getColumnsLength() {
    let amount = config.columns?.length || 0
    if (config.functionality.delete) amount += 1
    if (config.functionality.openAsTab || config.functionality.openAsExpandable)
      amount += 1
    if (config.functionality.sort) amount += 1
    return amount
  }

  return (
    <>
      <Table.Row key={item.key}>
        {(config.functionality?.openAsTab ||
          config.functionality.openAsExpandable) && (
          <Table.Cell>
            <Tooltip
              title={
                config.functionality.openAsExpandable
                  ? item.expanded
                    ? 'Minimize'
                    : 'Expand'
                  : 'Open in new tab'
              }
            >
              <Button
                variant="ghost_icon"
                color="secondary"
                disabled={!item.isSaved}
                onClick={
                  config.functionality.openAsExpandable
                    ? () => expandItem(index)
                    : () => openItemAsTab(item, index)
                }
              >
                <Icon data={item.expanded ? minimize : add} />
              </Button>
            </Tooltip>
          </Table.Cell>
        )}
        {config.columns.map((attribute: string) => {
          if (typeof item.data[attribute] === 'object')
            throw new Error(
              `Objects can not be displayed in table. Attribute '${attribute}' is not a primitive type.`
            )
          // TODO: Consider having a more robust way of getting type and validating form
          const attributeType = typeof item.data[attribute]
          return (
            <Table.Cell key={attribute}>
              {config.functionality?.edit &&
              config.editableColumns?.includes(attribute) ? (
                <Input
                  value={item.data[attribute] ?? ''}
                  readOnly={attribute === 'type'}
                  type={attributeType}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    let newValue: string | number | boolean = event.target.value
                    if (attributeType === 'number') newValue = Number(newValue)
                    updateItem(index, attribute, newValue)
                  }}
                />
              ) : (
                item.data?.[attribute]
              )}
            </Table.Cell>
          )
        })}
        <EdsProvider density="compact">
          {config.functionality?.delete && (
            <Table.Cell style={{ textAlign: 'center' }}>
              <Button
                title="Delete row"
                color="danger"
                variant="ghost_icon"
                onClick={() => deleteItem(`${idReference}[${index}]`, item.key)}
              >
                <Icon data={delete_to_trash} aria-hidden />
              </Button>
            </Table.Cell>
          )}
          {config.functionality?.sort && (
            <Table.Cell style={{ width: '48px' }}>
              <>
                <Button
                  title="Move row up"
                  disabled={index === 0}
                  variant="ghost_icon"
                  onClick={() => {
                    setItems(moveItem(items, item.key, 'up'))
                    setDirtyState(true)
                  }}
                >
                  <Icon data={chevron_up} aria-hidden />
                </Button>
                <Button
                  title="Move row down"
                  disabled={
                    index === rowsPerPage - 1 || index === items?.length - 1
                  }
                  variant="ghost_icon"
                  onClick={() => {
                    setItems(moveItem(items, item.key, 'down'))
                    setDirtyState(true)
                  }}
                >
                  <Icon data={chevron_down} aria-hidden />
                </Button>
              </>
            </Table.Cell>
          )}
        </EdsProvider>
      </Table.Row>
      {item?.expanded && (
        <Table.Row>
          <Table.Cell colSpan={getColumnsLength()}>
            <ViewCreator
              idReference={`${idReference}[${item.index}]`}
              viewConfig={config.views?.[item.index] ?? config.defaultView}
            />
          </Table.Cell>
        </Table.Row>
      )}
    </>
  )
}