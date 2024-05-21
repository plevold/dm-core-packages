`DataGrid` displays and gives user ability to edit sets of data. 

## Table of contents
- [Functionality](#functionality)
    - [Passing data](#passing-data)
    - [Limiting edit functionality](#limiting-editing)
        - [Making the entire table un-editable](#disable-edit)
        - [Set amount of rows by using attribute dimensions](#dimensions)
        - [Disabling add/delete amount of rows and columns](#disable-ad)
    - [Column and Row headers](#cr-headers)
        - [Default labels](#default-labels)
        - [Custom labels](#custom-labels)
        - [Hidden labels](#hidden-labels)
    - [Using printDirection to flip data](#print-direction)
- [Limitations](#limitations)
    - [Passing multiple two-dimensional arrays](#multi-2d-arrays)


## Functionality \{#functionality}

### Passing data \{#passing-data}
The plugin expects an array of fieldNames that point to either one or multiple one-dimensional arrays of primitives or one two-dimensional array of primitives. See [Limitations](#limitations) for more info on how it's possible to pass multiple data fields to the plugin.
```json {3}
"config": {
    "type": "PLUGINS:dm-core-plugins/data_grid/DataGridPluginConfig",
    "fieldNames": ["data"],
}
```

### Limiting edit functionality \{#limiting-editing}
By default, DataGrid is an interactive plugin that allows user to add, edit and delete column and rows. There are a few ways to restrict different types of functionality.

#### Making the entire table un-editable \{#disable-edit}
You can make the entire DataGrid un-editable by setting the `"editable"` field to `false`. This will disable any kind of add/delete/edit functionality as well as the ability for user to import data.

#### Set amount of rows by using attribute dimensions \{#dimensions}
Defining the attribute dimensions (in blueprint) of the field you're passing to DataGrid will directly impact the amount of rows and columns DataGrid prints. Defined amount of dimensions will also disable users ability to add and delete rows and columns. 
- `"dimensions": "*,*"`: Undefined amount of rows and columns. Adding and deleting columns and rows are enabled.
- `"dimensions": "4,*"`: Defined amount of columns (4), undefined amount of rows. Adding and deleting columns is disabled, adding and deleting rows is enabled.
- `"dimensions": "*,5"`: Defined amount of rows [5], undefined amount of columns. Adding and deleting rows is disabled, adding and deleting columns is enabled.
- `"dimensions": "4,5"`: Defined amount of columns (4) and rows [5]. Adding and deleting rows and columns is disabled.


#### Disabling add/delete amount of rows and columns \{#disable-ad}
If you don't want to defined dimensions, but still disable adding and deleting rows, it can be done by using the `editableRows`and `editableColumns` fields in config.
```json {4-5}
"config": {
    "type": "PLUGINS:dm-core-plugins/data_grid/DataGridPluginConfig",
    "fieldNames": ["data"],
    "editableColumns": false,
    "editableRows": false
}
```

### Column and Row headers \{#cr-headers}

#### Default/Auto-generated labels \{#default-labels}
By default, DataGrid uses autogenerated labels for both columns and rows. Predefined values are ABC, ZYX, 123 and you can select these and switch them around by using the spread operator and the predefined value you want, like`['...ABC']`. Column labels are by default alphabetical numeration (A,B,C…) and row labels are numeric numeration (1,2,3…).

#### Custom labels \{#custom-labels}
Custom labels can be passed as a list of strings:
```json {4-5}
"config": {
    "type": "PLUGINS:dm-core-plugins/data_grid/DataGridPluginConfig",
    "fieldNames": ["data"],
    "columnLabels": ["2021", "2022", "2023", "2024"],
    "rowLabels": ["Population 1 January", "Live births", "Deaths", "Population increase"]
}
```

::::tip

You can also merge custom and auto-generated labels like this: `['custom field', 'custom field 2', '...ABC']`

:::warning

Auto-generated labels can only be placed at the beginning or end of your list of labels.

:::

::::

#### Hidden labels \{#hidden-labels}
By default, DataGrid shows labels for both columns and rows, but both can be hidden respectively by passing the config below.
```json {4-5}
"config": {
    "type": "PLUGINS:dm-core-plugins/data_grid/DataGridPluginConfig",
    "fieldNames": ["data"],
    "showColumns": false,
    "showRows": false
}
```

### Using printDirection to flip data \{#print-direction}
Data is printed by default vertically. Sometimes, especially when passing multiple fields of data, it makes more sense to flip the data around. This can be done by using the `printDirection config`. The default printDirection: vertical means that the data is printed from top to bottom. Passing the printDirection horizontal ensures that your data is printed from left to right.

#### Example: unflipped table
```json title="population.entity.json"
{
    "2021": [5391369, 56060, 42002, 42002],
    "2022": [5425270, 51480, 45774, 45774],
    "2023": [5488984, 51980, 43803, 43803]
}
```

```json title="population.recipe.json"
{
    "fieldNames": ["2021", "2022", "2023"],
    "columnLabels": ["Population 1 January", "Live births", "Deaths", "Population increase"],
    "rowLabels": ["2021", "2022", "2023"]
}
```

Would print:

|              | Population 1 January | Live births | Deaths | Population increase |
| ------------ | -------------------: | ----------: | -----: | ------------------: |
| **2021**     | 5 391 369            | 56 060      | 42 002 | 33 901              |
| **2022**     | 5 425 270            | 51 480      | 45 774 | 63 714              |
| **2023**     | 5 488 984            | 51 980      | 43 803 | 61 219              |

#### Example: flipped table
```json title="population.entity.json"
{
    "2021": [5391369, 56060, 42002, 42002],
    "2022": [5425270, 51480, 45774, 45774],
    "2023": [5488984, 51980, 43803, 43803]
}
```

```json title="population.recipe.json"
{
    "fieldNames": ["2021", "2022", "2023"],
    "rowLabels": ["Population 1 January", "Live births", "Deaths", "Population increase"],
    "columnLabels": ["2021", "2022", "2023"],
    "printDirection": "horizontal"
}
```

Would print:

|                              | 2021      | 2022      | 2023      |
| ---------------------------- | --------: | --------: | --------: |
| **Population 1 January**     | 5 391 369 | 5 425 270 | 5 488 984 |
| **Live births**              | 56 060    | 51 480    | 51 980    |
| **Deaths**                   | 42 002    | 45 774    | 43 803    |
| **Population increase**      | 33 901    | 63 714    | 61 219    |

## Limitations \{#limitations}

### Passing multiple 2D-arrays \{#multi-2d-arrays}
It is not possible to pass multiple two-dimensional arrays as fields. DataGridPlugin only handles two-dimensional arrays when they are the only field passed.

#### ✅ Will work
Multiple one-dimensional primitive arrays

```json title="lotr.entity.json"
{
    "elves": ["Legolas", "Arwen", "Galadriel"],
    "hobbits": ["Frodo", "Sam", "Merry"],
    "men": ["Aragorn", "Boromir", "Faramir"],
    "wizards": ["Gandalf", "Saruman", "Radagast"]
}
```

```json title="lotr.recipe.json"
"config": {
    "type": "PLUGINS:dm-core-plugins/data_grid/DataGridPluginConfig",
    "fieldNames": ["elves", "hobbits", "men", "wizards"]
}
```
OR 1 two-dimensional primitive array

```json title="lotr.entity.json"
{
    "characters": [
        ["Legolas", "Arwen", "Galadriel"], 
        ["Frodo", "Sam", "Merry"], 
        ["Aragorn", "Boromir", "Faramir"], 
        ["Gandalf", "Saruman", "Radagast"]
    ],
}
```

```json title="lotr.recipe.json"
"config": {
    "type": "PLUGINS:dm-core-plugins/data_grid/DataGridPluginConfig",
    "fieldNames": ["characters"]
}
```

#### 🚫 Will not work
Multiple fields (fieldNames) where 1 or more arrays are two-dimensional

```json title="lotr.entity.json"
{
    "hobbits": ["Frodo", "Sam", "Merry"],
    "others": [
        ["Legolas", "Arwen", "Galadriel"], 
        ["Aragorn", "Boromir", "Faramir"], 
        ["Gandalf", "Saruman", "Radagast"]
    ]
}
```

```json title="lotr.recipe.json"
"config": {
    "type": "PLUGINS:dm-core-plugins/data_grid/DataGridPluginConfig",
    "fieldNames": ["hobbits", "others"]
}
```