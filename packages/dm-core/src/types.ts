import { JobStatus } from './services/api/configs/gen-job'

export type TDataSource = {
  id: string
  name: string
  type?: string
  host?: string
}

export type TReference = {
  type: string
  _id: string
  name?: string
}

export type TBlob = {
  _blob_id?: string
  name: string
  type: string
}

export type TContainerImage = {
  _id?: string
  uid?: string
  imageName: string
  description?: string
  type: string
  version: string
  registryName: string
}

export type TGenericObject = {
  [key: string]: any
}

//Represents JobHandler blueprint from WorkflowDS/Blueprints/jobHandlers/JobHandler.json
export type TJobHandler = {
  type: string
  environmentVariables?: string[]
}

//Represents Container blueprint from WorkflowDS/Blueprints/jobHandlers/Container.json
export type TContainerJobHandler = {
  type: string
  label?: string
  image: string
  command: string[]
  environmentVariables?: string[]
}

export type TJob = {
  _id?: string
  label: string
  type: string
  status: JobStatus
  triggeredBy: string
  applicationInput: TReference
  runner: TJobHandler | TContainerJobHandler
  started: string
  name?: string
  uid?: string
  result?: any
  ended?: string
  outputTarget?: string
  referenceTarget?: string
}

export type TValidEntity = {
  type: string
  [key: string]: any
}

export interface IUIPlugin {
  type: string
  idReference: string
  onSubmit?: (data: any) => void
  onOpen?: (data: any) => void
  config?: any
}

export type TUiRecipe = {
  type: string
  name: string
  plugin: string
  roles?: string[]
}

export type TPlugin = {
  pluginName: string
  component: (props: IUIPlugin) => JSX.Element
}

export type TUserIdMapping = { userId: string; username: string }
