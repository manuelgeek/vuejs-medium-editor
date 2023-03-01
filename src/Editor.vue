<template>
  <div>
    <!-- Editor Mode -->
    <div
      v-if="!readOnly"
      class="medium-editor-container"
    >
      <insert-embed
        v-if="editor"
        :upload-url="options.uploadUrl"
        :upload-url-header="options.uploadUrlHeader"
        :file_input_name="options.file_input_name"
        :file_size="options.file_size"
        :imgur_bool="options.imgur"
        :on-change="triggerChange"
        :editor-ref="$refs.editor"
        :editor="editor"
        :hide-gist="hideGist"
        :hide-image="hideImage"
        @uploaded="uploadedCallback"
      ></insert-embed>
      <list-handler
        v-if="editor"
        :editor="editor"
        :on-change="triggerChange"
      ></list-handler>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div
        ref="editor"
        class="editor"
        :class="editorClass"
        v-html="prefill"
      ></div>
    </div>
    <!-- Read Only Mode -->
    <read-mode
      v-if="readOnly"
      :content="prefill"
    ></read-mode>
  </div>
</template>

<script lang="ts">
import MediumEditor from 'medium-editor'
import InsertEmbed from './libs/InsertEmbed.vue'
import ListHandler from './libs/ListHandler.vue'
import ReadMode from './libs/ReadMode.vue'
import _ from 'underscore'
import hljs from 'highlight.js'

export default {
  name: 'MediumEditor',
  components: {
    InsertEmbed,
    ListHandler,
    ReadMode,
  },
  props: [
    'options',
    'onChange',
    'prefill',
    'readOnly',
    'hideGist',
    'hideImage',
  ],
  emits: ['uploaded', 'input'],
  data() {
    return {
      editor: null as any,
      defaultOptions: {
        forcePlainText: false,
        placeholder: {
          text: 'Write something great!!',
        },
        uploadUrl: 'https://api.imgur.com/3/image',
        uploadUrlHeader: { Authorization: 'Client-ID db856b43cc7f441' },
        file_input_name: 'image',
        file_size: 1024 * 1024 * 10,
        imgur: true,
        toolbar: {
          buttons: [
            'bold',
            'italic',
            'quote',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'anchor',
          ],
        },
      },
      hasContent: false,
      autoLink: true,
    }
  },
  computed: {
    editorOptions() {
      return _.extend(this.defaultOptions, this.options)
    },
    editorClass() {
      return {
        'has-content': this.hasContent,
      }
    },
  },
  mounted() {
    this.addClassToPre()
    if (!this.readOnly) {
      this.createElm()
    }
  },
  unmounted() {
    this.destroyElm()
  },
  methods: {
    createElm() {
      this.editor = new MediumEditor(this.$refs.editor, this.editorOptions)
      if (this.prefill) {
        this.hasContent = /<[a-z][\s\S]*>/i.test(this.prefill)
        ;(this.$refs as any).editor.focus()
      }
      this.editor.subscribe('editableInput', this.triggerChange)
    },
    destroyElm() {
      this.editor.destroy()
    },
    triggerChange() {
      this.addClassToPre()
      const content = this.editor.getContent()
      setTimeout(() => {
        this.hasContent = /<[a-z][\s\S]*>/i.test(content)
      }, 0)
      this.$emit('input', content)
      if (this.onChange) {
        this.onChange(content)
      }
    },
    uploadedCallback(url: string) {
      // console.log("callback")
      this.$emit('uploaded', url)
    },
    addClassToPre() {
      hljs.configure({})
      const brPlugin = {
        'before:highlightBlock': ({ block }: { block: any }) => {
          block.innerHTML = block.innerHTML.replace(/<br[ /]*>/g, '\n')
        },
        'after:highlightBlock': ({ result }: { result: any }) => {
          result.value = result.value.replace(/\n/g, '<br>')
        },
      }

      hljs.addPlugin(brPlugin)
      document.querySelectorAll('pre').forEach((block) => {
        hljs.highlightElement(block)
        block.setAttribute('spellcheck', 'false')
      })
    },
  },
}
</script>
