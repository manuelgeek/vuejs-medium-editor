[![npm version](https://badge.fury.io/js/vuejs-medium-editor.svg)](https://badge.fury.io/js/vuejs-medium-editor)  [![npm version](https://badgen.net/npm/dt/vuejs-medium-editor)](https://badgen.net/npm/dt/vuejs-medium-editor) [![npm version](https://badgen.net/npm/license/lodash)](https://badgen.net/npm/license/lodash)
# VueJS Medium Editor

Vue Js component for Medium Editor wrapper with https://github.com/yabwe/medium-editor
But all plugins are re-writing in Vue.js

## Demo
[Demo](https://manuelgeek.github.io/vuejs-medium-editor/)

NOTE: The demo works for all features except upload photo because i doesn't deploy a serverside.

## Features
- Medium like editor
- Image uploader and description
    - Image width configable width for normal / expand / full screen sizing
- Embed Gist

## Usage

### Installation

```
yarn add vuejs-medium-editor
```
OR 

```
npm install vuejs-medium-editor
```

### Usage

add to global component

```js
import Vue from 'vue'
import MediumEditor from 'vuejs-medium-editor'

Vue.component('medium-editor', MediumEditor)
```

usage

```js
<medium-editor :content='content' :options='options' />

<script>
export default {
    data() {
        return {
            content: "",
            options: {
            }
        }
    }
}
</script>
```

available options too thanks to [ErgoFriend](https://github.com/ErgoFriend) pull request on the original repo

```js
options: {
    uploadUrl: "https://api.imgur.com/3/image",
    uploadUrlHeader: {'Authorization': 'Client-ID a3tw6ve4wss3c'},
    file_input_name: "image",
    imgur: true,
 }

```

Don't forget to include css file in your project
```js
require 'medium-editor/dist/css/medium-editor.css'
require 'vuejs-medium-editor/src/themes/default.css'
```

### Nuxt.js Usage

create a plugins

```js
import Vue from 'vue'
import MediumEditor from 'vuejs-medium-editor'

Vue.component('medium-editor', MediumEditor)
```

import a plugin in nuxt.config.js with disable ssr mode

```js
plugins: [
    { src: '~/plugins/medium-editor', ssr: false },
]
```

include a css file
```js
css: [
    'medium-editor/dist/css/medium-editor.css',
    'vuejs-medium-editor/src/themes/default.css'
]
```

## Credits

The original repo [vue2-medium-editor](https://github.com/tui2tone/vue2-medium-editor)
customised this to my preference

[<img width=200 src="https://appslab.co.ke/assets/img/logo.png">](https://appslab.co.ke) 

## License

MIT: https://github.com/tui2tone/vue2-medium-editor/blob/master/LICENSE