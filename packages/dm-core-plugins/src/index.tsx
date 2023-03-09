import { TPlugin } from '@development-framework/dm-core'

import { YamlPlugin } from './yaml/YamlPlugin'
import { TabsPlugin } from './tabs/TabsPlugin'
import { BlueprintHierarchyPlugin } from './blueprint-hierarchy/BlueprintHierarchyPlugin'
import { JobInputEditPlugin } from './job/JobInputEditPlugin'
import { JobControlPlugin } from './job/JobControlPlugin'
import { FormPlugin } from './form/FormPlugin'
import HeaderPlugin from './header/HeaderPlugin'
import JsonPlugin from './json/JsonPlugin'
import { DefaultPdfComponent } from './default-pdf/DefaultPdfComponent'
import { BlueprintPlugin } from './blueprint/EditBlueprint'
import ExplorerPlugin from './explorer/ExplorerPlugin'

export const plugins: TPlugin[] = [
  {
    pluginName: 'explorer',
    component: ExplorerPlugin,
  },
  {
    pluginName: 'yaml',
    component: YamlPlugin,
  },
  {
    pluginName: 'tabs',
    component: TabsPlugin,
  },
  {
    pluginName: 'blueprint-hierarchy',
    component: BlueprintHierarchyPlugin,
  },
  {
    pluginName: 'jobControl',
    component: JobControlPlugin,
  },
  {
    pluginName: 'jobInputEdit',
    component: JobInputEditPlugin,
  },
  {
    pluginName: 'form',
    component: FormPlugin,
  },
  {
    pluginName: 'header',
    component: HeaderPlugin,
  },
  {
    pluginName: '@development-framework/dm-core-plugins/json',
    component: JsonPlugin,
  },
  {
    pluginName: 'default-pdf',
    component: DefaultPdfComponent,
  },
  {
    pluginName: '@development-framework/dm-core-plugins/blueprint',
    component: BlueprintPlugin,
  },
]
