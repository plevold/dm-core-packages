import React from 'react'

import styled from 'styled-components'
import { ErrorBoundary, ErrorGroup } from '../utils/ErrorBoundary'
import { useRecipe } from '../hooks'
import { IUIPlugin } from '../types'
import { Loading } from './Loading'

const Wrapper = styled.div`
  align-self: start;
  justify-content: space-evenly;
  width: 100%;
`

type IEntityView = IUIPlugin & {
  recipeName?: string
  noInit?: boolean
  dimensions?: string
}

export const EntityView = (props: IEntityView): JSX.Element => {
  const {
    idReference,
    type,
    onSubmit,
    onOpen,
    recipeName,
    noInit,
    dimensions,
  } = props
  const { recipe, isLoading, error, getUiPlugin } = useRecipe(
    type,
    recipeName,
    noInit,
    dimensions
  )

  if (isLoading)
    return (
      <div style={{ alignSelf: 'center', padding: '50px' }}>
        <Loading />
      </div>
    )

  if (error)
    return (
      <ErrorGroup>
        <p>{`Failed to find UiRecipe for type "${
          type || '(unknown type)'
        }"`}</p>
        <p>{JSON.stringify(error)}</p>
      </ErrorGroup>
    )

  if (!recipe || !Object.keys(recipe).length)
    return <Wrapper>No compatible uiRecipes for entity</Wrapper>

  const UiPlugin = getUiPlugin(recipe.plugin)

  return (
    <Wrapper>
      {/*@ts-ignore*/}
      <ErrorBoundary message={`Plugin "${recipe.plugin}" crashed...`}>
        <UiPlugin
          idReference={idReference}
          type={type}
          onSubmit={onSubmit}
          onOpen={onOpen}
          config={recipe.config || {}}
        />
      </ErrorBoundary>
    </Wrapper>
  )
}
