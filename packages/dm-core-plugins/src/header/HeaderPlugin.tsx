import {
  IUIPlugin,
  Loading,
  TApplication,
  TGenericObject,
  TUiRecipe,
  useBlueprint,
  useDocument,
  useUiPlugins,
} from '@development-framework/dm-core'
import { Icon, TopBar } from '@equinor/eds-core-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { account_circle, info_circle } from '@equinor/eds-icons'

import { AboutDialog } from './components/AboutDialog'
import { AppSelector } from './components/AppSelector'
import { UserInfoDialog } from './components/UserInfoDialog'

const Icons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;

  > * {
    margin-left: 40px;
  }
`
const Logo = styled.span`
  color: #007079;
  font-weight: 500;
  margin-right: 1rem;
  margin-left: 0.5rem;
  font-size: 18px;
`

const ClickableIcon = styled.button`
  appearance: none;
  border: none;
  background-color: transparent;

  &:hover {
    color: gray;
    cursor: pointer;
  }
`

type THeaderPluginConfig = {
  uiRecipesList: string[]
  hideUserInfo: boolean
  hideAbout: boolean
}

const defaultHeaderPluginConfig = {
  uiRecipesList: [],
  hideUserInfo: false,
  hideAbout: false,
}

type TRecipeConfigAndPlugin = {
  config?: TGenericObject
  component: (props: IUIPlugin) => React.ReactElement
  name: string
}

export default (props: IUIPlugin): React.ReactElement => {
  const { idReference, config: passedConfig, type } = props
  const config: THeaderPluginConfig = {
    ...defaultHeaderPluginConfig,
    ...passedConfig,
  }
  const { document: entity, isLoading } = useDocument<TApplication>(idReference)
  const { uiRecipes, isLoading: isBlueprintLoading } = useBlueprint(type)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [visibleUserInfo, setVisibleUserInfo] = useState<boolean>(false)
  const { getUiPlugin } = useUiPlugins()
  const [selectedRecipe, setSelectedRecipe] = useState<TRecipeConfigAndPlugin>({
    component: () => <div />,
    config: {},
    name: '',
  })

  function getRecipeConfigAndPlugin(
    recipeName: string
  ): TRecipeConfigAndPlugin {
    const recipe = uiRecipes.find(
      (recipe: TUiRecipe) => recipe.name === recipeName
    )
    if (!recipe) throw new Error(`Failed to find recipe named '${recipeName}'`)
    return {
      component: getUiPlugin(recipe.plugin),
      config: recipe?.config ?? {},
      name: recipeName,
    }
  }

  useEffect(() => {
    if (!isBlueprintLoading) {
      const defaultRecipe: TUiRecipe = config.uiRecipesList.length
        ? uiRecipes.find(
            (recipe: TUiRecipe) => recipe.name === config.uiRecipesList[0]
          )
        : uiRecipes[0]
      setSelectedRecipe(getRecipeConfigAndPlugin(defaultRecipe.name))
    }
  }, [isBlueprintLoading])

  const UIPlugin: (props: IUIPlugin) => React.ReactElement =
    selectedRecipe.component

  if (isLoading || !entity || isBlueprintLoading) {
    return <Loading />
  }

  const recipeNames: string[] =
    config.uiRecipesList.length > 0
      ? config.uiRecipesList
      : uiRecipes.map((recipe: TUiRecipe) => recipe.name)
  return (
    <div className='wrapper'>
      <TopBar className='w-full shrink-0'>
        <TopBar.Header>
          <Logo aria-label='main-heading'>{entity.label}</Logo>
          <AppSelector
            items={recipeNames}
            onSelectItem={(item) =>
              setSelectedRecipe(getRecipeConfigAndPlugin(item))
            }
            currentItem={selectedRecipe.name}
          />
        </TopBar.Header>
        <TopBar.Actions>
          <Icons>
            <ClickableIcon
              onClick={() => setAboutOpen(true)}
              hidden={config.hideAbout}
            >
              <Icon data={info_circle} size={24} title='About' />
            </ClickableIcon>
            <ClickableIcon
              onClick={() => setVisibleUserInfo(true)}
              hidden={config.hideUserInfo}
            >
              <Icon data={account_circle} size={24} title='User' />
            </ClickableIcon>
          </Icons>
        </TopBar.Actions>
      </TopBar>
      <AboutDialog
        isOpen={aboutOpen}
        setIsOpen={setAboutOpen}
        applicationEntity={entity}
      />
      <UserInfoDialog
        isOpen={visibleUserInfo}
        setIsOpen={setVisibleUserInfo}
        applicationEntity={entity}
      />
      <div className='wrapper'>
        <UIPlugin
          key={idReference + selectedRecipe.name}
          idReference={idReference}
          type={entity.type}
          config={selectedRecipe.config}
        />
      </div>
    </div>
  )
}
