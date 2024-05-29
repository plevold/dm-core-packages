import { AxiosError } from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ErrorResponse } from '../services'

import { toast } from 'react-toastify'
import { useApplication } from '../ApplicationContext'

interface IUseDocumentReturnType<T> {
  document: T | null
  isLoading: boolean
  updateDocument: (
    newDocument: T,
    notify: boolean,
    partialUpdate?: boolean
  ) => Promise<void>
  error: ErrorResponse | null
  setError: Dispatch<SetStateAction<ErrorResponse | null>>
}

/**
 * A hook for asynchronously working with documents.
 *
 * @docs Hooks
 *
 * @usage
 * Code example:
 * ```
 * import { useDocument } from '@data-modelling-tool/core'
 *
 * const {
 *   document,
 *   loading,
 *   updateDocument,
 *   error,
 * } = useDocument(dataSourceId, documentId)
 *
 * if (loading) return <div>Loading...</div>
 *
 * if (error) {
 *   console.error(error)
 *   return <div>Error getting the document</div>
 * }
 *
 * <DisplayDocument document={document} />
 * ```
 *
 * @param idReference The ID reference of the document on format DATA_SOURCE/UUID.Attribute
 * @param depth The maximum depth level of nested objects to resolve
 * @param notify Show a pop-up on failed/successful requests
 * @returns A list containing the document, a boolean representing the loading state, a function to update the document, and an Error, if any.
 */
export function useDocument<T>(
  idReference: string,
  depth?: number | undefined,
  notify: boolean = true
): IUseDocumentReturnType<T> {
  const [document, setDocument] = useState<T | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<ErrorResponse | null>(null)
  const { dmssAPI } = useApplication()

  useEffect(() => {
    setLoading(true)
    const documentDepth: number = depth ?? 0
    if (documentDepth < 0 || documentDepth > 999)
      throw new Error('Depth must be a positive number < 999')
    dmssAPI
      .documentGet({
        address: idReference,
        depth: documentDepth,
      })
      .then((response: any) => {
        const data = response.data
        setDocument(data)
        setError(null)
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        console.error(error)
        if (notify)
          toast.error(
            'Unable to retrieve document, with message: ' +
              error.response?.data.message ?? error.message
          )
        setError(error.response?.data || { message: error.name, data: error })
      })
      .finally(() => setLoading(false))
  }, [idReference, depth])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function updateDocument(
    newDocument: T,
    notify: boolean = true,
    partialUpdate: boolean = false,
    throwError: boolean = false
  ): Promise<void> {
    setLoading(true)
    return dmssAPI
      .documentUpdate({
        idAddress: idReference,
        data: JSON.stringify(newDocument),
        partialUpdate: partialUpdate,
      })
      .then((response: any) => {
        const data = response.data.data
        setDocument(data)
        setError(null)
        if (notify) toast.success('Document updated')
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        console.error(error)
        if (notify) toast.error(error.response?.data.message ?? error.message)
        setError(error.response?.data || { message: error.name, data: error })
        if (throwError) {
          throw new Error(JSON.stringify(error, null, 2))
        }
      })
      .finally(() => setLoading(false))
  }

  return { document, isLoading, updateDocument, error, setError }
}
