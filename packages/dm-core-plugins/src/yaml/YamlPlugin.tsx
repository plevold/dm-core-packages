import {
  IUIPlugin,
  Loading,
  TGenericObject,
  useDocument,
} from '@development-framework/dm-core'
import { Button, Input, Label } from '@equinor/eds-core-react'
import hljs from 'highlight.js'
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import YAML from 'yaml'
import DOMPurify from 'dompurify'

const CodeContainer = styled.pre`
  background-color: #193549;
  margin: 0;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow: auto;

  & .hljs-string {
    color: #a5ff90;
  }

  & .hljs-literal,
  & .hljs-number {
    color: #f53b6e;
  }

  & .hljs-attr,
  & .hljs-bullet {
    color: #99ffff;
  }
`

const YamlView = (props: {
  document: TGenericObject
  depth?: number
  _setDepth?: Dispatch<SetStateAction<number>>
}) => {
  const { document, depth, _setDepth } = props
  const asYAML: string = YAML.stringify(document)
  const asJSON: string = JSON.stringify(document)
  const highlighted = hljs.highlight(asYAML, { language: 'yaml' })

  const onClick = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied!')
  }

  function setDepth(event: ChangeEvent<HTMLInputElement>): void {
    const newDepth = Number(event.target.value)
    if (_setDepth && newDepth >= 0 && newDepth <= 999) {
      _setDepth(newDepth)
    }
  }

  return (
    <div>
      <div className='flex justify-end items-end my-2 gap-1'>
        <Button variant='ghost' onClick={() => onClick(asYAML)}>
          Copy as YAML
        </Button>
        <Button variant='ghost' onClick={() => onClick(asJSON)}>
          Copy as JSON
        </Button>
        <div style={{ width: '5rem' }}>
          <Label htmlFor='yaml-depth-input' label='Depth' />
          <Input
            id='yaml-depth-input'
            type='number'
            value={depth}
            onChange={setDepth}
            label='Depth'
          />
        </div>
      </div>
      <CodeContainer>
        <code
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(highlighted.value),
          }}
        />
      </CodeContainer>
    </div>
  )
}

export const YamlPlugin = (props: IUIPlugin) => {
  const { idReference } = props
  const [depth, setDepth] = useState(0)
  const { document, isLoading, error } = useDocument<TGenericObject>(
    idReference,
    depth
  )
  if (isLoading) return <Loading />

  if (error) throw new Error(JSON.stringify(error, null, 2))

  return (
    <YamlView document={document || {}} _setDepth={setDepth} depth={depth} />
  )
}
