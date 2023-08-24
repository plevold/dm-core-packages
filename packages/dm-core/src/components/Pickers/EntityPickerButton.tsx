import React, { useContext, useEffect, useState } from 'react'

import { Button, Progress } from '@equinor/eds-core-react'
import { toast } from 'react-toastify'
import { EBlueprint } from '../../Enums'
import { ApplicationContext } from '../../context/ApplicationContext'
import { Tree, TreeNode } from '../../domain/Tree'
import { TValidEntity } from '../../types'
import { truncatePathString } from '../../utils/truncatePathString'
import { TREE_DIALOG_HEIGHT, TREE_DIALOG_WIDTH } from '../../utils/variables'
import { Dialog } from '../Dialog'
import { TreeView } from '../TreeView'

/**
 * A component for selecting an Entity or an attribute of an entity.
 *
 * Uses the Tree component to let user pick an entity from the tree. After an entity is selected, the prop
 * "onChange" is called. If returnLinkReference is false, the onChange is called with the selected entity as an object.
 * If returnLinkReference is true, onChange is called with a link reference to the selected entity.
 *
 *
 * @param onChange: function to call when entity is selected.
 * @param returnLinkReference: if this is set to true, onChange is called with a link reference to the selected entity (or a complex attribute inside the entity) instead of the entity object.
 * @param typeFilter: optional filter that can be added. If this is included, it is only possible to select an entity with the type specified by typeFilter.
 * @param alternativeButtonText: optional attribute to override the Button text
 * @param variant: optional attribute to override the variant / styling used for the button
 * @param scope: optional attribute to define scope for tree view. The scope will be a path to a folder.
 */
export const EntityPickerButton = (props: {
  onChange: (address: string, entity: TValidEntity) => void
  typeFilter?: string
  alternativeButtonText?: string
  buttonVariant?: 'contained' | 'outlined' | 'ghost' | 'ghost_icon'
  scope?: string
}) => {
  const { onChange, typeFilter, alternativeButtonText, buttonVariant, scope } =
    props
  const appConfig = useContext(ApplicationContext)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([])

  const tree: Tree = new Tree((t: Tree) => setTreeNodes([...t]))
  const [selectedTreeNode, setSelectedTreeNode] = useState<
    TreeNode | undefined
  >()

  useEffect(() => {
    setLoading(true)
    if (scope) {
      tree.initFromFolder(scope).finally(() => setLoading(false))
    } else {
      tree
        .initFromDataSources(appConfig.visibleDataSources)
        .finally(() => setLoading(false))
    }
  }, [scope])

  const handleSelectEntityInTree = () => {
    if (!selectedTreeNode) {
      return
    }
    selectedTreeNode
      .fetch()
      .then((doc: any) => {
        setShowModal(false)
        onChange(`dmss://${selectedTreeNode.nodeId}`, doc)
      })
      .catch((error: any) => {
        console.error(error)
        toast.error('Failed to fetch')
      })
      .finally(() => {
        setSelectedTreeNode(undefined)
        setShowModal(false)
      })
  }

  return (
    <div>
      <Button
        variant={buttonVariant || 'contained'}
        onClick={() => setShowModal(true)}
      >
        {alternativeButtonText || 'Select'}
      </Button>
      <Dialog
        isOpen={showModal}
        closeScrim={() => {
          setSelectedTreeNode(undefined)
          setShowModal(false)
        }}
        header={`Select an Entity ${typeFilter ? `of type ${typeFilter}` : ''}`}
        width={TREE_DIALOG_WIDTH}
        height={TREE_DIALOG_HEIGHT}
      >
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Progress.Circular />
          </div>
        ) : (
          <div style={{ padding: '8px' }}>
            <div style={{ height: '30vh' }}>
              <TreeView
                ignoredTypes={[EBlueprint.BLUEPRINT]}
                nodes={treeNodes}
                onSelect={(node: TreeNode) => {
                  if (typeFilter && node.type !== typeFilter) {
                    toast.warning(
                      `Type must be '${truncatePathString(typeFilter, 43)}'`
                    )
                    setSelectedTreeNode(undefined)
                    return
                  }
                  setSelectedTreeNode(node)
                }}
              />
            </div>
            <p>
              {selectedTreeNode
                ? `Selected: ${
                    selectedTreeNode?.name ?? selectedTreeNode.nodeId
                  }`
                : 'No entity selected'}
            </p>
            <Button
              disabled={!selectedTreeNode}
              onClick={handleSelectEntityInTree}
            >
              Select
            </Button>
          </div>
        )}
      </Dialog>
    </div>
  )
}
