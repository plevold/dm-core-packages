import {
  IUIPlugin,
  Loading,
  TGenericObject,
  useDocument,
} from '@development-framework/dm-core'
import { Button } from '@equinor/eds-core-react'
import { toast } from 'react-toastify'
import { JsonView } from './JsonView/JsonView'

export default (props: IUIPlugin) => {
  const { idReference } = props
  const { document, isLoading } = useDocument<TGenericObject>(idReference)
  if (isLoading || document === null) {
    return <Loading />
  }
  return (
    <div>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(JSON.stringify(document))
          toast.success('Copied!')
        }}
      >
        Copy
      </Button>

      <JsonView data={document} />
    </div>
  )
}
