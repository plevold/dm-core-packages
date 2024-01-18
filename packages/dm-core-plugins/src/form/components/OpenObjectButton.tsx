import {
  TInlineRecipeViewConfig,
  TReferenceViewConfig,
  TViewConfig,
} from '@development-framework/dm-core'
import { external_link } from '@equinor/eds-icons'
import TooltipButton from '../../common/TooltipButton'
import { useRegistryContext } from '../context/RegistryContext'

export const OpenObjectButton = ({
  viewId,
  viewConfig,
  idReference,
}: {
  viewId: string
  viewConfig: TViewConfig | TReferenceViewConfig | TInlineRecipeViewConfig
  idReference?: string
}) => {
  const { onOpen } = useRegistryContext()

  return (
    <TooltipButton
      title='Open in tab'
      compact
      button-variant='ghost_icon'
      button-onClick={() => onOpen?.(viewId, viewConfig, idReference)}
      icon={external_link}
    />
  )
}
