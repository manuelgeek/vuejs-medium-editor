<!-- eslint-disable vue/no-mutating-props -->
<template>
  <file-upload
    ref="upload"
    v-model="insert.files"
    class="btn-toggle"
    extensions="gif,jpg,jpeg,png,webp"
    accept="image/png,image/gif,image/jpeg,image/webp"
    :post-action="uploadUrl"
    :headers="uploadUrlHeader"
    :name="file_input_name"
    :multiple="true"
    :size="file_size"
    @input-filter="inputFilter"
    @input-file="inputFile"
  >
    <font-awesome-icon :icon="['far', 'images']" />
  </file-upload>
</template>

<script lang="ts">
import VueUploadComponent from 'vue-upload-component'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faImages } from '@fortawesome/free-regular-svg-icons'
import _ from 'underscore'

library.add(faImages)

export default {
  components: {
    FontAwesomeIcon,
    'file-upload': VueUploadComponent,
  },
  props: [
    'editor',
    'insert',
    'uploadUrl',
    'uploadUrlHeader',
    'file_input_name',
    'file_size',
    'imgur_bool',
    'editorRef',
    'handler',
  ],
  emits: ['imageClick', 'uploaded'],
  data() {
    return {
      currentLine: null as any,
      currentImg: null as any,
      currentSize: 'is-normal',
      position: {
        top: '0',
      },
      isShow: false,
    }
  },
  mounted() {
    this.initializeExisting()
  },
  methods: {
    initializeExisting() {
      const handlerVm = this
      setTimeout(() => {
        const focused = this.editor.getFocusedElement()
        if (!focused) return false

        const editorImages = focused.getElementsByClassName('editor-image')
        _.map(editorImages, (elm: { onclick: () => void }) => {
          // Set Onclick to Show Image Size Handler
          elm.onclick = function () {
            setTimeout(() => {
              handlerVm.sizingHandler(this)
            })
          }
        })
      })
    },
    addImage(url: string) {
      this.$emit('uploaded', url)
      if (this.insert.isToggle) {
        const handlerVm = this
        this.editorRef.focus()
        this.editor.selectElement(this.insert.focusLine)
        this.editor.pasteHTML(
          `<div class="editor-image">
                        <img src="${url}" />
                    </div>
                    <div class="editor-image-description"><br></div>
                    <br />`,
          { cleanAttrs: [], cleanTags: [], unwrapTags: [] }
        )
        this.currentLine =
          this.editor.getSelectedParentElement().previousElementSibling.previousElementSibling
        this.currentImg = this.currentLine.querySelector('img')
        const currentPos = this.currentImg.getBoundingClientRect()
        window.scrollTo(0, currentPos.top - currentPos.x)
        this.currentLine.onclick = function () {
          setTimeout(() => {
            handlerVm.sizingHandler(this)
          })
        }
        // eslint-disable-next-line vue/no-mutating-props
        this.insert.isShow = false
      }
    },
    sizingHandler(elm: any) {
      const className = elm.className
      elm.className = className.replace('is-focus', '') + ' is-focus'
      if (className.indexOf('expand') > -1) {
        this.currentSize = 'is-expand'
      } else if (className.indexOf('full') > -1) {
        this.currentSize = 'is-full'
      } else {
        this.currentSize = 'is-normal'
      }
      const img = elm.querySelector('img')
      this.currentLine = elm
      this.isShow = true
      const currentPos = img.getBoundingClientRect()
      this.position.top = currentPos.top + 'px'
      this.$emit('imageClick', {
        position: this.position,
        currentLine: this.currentLine,
        isShow: this.isShow,
        currentSize: this.currentSize,
      })
    },
    inputFilter(newFile: { name: string }, oldFile: any, prevent: () => any) {
      if (newFile && !oldFile) {
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
      }
    },
    inputFile(
      newFile: {
        success: any
        response: { data: { link: string }; url: string }
      },
      oldFile: any
    ) {
      if (newFile && !oldFile) {
        ;(this.$refs as any).upload.active = true
      }

      // Image Upload Successful
      if (newFile && newFile.success) {
        if (this.imgur_bool) {
          this.addImage(newFile.response.data.link)
        } else {
          this.addImage(newFile.response.url)
        }
      }
    },
  },
  // beforeMount() {
  //     window.addEventListener('scroll', this.handleScroll);
  // },
  // beforeDestroy() {
  //     window.removeEventListener('scroll', this.handleScroll);
  // }
}
</script>
