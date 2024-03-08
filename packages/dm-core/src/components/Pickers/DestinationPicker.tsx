import { useEffect, useState } from 'react'
import { EBlueprint } from '../../Enums'
import {
  PATH_INPUT_FIELD_WIDTH,
  TREE_DIALOG_HEIGHT,
  TREE_DIALOG_WIDTH,
} from '../../utils/variables'
import { TNodeWrapperProps, TreeView } from '../TreeView'

import {
  Button,
  Input,
  Label,
  Progress,
  Tooltip,
} from '@equinor/eds-core-react'
import styled from 'styled-components'
import { useApplication } from '../../ApplicationContext'
import { Tree, TreeNode } from '../../domain/Tree'
import { truncatePathString } from '../../utils/truncatePathString'
import { Dialog } from '../Dialog'

type TDestinationPickerProps = {
  onChange: (value: string) => void
  formData: string
  disabled?: boolean
  scope?: string // Path to a folder to limit the view within
  label?: string
}

export const DestinationPicker = (props: TDestinationPickerProps) => {
  const { onChange, formData, disabled, scope, label } = props
  const { visibleDataSources, dmssAPI } = useApplication()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([])

  const tree: Tree = new Tree(dmssAPI, (t: Tree) => setTreeNodes([...t]))

  useEffect(() => {
    setLoading(true)
    if (scope) {
      tree.initFromPath(scope).finally(() => setLoading(false))
    } else {
      tree
        .initFromDataSources(visibleDataSources)
        .finally(() => setLoading(false))
    }
  }, [scope])

  const onSelect = (node: TreeNode) => {
    onChange(node.getPath())
    setShowModal(false)
  }

  const SelectPackageButton = (props: TNodeWrapperProps) => {
    const { node, children } = props

    return (
      <Wrapper>
        {children}
        {node.type === EBlueprint.PACKAGE && (
          <div style={{ padding: '0 5px', backgroundColor: 'white' }}>
            <Button
              style={{ height: '22px' }}
              variant='ghost'
              onClick={() => {
                if (onSelect) {
                  return onSelect(node)
                }
              }}
            >
              Select
            </Button>
          </div>
        )}
      </Wrapper>
    )
  }

  return (
    <div>
      <Label label={label || 'Destination'} />
      <Tooltip title={formData || 'None selected'}>
        <Input
          style={{
            width: PATH_INPUT_FIELD_WIDTH,
            cursor: 'pointer',
          }}
          disabled={disabled || false}
          type='string'
          value={truncatePathString(formData)}
          placeholder='Select folder'
          onClick={() => setShowModal(true)}
        />
      </Tooltip>
      <Dialog
        isDismissable
        open={showModal}
        onClose={() => setShowModal(false)}
        width={TREE_DIALOG_WIDTH}
        height={TREE_DIALOG_HEIGHT}
      >
        <Dialog.Header>
          <Dialog.Title>Select a folder</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Progress.Circular />
            </div>
          ) : (
            <TreeView
              nodes={treeNodes}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onSelect={() => {}}
              NodeWrapper={SelectPackageButton}
            />
          )}
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </div>
  )
}

const Wrapper = styled.div`
  display: flex;
  &:hover {
    background-color: #acb7da;
  }
`
