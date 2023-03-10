<template>
  <div class="image-handler-container">
    <div
      v-show="insert.isShow"
      class="insert-image-container"
      :style="insert.position"
    >
      <div class="insert-image-toggle">
        <button
          class="btn-toggle"
          @click="toggle"
        >
          <font-awesome-icon icon="plus" />
        </button>
      </div>
      <div
        v-show="insert.isToggle"
        class="insert-image-menu"
      >
        <insert-image
          v-if="!hideImage"
          :editor="editor"
          :insert="insert"
          :editor-ref="editorRef"
          :upload-url="uploadUrl"
          :upload-url-header="uploadUrlHeader"
          :file_input_name="file_input_name"
          :file_size="file_size"
          :imgur_bool="imgur_bool"
          :handler="handler"
          title="Insert Image"
          @uploaded="uploadCallback"
          @image-click="imageClickHandler"
        ></insert-image>
        <insert-gist
          v-if="!hideGist"
          :editor="editor"
          :insert="insert"
          title="Insert gist"
          @on-change="onChange"
        ></insert-gist>
        <insert-video
          v-if="!hideVideo"
          :editor="editor"
          :insert="insert"
          title="Insert video"
          @on-change="onChange"
        ></insert-video>
      </div>
    </div>
    <image-position
      :handler="handler"
      @on-position-change="onChange"
    ></image-position>
  </div>
</template>

<script lang="ts">
import InsertImage from './Embed/InsertImage.vue'
import InsertGist from './Embed/InsertGist.vue'
import InsertVideo from './Embed/InsertVideo.vue'
import ImagePosition from './Embed/ImagePosition.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import _ from 'underscore'

library.add(faPlus)

export default {
  components: {
    FontAwesomeIcon,
    InsertImage,
    InsertGist,
    ImagePosition,
    InsertVideo,
  },
  props: [
    'editor',
    'uploadUrl',
    'uploadUrlHeader',
    'file_input_name',
    'file_size',
    'imgur_bool',
    'editorRef',
    'onChange',
    'hideGist',
    'hideVideo',
    'hideImage',
  ],
  emits: ['uploaded'],
  data() {
    return {
      insert: {
        position: {
          top: '0',
          left: '0',
        },
        isShow: false,
        isToggle: false,
        embedElm: null,
        files: [],
        focusLine: null,
      },
      handler: {
        currentLine: null,
        currentImg: null,
        currentSize: 'is-normal',
        position: {
          top: '0',
        },
        isShow: false,
      },
    }
  },
  mounted() {
    this.subscribe()
    let el = document.getElementsByClassName('editor medium-editor-element')
    if (el.length > 0) el[0].setAttribute('data-medium-focused', 'true')
  },
  unmounted() {
    this.unsubscribe()
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    subscribe() {
      this.editor.subscribe('editableKeyup', this.detectShowToggle)
      this.editor.subscribe('editableClick', this.detectShowToggle)
      this.editor.subscribe('editableKeyup', this.detectImageDescription)
      this.editor.subscribe('editableClick', this.detectImageDescription)
    },
    unsubscribe() {
      this.editor.unsubscribe('editableKeyup', this.detectShowToggle)
      this.editor.unsubscribe('editableClick', this.detectShowToggle)
      this.editor.unsubscribe('editableKeyup', this.detectImageDescription)
      this.editor.unsubscribe('editableClick', this.detectImageDescription)
    },
    detectImageDescription() {
      const focused = this.editor.getFocusedElement()
      if (!focused) return

      const editorImages = focused.getElementsByClassName(
        'editor-image-description'
      )
      _.map(editorImages, (elm) => {
        const description = elm.innerHTML.trim()
        if (!description || description == '<br>') {
          elm.className = 'editor-image-description is-empty'
        } else {
          elm.className = 'editor-image-description'
        }
      })
    },
    detectShowToggle(e: {
      keyCode: number
      target: { className: string | string[] }
    }) {
      if (this.insert.isShow && this.insert.isToggle) {
        this.toggle()
      }
      if (e.keyCode == 13) {
        const focused = this.editor.getSelectedParentElement()
        const nextElm = focused.nextElementSibling
        const prevElm = focused.previousElementSibling
        if (
          nextElm &&
          prevElm &&
          nextElm.className.indexOf('editor-image-description') > -1 &&
          prevElm.className.indexOf('editor-image') > -1
        ) {
          nextElm.parentNode.insertBefore(nextElm, focused)
        }
      }
      this.handler.isShow = false
      if (e.target.className.indexOf('editor-image-description') <= -1) {
        const editorImages = this.editor
          .getFocusedElement()
          .getElementsByClassName('editor-image')
        _.map(editorImages, (imgElm) => {
          imgElm.className = imgElm.className.replace('is-focus', '')
        })
      }
      const currentLine = this.editor.getSelectedParentElement()
      const outerHtml = currentLine.outerHTML
      const isList = outerHtml.indexOf('<li>') > -1
      const content = currentLine.innerHTML.replace(/^(<br\s*\/?>)+/, '').trim()
      if (content || isList) {
        // Not show toggle if focus line has content & list
        this.insert.isShow = false
        this.insert.isToggle = false
        this.insert.focusLine = null
      } else {
        const currentPos = currentLine.getBoundingClientRect()
        this.insert.position.top = currentPos.top + 'px'
        this.insert.position.left = currentPos.left + 'px'
        this.insert.isShow = true
        this.insert.focusLine = currentLine
      }
    },
    toggle() {
      this.insert.isToggle = !this.insert.isToggle
      let el = document.getElementsByClassName('editor medium-editor-element')
      console.log({ el })
      if (el && el.length > 0) el[0].removeAttribute('data-placeholder')
    },
    imageClickHandler(value: {
      currentLine: null
      currentImg: null
      currentSize: string
      position: { top: string }
      isShow: boolean
    }) {
      this.handler = value
    },
    uploadCallback(url: any) {
      this.$emit('uploaded', url)
    },
    handleScroll() {
      this.handler.isShow = false
      if (this.insert.isShow) {
        const currentLine = this.editor.getSelectedParentElement()
        const currentPos = currentLine.getBoundingClientRect()
        this.insert = {
          ...this.insert,
          isShow: true,
          focusLine: currentLine,
          position: {
            top: currentPos.top + 'px',
            left: currentPos.left + 'px',
          },
        }
      }
    },
  },
}
</script>
