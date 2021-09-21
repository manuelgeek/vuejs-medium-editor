[![npm version](https://badge.fury.io/js/vuejs-medium-editor.svg)](https://github.com/manuelgeek/vuejs-medium-editor)  [![npm version](https://badgen.net/npm/dt/vuejs-medium-editor)](https://github.com/manuelgeek/vuejs-medium-editor) [![npm version](https://badgen.net/npm/license/lodash)](https://github.com/manuelgeek/vuejs-medium-editor)
# VueJS Medium Editor

Vue Js component for Medium Editor wrapper with https://github.com/yabwe/medium-editor
But all plugins are re-writing in Vue.js
All Medium Editor configs are supported

## Demo
[Demo](https://manuelgeek.github.io/vuejs-medium-editor/)

## Features
- Medium like editor
- Image uploader and description
    - Image width configable width for normal / expand / full screen sizing
    - Imgur uploading 
- Embed Gist
- Inline code syntax highlighting

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
// for the code highlighting
require 'highlight.js/styles/ocean.css';
```
OR in `styles` like below

```css
<style lang="css">
@import "~medium-editor/dist/css/medium-editor.css";
@import "./themes/default.css";
/*@import '~highlight.js/styles/github.css';*/
@import '~highlight.js/styles/ocean.css';
</style>
```

#### Example

```vue
<medium-editor 
        v-model='content' 
        :options='options' 
        :onChange="onChange" 
        v-on:uploaded="uploadCallback" />

<script>
export default {
    data() {
        return {
            content: "",
            options: {
            }
        }
    },
    components: {
      "medium-editor": Editor
    },
    methods: {
      onChange() {
        console.log(this.content)
      },
      uploadCallback(url) {
        console.log("uploaded url", url)
      }
    },
}
</script>
```

### Available Props
- prefill(string) - Pre filled editor value - default value, 
- readOnly(boolean) - make the editor read only. Default - false
- options - used to pass editor options, see below
- onChange - pass onchange event
- hideImage - Hides image upload option (default -false)
- hideGist - Hides gist code embed - default(false)

### Events
- uploaded - imgur image upload callback

### Options

#### toolbar
you can customize the toolbar buttons too 

```js
 options:{
  toolbar: {
    buttons: ["bold", "italic", "underline", "quote", "h1", "h2", "h3", 'pre', 'unorderedlist']
  }
}
```
available options: All options are available [here](https://github.com/yabwe/medium-editor#mediumeditor-options)
You can also override options like in Medium Editor ;
 ```js
  options:{
    buttons: [
      "anchor",
      {
        name: 'pre',
        action: 'append-pre',
        aria: 'code highlight',
        tagNames: ['pre'],
        contentDefault: '<b><\\></b>',
        contentFA: '<i class="fa fa-code fa-lg"></i>'
      },
    ]
  }

 ```

### images
Using the image option in toolbar, Add image link, highlight to edit, then select image icon

```js
buttons:[
    {
        name: 'image',
        action: 'image',
        aria: 'insert image from url',
        tagNames: ['img'],
        contentDefault: '<b>image</b>',
        contentFA: '<i class="fa fa-picture-o"></i>'
    }
 ]
```

Also, available option: thanks to [ErgoFriend](https://github.com/ErgoFriend) pull request on the original repo

```js
 options: {
    uploadUrl: "https://api.imgur.com/3/image",
    uploadUrlHeader: {'Authorization': 'Client-ID a3tw6ve4wss3c'},
    file_input_name: "image",
    file_size: 1024 * 1024 * 10, 
    imgur: true,
 }

```

### code highlighting
1. Code highlighting is inbuilt using [highlight.js](https://github.com/highlightjs/highlight.js)
Add code snippet, highlight, then select code in toolbar(you need to add `pre` in toolbar, see options above)

You should include the `highligh.js` css file within the styles
```css
<style>
    /*default css  */
    @import '~highlight.js/styles/default.css';
    /* github style */
    @import '~highlight.js/styles/github.css';
</style>
```

You can get [more theme styles here](https://highlightjs.org/static/demo/)


2. Code highliting using gist, also inbuilt. Click + button, then click code(Add gist), then add gist URL, click Enter to finish


### Read only example
```vue
<medium-editor :prefill="defaultValue"  :read-only="true" />
```

### Nuxt.js Usage

create a plugin file `vuejs-medium-editor.js` inside `/plugins` dir

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
    'vuejs-medium-editor/src/themes/default.css',
    'highlight.js/styles/ocean.css' //if using code highlight
]
```


## About Me 

<p align="center"><img src="https://magak.me/assets/images/Geek-logo.png" width="150">

<a target="_blank" href="https://magak.me">Magak Emmanuel</a>
</p>

## Credits

The original repo [vue2-medium-editor](https://github.com/tui2tone/vue2-medium-editor)
customised this to my preference

[<img width=200 src="https://appslab.co.ke/assets/img/logo.png">](https://appslab.co.ke) 

## License

[MIT](LICENSE)

[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)](#)

[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source-200x33.png?v=103)](#)


Happy coding, Star before Fork 😊💪💯
