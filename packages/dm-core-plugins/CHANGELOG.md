# Changelog

## 1.1.0 (2023-06-29)


### Features

* accept rootId param in addView function ([858fff5](https://github.com/equinor/dm-core-packages/commit/858fff571d5c7a40bf98038944b6cead1a42f8be))
* add grid plugin ([457ae72](https://github.com/equinor/dm-core-packages/commit/457ae72582e29911332ec2eeb2319b7070f97b3b))
* add option to hide attributes in attribute selector plugin ([1d1989c](https://github.com/equinor/dm-core-packages/commit/1d1989c0f08634d46aede2d8d890ff3c8135c3b1))
* add support for grid gap config ([ce38e97](https://github.com/equinor/dm-core-packages/commit/ce38e97c0aa0e30b5626bb5ac27b777b291668dd))
* **attribute-selector:** configure content with ViewConfigs ([779c609](https://github.com/equinor/dm-core-packages/commit/779c609b26a93a3bf95fe8c2fa872eac54995458))
* combined view for close button and tab it belongs to ([3bba386](https://github.com/equinor/dm-core-packages/commit/3bba386a00fbf9803b0957860b49aff0b6633da4))
* display EDS icon for tabs selector in attribute-selector plugin ([ea54c46](https://github.com/equinor/dm-core-packages/commit/ea54c46ea5f8cd05371ea3eb38a97eb28804f7ff))
* enable custom form widgets ([#275](https://github.com/equinor/dm-core-packages/issues/275)) ([4b8a22b](https://github.com/equinor/dm-core-packages/commit/4b8a22bdc9bb852adb72286278f431a1775e33f9))
* **generic-list:** added generic list plugin ([121e070](https://github.com/equinor/dm-core-packages/commit/121e070703c7c40dd22126e79aeae2e47efd5ec6))
* **generic-list:** remove and add items ([b58a45c](https://github.com/equinor/dm-core-packages/commit/b58a45cc580747b327ad611e63ec71a41be0d4f6))
* **generic-list:** reorder items in list ([987fd08](https://github.com/equinor/dm-core-packages/commit/987fd080a2ed9489537e8be5e0d66ba6df7c71b2))
* **generic-list:** support for pagination ([f522e7a](https://github.com/equinor/dm-core-packages/commit/f522e7a332fc6a277b9471f857e3a93ebfa4e28b))
* **generic-list:** support view concept ([20be9b2](https://github.com/equinor/dm-core-packages/commit/20be9b2d83ec9ed830890ee2f3cd51d58843d5b5))
* implementation of yarn workspaces and fix node_modules bugs ([5f72fb6](https://github.com/equinor/dm-core-packages/commit/5f72fb6ae67574553ed0fdb462ca676730d75c59))
* make tabs closeable + eds switch ([2d7db7d](https://github.com/equinor/dm-core-packages/commit/2d7db7dd730e8711d2742446c3d4e4d067fac2e6))
* **object-table:** editable and viewmode for table of objects ([8c62d06](https://github.com/equinor/dm-core-packages/commit/8c62d061a15b479e939760badebe1f61370baf94))
* playwright node ([3d73924](https://github.com/equinor/dm-core-packages/commit/3d73924b6e5a8f760667e08bb5947935fdf7340c))
* rework generic-list plugin to cover 'collapsible object table' needs ([691057b](https://github.com/equinor/dm-core-packages/commit/691057b4a7d4691318347e03b44974f8b2de3354))
* select next, previous then self on view/tab close ([8ad3c77](https://github.com/equinor/dm-core-packages/commit/8ad3c77abbe83ba26d093e20a7886c9a6dfa7925))
* support files ([9b8b3d3](https://github.com/equinor/dm-core-packages/commit/9b8b3d37f55a75a8f08bc7858ccdaa10b08a3b70))
* **UiRecipeSelector:** support view concept ([9ebc973](https://github.com/equinor/dm-core-packages/commit/9ebc97372445b92f1271c57497fbc24e84ab27d6))


### Bug Fixes

* add all EDS icons to attribute-selector ([3493a4a](https://github.com/equinor/dm-core-packages/commit/3493a4aa62c1a86febf8d5c45dc24d0bd4900a32))
* add back readme to tabs plugin and update other readmes ([b9e6d08](https://github.com/equinor/dm-core-packages/commit/b9e6d08ca05c1945dce9f8882fc880c301002477))
* add key to AppBox ([6a413f9](https://github.com/equinor/dm-core-packages/commit/6a413f9f016156ff335c0b133730d9dcb71f9f1a))
* add missing widget attribute to form Field ([ce585cf](https://github.com/equinor/dm-core-packages/commit/ce585cf4bd4ae6de7f77167e24c63cbb19d5db8b))
* add more props to TextField component in TextWidget ([98d00ee](https://github.com/equinor/dm-core-packages/commit/98d00eefde9d86c4d0050e24f77fefb2a2e05cdd))
* add type to dependencies ([0500638](https://github.com/equinor/dm-core-packages/commit/05006383067a7535e5ac16350c1846be1721c876))
* allow no config for header plugin ([bf296ac](https://github.com/equinor/dm-core-packages/commit/bf296ace3fbd6d7ebd50a2cbd5a71030e59e4662))
* attribute path should not be included all times ([38e4454](https://github.com/equinor/dm-core-packages/commit/38e4454ab2d1fb278c78798fbb7835b96c4ab46e))
* avoid eslint failure ([9153d02](https://github.com/equinor/dm-core-packages/commit/9153d0284ec04b5d95e7eaaa762e8de14170244b))
* avoid recursion on default attribute-selector config ([aa38b09](https://github.com/equinor/dm-core-packages/commit/aa38b09893fd5b63f727e0f8038fb04ea54c6206))
* better error handing in attribute selector ([457c73f](https://github.com/equinor/dm-core-packages/commit/457c73fcd9716d90c1ae73ac6328d7745c45452e))
* bug in form plugin ([f8ae823](https://github.com/equinor/dm-core-packages/commit/f8ae823ec255a6305aeaf0374658636ba60ea3e6))
* bug when opening unsaved table row ([3094c3d](https://github.com/equinor/dm-core-packages/commit/3094c3db94c696fb11ed4bdf3f63bece13363366))
* bug when saving optional value in form plugin ([a5b9607](https://github.com/equinor/dm-core-packages/commit/a5b9607bcf9e1e76b8a827b5e74391fbb9817b41))
* bugs in generic list plugin ([a3559c8](https://github.com/equinor/dm-core-packages/commit/a3559c8ad329ae2da01e291640d2b9edaf1c5f3d))
* bugs with tree ([c2b2623](https://github.com/equinor/dm-core-packages/commit/c2b26230f9b691623dbdc7b107faa66339c5cd83))
* change overflow in explorer plugin from scroll to auto ([79a8a33](https://github.com/equinor/dm-core-packages/commit/79a8a33635fdb7e42123c6c9f26873c791c21198))
* content of sidebar now fills available space ([fa06164](https://github.com/equinor/dm-core-packages/commit/fa06164a7a863d0608e0f5f142a0110c84018520))
* dependency issues and typo ([e7aaf14](https://github.com/equinor/dm-core-packages/commit/e7aaf145987b59afd2af66bedfab823b9b56cc46))
* dependency issues that cause tests to fail ([5cd4060](https://github.com/equinor/dm-core-packages/commit/5cd406081625f89a372830d7064cbd53c4b94230))
* dependency issues that cause tests to fail ([0c64ab3](https://github.com/equinor/dm-core-packages/commit/0c64ab3c8a6a921b9ba8c66fb09a7eee74a0adcf))
* dependency issues that cause tests to fail ([4b1171d](https://github.com/equinor/dm-core-packages/commit/4b1171d828caa95693ee9b4b9276c17ef413bcfa))
* form plugin bug with uncontained attribute ([f897975](https://github.com/equinor/dm-core-packages/commit/f8979753f73dd799d5490b76eb3b3238a25d654e))
* **form:** dont set 'namePath' on root ([9290093](https://github.com/equinor/dm-core-packages/commit/9290093dc534c7ca07411540d365176f33d8d8c0))
* **form:** fix a bug where form continued with bad state ([effb475](https://github.com/equinor/dm-core-packages/commit/effb475d65bd40ab4ee0a549024559e845bb6e74))
* **grid:** pass type to grid elements ([12777ee](https://github.com/equinor/dm-core-packages/commit/12777ee7ee6afa3dc9ae7fbe500e14191f80c68c))
* **header:** pass recipe config to header children ([9fad9ef](https://github.com/equinor/dm-core-packages/commit/9fad9ef9df1f4c0f80973e06c919a577f11d6027))
* **hot:** duplicate command entry in plugins package json ([f3bd581](https://github.com/equinor/dm-core-packages/commit/f3bd581169ef9a433051ab9ff3265746d31bab59))
* include initialRecipe for name search. New list query syntax ([7140912](https://github.com/equinor/dm-core-packages/commit/714091223b47855e34eb552cb24a5c1017a4bd61))
* include json file in built dm-core-plugins package ([8a3319b](https://github.com/equinor/dm-core-packages/commit/8a3319b026b3955b9dd2e032f4ad94f41c94611f))
* index is not set correctly ([ecd0640](https://github.com/equinor/dm-core-packages/commit/ecd06404c110633213184df1598ed8e78b21fd89))
* loading bug in tree ([14b562f](https://github.com/equinor/dm-core-packages/commit/14b562f675ea4794a8f77ee7a988426e05e8dd41))
* make tree view and right window in explorer plugin scrollable ([2e49785](https://github.com/equinor/dm-core-packages/commit/2e49785286af2991fb29f8e9ce69b88faefa988e))
* minor misses in merging and items is type array ([2bde93b](https://github.com/equinor/dm-core-packages/commit/2bde93b6410e48f8c6f4ee1cd946f56877a1e9d0))
* modeling issues and error handling in GenericTablePlugin.tsx ([5446bac](https://github.com/equinor/dm-core-packages/commit/5446bac68da0ea4510bfc509c5794d56c21f4a9d))
* **onOpen:** make it possible to open complex attributes in 'AttributeSelector' ([0992c32](https://github.com/equinor/dm-core-packages/commit/0992c327878ca36a83a7cca6af874243c16fc731))
* remove type as input ([4b91e26](https://github.com/equinor/dm-core-packages/commit/4b91e2623afc17224013ac2c35db2e7715356ae4))
* rename default-preview plugin to json ([feca7c7](https://github.com/equinor/dm-core-packages/commit/feca7c7872e90c1a7e65eb875acaced67fbd3671))
* tab label priority. label -&gt; name -> attribute ([a53f89e](https://github.com/equinor/dm-core-packages/commit/a53f89e6d1ee016824bd03656089c9ad3a37cd26))
* tests ([b5c4bbf](https://github.com/equinor/dm-core-packages/commit/b5c4bbfe764083bfc7481da6a6cedcb874d976b5))
* ts errors with latest core version ([251aff3](https://github.com/equinor/dm-core-packages/commit/251aff3bf752efc20f14be0b4d7830e227ee635e))
* type error for form plugin ([89d7819](https://github.com/equinor/dm-core-packages/commit/89d7819d02e339e104b5db2cb32792f14f59d7bf))
* types in explorer and form component ([50962fa](https://github.com/equinor/dm-core-packages/commit/50962fa156febd850e2eb215a9937f3b06a5fe1b))
* update API calls to dmss api ([c714d0a](https://github.com/equinor/dm-core-packages/commit/c714d0a0e9aa81d978d67f43d6971e050dfab049))
* update example readme and delete node_modules in 'build-all'-command ([d51b220](https://github.com/equinor/dm-core-packages/commit/d51b22022d2c7203064244e9e344ace391365e96))
* **ViewCreator:** get type and dimensions from blueprints ([c2dc6de](https://github.com/equinor/dm-core-packages/commit/c2dc6de312ed64432f1e2b0631c17d1abe34b8e7))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @development-framework/dm-core bumped from ^1.0.61 to ^1.1.0