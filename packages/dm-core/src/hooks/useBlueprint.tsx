import { AxiosError } from 'axios'
import { useContext, useEffect, useState } from 'react'
import { TBlueprint, TStorageRecipe, TUiRecipe } from 'src/types'
import { ApplicationContext } from '../context/ApplicationContext'
import { useDMSS } from '../context/DMSSContext'
import { ErrorResponse } from '../services'

interface IUseBlueprint {
  blueprint: TBlueprint | undefined
  initialUiRecipe: TUiRecipe | undefined
  uiRecipes: TUiRecipe[]
  storageRecipes: TStorageRecipe[]
  isLoading: boolean
  error: ErrorResponse | null
}

/**
 * Hook to fetch a Blueprint from the DMSS API
 *
 * @docs Hooks
 *
 * @usage
 * Code example:
 * ```
 * import { useBlueprint } from '@data-modelling-tool/core'
 *
 * const [blueprint, isLoading, error] = useBlueprint('someType')
 * if (isLoading) return <div>Loading...</div>
 * if (error) return <div>Error getting the blueprint</div>
 *
 * if (blueprint) {
 *   return (<p>Blueprint: {blueprint?.name} ({blueprint?.type})</p>)
 * }
 * ```
 *
 * @param typeRef - The reference to the blueprint to retrieve
 * @returns A list containing the blueprint document, a boolean representing the loading state, and an Error, if any.
 */
export const useBlueprint = (typeRef: string): IUseBlueprint => {
  const [blueprint, setBlueprint] = useState<TBlueprint>()
  const [storageRecipes, setStorageRecipes] = useState<TStorageRecipe[]>([])
  const [uiRecipes, setUiRecipes] = useState<TUiRecipe[]>([])
  const [initialUiRecipe, setInitialUiRecipe] = useState<TUiRecipe>()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<ErrorResponse | null>(null)
  const { name } = useContext(ApplicationContext)
  const dmssAPI = useDMSS()

  useEffect(() => {
    dmssAPI
      .blueprintGet({ typeRef: typeRef, context: name })
      .then((response: any) => {
        setBlueprint(response.data.blueprint)
        setInitialUiRecipe(response.data.initialUiRecipe)
        setStorageRecipes(response.data.storageRecipes)
        let newUiRecipes = response.data.uiRecipes
        if (response.data.initialUiRecipe) {
          newUiRecipes = [
            response.data.initialUiRecipe,
            ...response.data.uiRecipes,
          ]
        }
        setUiRecipes(newUiRecipes)
        setError(null)
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setError(error.response?.data || null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [typeRef])

  return {
    blueprint,
    initialUiRecipe,
    uiRecipes,
    storageRecipes,
    isLoading,
    error,
  }
}
