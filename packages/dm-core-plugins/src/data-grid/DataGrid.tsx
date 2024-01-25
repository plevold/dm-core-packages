import { Stack } from '@development-framework/dm-core'
import { EdsProvider, Typography } from '@equinor/eds-core-react'
import { useEffect, useMemo, useState } from 'react'
import { DataCell } from './DataCell/DataCell'
import { DataGridActions } from './DataGridActions/DataGridActions'
import { DataGridPagination } from './DataGridPagination/DataGridPagination'
import { HeaderCell } from './HeaderCell/HeaderCell'
import * as Styled from './styles'
import {
  DataGridConfig,
  DataGridProps,
  TFunctionalityChecks,
  defaultConfig,
} from './types'
import * as utils from './utils'

export function DataGrid(props: DataGridProps) {
  const { data, attributeType, dimensions, setData, config: userConfig } = props
  const config: DataGridConfig = { ...defaultConfig, ...userConfig }
  const [columnLabels, setColumnLabels] = useState<string[]>([])
  const [rowLabels, setRowLabels] = useState<string[]>([])
  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined)
  const [selectedColumn, setSelectedColumn] = useState<number | undefined>(
    undefined
  )
  const [paginationPage, setPaginationPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState(props.initialRowsPerPage || 25)

  const dataGridId: string = useMemo(() => crypto.randomUUID(), [])
  const fillValue = utils.getFillValue(attributeType)
  const paginatedRows = data.slice(
    paginationPage * rowsPerPage,
    paginationPage * rowsPerPage + rowsPerPage
  )
  const functionality: TFunctionalityChecks = utils.getFunctionalityVariables(
    config,
    dimensions
  )

  useEffect(() => {
    const columnLabels = functionality.isMultiDimensional
      ? functionality.columnDimensions === '*'
        ? utils.createLabels(
            config.columnLabels,
            data.length > 0 ? data[0].length : 0
          )
        : utils.createLabels(
            config.columnLabels,
            parseInt(functionality.columnDimensions, 10)
          )
      : ['1']
    const rowLabels = utils.createLabels(config.rowLabels, data?.length)

    setRowLabels(rowLabels)
    setColumnLabels(columnLabels)
  }, [])

  function addRow(newIndex?: number) {
    const newRow =
      columnLabels.length > 1
        ? Array.from({ length: columnLabels.length }).fill(fillValue)
        : fillValue
    const dataCopy = [...data]
    dataCopy.splice(newIndex || data.length, 0, newRow)
    const newLabels = utils.createLabels(config.rowLabels, data.length + 1)
    setRowLabels(newLabels)
    setData(dataCopy)
  }

  function deleteRow() {
    if (selectedRow !== undefined) {
      const dataCopy = [...data]
      dataCopy.splice(selectedRow, 1)
      setData(dataCopy)
      setSelectedRow(undefined)
    }
  }

  function moveRow(direction: 'up' | 'down') {
    if (selectedRow !== undefined) {
      const toIndex = direction === 'up' ? selectedRow - 1 : selectedRow + 1
      const updatedData = utils.arrayMove(data, selectedRow, toIndex)
      setData(updatedData)
      setSelectedRow(toIndex)
    }
  }

  function addColumn(newIndex?: number) {
    newIndex = newIndex || columnLabels.length
    const newColumns = utils.createLabels(
      config.columnLabels,
      columnLabels.length + 1
    )
    const fillValue = utils.getFillValue(attributeType)
    const updatedData = data.map((item) => {
      item.splice(newIndex, 0, fillValue)
      return item
    })
    setData(updatedData)
    setColumnLabels(newColumns)
    setSelectedColumn(newIndex)
  }

  function deleteColumn(index: number) {
    const newColumns = utils.createLabels(
      config.columnLabels,
      columnLabels.length - 1
    )
    const updatedData = data.map((item) => {
      item.splice(index, 1)
      return item
    })
    setColumnLabels(newColumns)
    setData(updatedData)
    setSelectedColumn(undefined)
  }

  return (
    <Stack
      style={{
        overflow: 'auto',
        height: 'calc(100% - 36px)',
      }}
    >
      <Stack>
        {config.title && <Typography variant='h5'>{config.title}</Typography>}
        {config.description && <Typography>{config.description}</Typography>}
      </Stack>
      <EdsProvider density='compact'>
        <Styled.DataGrid>
          {config.showColumns && (
            <Styled.Head>
              <Styled.Row>
                {config.showRows && <th style={{ width: '2rem' }}>#</th>}
                {columnLabels.map((column, index) => (
                  <HeaderCell
                    key={`${dataGridId}_header_${index}`}
                    add={addColumn}
                    editable={functionality.columnsAreEditable}
                    delete={deleteColumn}
                    index={index}
                    label={column}
                    selected={selectedColumn}
                    setSelected={setSelectedColumn}
                    type='column'
                  />
                ))}
              </Styled.Row>
            </Styled.Head>
          )}
          <tbody>
            {paginatedRows.map((item, rowIndex) => {
              const calculatedIndex = paginationPage * rowsPerPage + rowIndex
              return (
                <Styled.Row key={`${dataGridId}_row_${calculatedIndex}`}>
                  {config.showRows && (
                    <HeaderCell
                      add={addRow}
                      delete={deleteRow}
                      index={calculatedIndex}
                      label={rowLabels[calculatedIndex]}
                      editable={functionality.rowsAreEditable}
                      selected={selectedRow}
                      setSelected={setSelectedRow}
                      type='row'
                    />
                  )}
                  {functionality.isMultiDimensional ? (
                    item?.map((cellValue: any, cellIndex: number) => (
                      <DataCell
                        key={`${dataGridId}_row_${calculatedIndex}_cell_${cellIndex}`}
                        selected={
                          selectedRow === calculatedIndex ||
                          selectedColumn === cellIndex
                        }
                        config={config}
                        value={cellValue}
                        cellIndex={cellIndex}
                        rowIndex={calculatedIndex}
                        data={data}
                        setData={setData}
                        attributeType={attributeType}
                      />
                    ))
                  ) : (
                    <DataCell
                      key={`${dataGridId}_row_${calculatedIndex}_cell`}
                      config={config}
                      selected={selectedRow === calculatedIndex}
                      value={item}
                      rowIndex={calculatedIndex}
                      data={data}
                      setData={setData}
                      attributeType={attributeType}
                    />
                  )}
                </Styled.Row>
              )
            })}
          </tbody>
        </Styled.DataGrid>
      </EdsProvider>
      <Styled.ActionRow>
        <DataGridActions
          addRow={addRow}
          columnLabels={columnLabels}
          data={data}
          deleteRow={deleteRow}
          functionality={functionality}
          moveRow={moveRow}
          name={props.name || dataGridId}
          rowLabels={rowLabels}
          selectedRow={selectedRow}
        />
        <DataGridPagination
          count={data.length}
          page={paginationPage}
          setPage={setPaginationPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Styled.ActionRow>
    </Stack>
  )
}
