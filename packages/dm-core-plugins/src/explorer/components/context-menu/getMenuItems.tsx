import { EBlueprint, TreeNode } from '@development-framework/dm-core'
import { Menu } from '@equinor/eds-core-react'
import React from 'react'
import { toast } from 'react-toastify'
import { EDialog } from '../../types'

// This function must return a list of Menu.Item, ie not wrapped in a <></>.
// See https://github.com/equinor/design-system/issues/2659
export function getMenuItems(
  node: TreeNode,
  setDialogId: (id: EDialog | undefined) => void
): React.ReactElement[] {
  const menuItems = []
  const getMenuItem = (id: EDialog, text: string) => {
    return (
      <Menu.Item key={id} onClick={() => setDialogId(id)}>
        {text}
      </Menu.Item>
    )
  }

  // dataSources get a "new root package"
  if (node.type === 'dataSource') {
    menuItems.push(getMenuItem(EDialog.NewRootPackage, 'New package'))
  }

  // Append to lists
  if (Array.isArray(node.entity)) {
    menuItems.push(getMenuItem(EDialog.AppendEntity, `Append ${node.name}`))
  }

  // Packages get a "new folder"
  // and "new entity"
  // and "new blueprint"
  if (node.type === EBlueprint.PACKAGE) {
    menuItems.push(getMenuItem(EDialog.NewEntity, 'New entity'))
    menuItems.push(getMenuItem(EDialog.NewBlueprint, 'New blueprint'))
    menuItems.push(getMenuItem(EDialog.NewFolder, 'New folder'))
  }

  // Everything besides dataSources and folders can be viewed
  if (!['dataSource', EBlueprint.PACKAGE].includes(node.type)) {
    menuItems.push(
      <Menu.Item
        key={'view'}
        as='a'
        href={`/view/?documentId=${node.nodeId}`}
        target='_blank'
      >
        View in new tab
      </Menu.Item>
    )
  }

  // Everything besides dataSources can be deleted, copied, and edited AccessControl
  if (node.type !== 'dataSource') {
    menuItems.push(getMenuItem(EDialog.Delete, 'Delete'))
    menuItems.push(getMenuItem(EDialog.EditACL, 'Change permissions'))
    menuItems.push(getMenuItem(EDialog.CopyLink, 'Copy or link'))
  }

  // Every node gets the "copy address" entry
  menuItems.push(
    <Menu.Item
      key={'copy-address'}
      onClick={() => {
        navigator.clipboard.writeText(node.nodeId)
        toast.success('Copied!')
      }}
    >
      Copy address
    </Menu.Item>
  )

  return menuItems
}
