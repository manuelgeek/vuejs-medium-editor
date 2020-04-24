[![npm version](https://badge.fury.io/js/vuejs-medium-editor.svg)](https://github.com/manuelgeek/vuejs-medium-editor)  [![npm version](https://badgen.net/npm/dt/vuejs-medium-editor)](https://github.com/manuelgeek/vuejs-medium-editor) [![npm version](https://badgen.net/npm/license/lodash)](https://github.com/manuelgeek/vuejs-medium-editor)
# VueJS Medium Editor

Vue Js component for Medium Editor wrapper with https://github.com/yabwe/medium-editor
But all plugins are re-writing in Vue.js

## Demo
[Demo](https://manuelgeek.github.io/vuejs-medium-editor/)

## Features
- Medium like editor
- Image uploader and description
    - Image width configable width for normal / expand / full screen sizing
- Embed Gist
- Inline code syntax highting

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

Don't forget to include css file in your project
```js
require 'medium-editor/dist/css/medium-editor.css'
require 'vuejs-medium-editor/src/themes/default.css'
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
### toolbar
you can customize the toolbar buttons too 

```js
    toolbar: {
          buttons: ["bold", "italic", "underline", "quote", "h1", "h2", "h3", 'pre', 'unorderedlist']
        }
```
available options: ``bold,
italic,
underline,
strikethrough,
superscript,
subscript,
image,
html,
orderedlist,
unorderedlist,
indent,
outdent,
justifyCenter,
justifyFull,
justifyLeft,
justifyRight,
removeFormat,
quote,
pre,
h1,
h2,
h3,
h4,
h5,
h6``

### images

available options too thanks to [ErgoFriend](https://github.com/ErgoFriend) pull request on the original repo

```js
options: {
    uploadUrl: "https://api.imgur.com/3/image",
    uploadUrlHeader: {'Authorization': 'Client-ID a3tw6ve4wss3c'},
    file_input_name: "image",
    imgur: true,
 }

```

### code highlighting

You can include the ``pre`` option on the toolbar to include a code snipet apart from the ``<>`` attachment icon to include your gist link.

you can make use of [Code Prettify](https://github.com/google/code-prettify)
see its doc on [getting started](https://github.com/google/code-prettify/blob/master/docs/getting_started.md) on its styling and possible options. 

Include its JS file in your index.html header 
``` html
<script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?skin=default"></script>
```
Code prettify uses ``<pre>`` or ``<code>`` with a ``class="prettyprint"`` 

you can add this class to your code in the component mount as follows;
```js 
mounted(){
      const els = document.getElementsByTagName("pre");
      for (let i = 0; i < els.length; i++) {
          const element = els[i];
          element.classList.add('prettyprint');
      }
  }
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

MIT: https://github.com/manuelgeek/vuejs-medium-editor/blob/master/LICENSE