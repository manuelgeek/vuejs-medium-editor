<template>
  <div class="list-handler"></div>
</template>

<script lang="ts">
export default {
  components: {},
  props: ['editor'],
  data() {
    return {
      focusLine: null as any,
      currentLine: null as any,
      isLastBeforeLi: false,
    }
  },
  mounted() {
    this.subscribe()
  },
  unmounted() {
    this.unsubscribe()
  },
  methods: {
    subscribe() {
      this.editor.subscribe('editableKeydown', this.detectList)
      this.editor.subscribe('editableKeyup', this.detectList)
    },
    unsubscribe() {
      this.editor.unsubscribe('editableKeydown', this.detectList)
      this.editor.subscribe('editableKeyup', this.detectList)
    },
    detectList(e: any) {
      this.currentLine = this.editor.getSelectedParentElement()
      const matchList = this.currentLine?.innerHTML.match(/^(-&nbsp;).*/g)

      if (matchList && matchList.length > 0) {
        const content = this.currentLine.innerHTML.replace(/^(-&nbsp;)/g, '')
        this.currentLine.innerHTML = '<ul><li>' + content + '</li></ul>'
      }

      const matchOlList = this.currentLine.innerHTML.match(/^(\d+.&nbsp;)/g)

      if (matchOlList && matchOlList.length > 0) {
        const content = this.currentLine.innerHTML.replace(/^(\d+.&nbsp;)/g, '')
        this.currentLine.innerHTML = '<ol><li>' + content + '</li></ol>'
      }

      const key = e.keyCode || e.charCode
      if (key == 8 || key == 46) {
        if (this.currentLine.outerHTML == '<li><br></li>') {
          this.isLastBeforeLi = true
        } else {
          this.isLastBeforeLi = false
        }

        if (this.isLastBeforeLi) {
          this.currentLine.outerHTML = ''
          this.editor.pasteHTML(`<p><br><br></p>`, {
            cleanAttrs: [],
            cleanTags: [],
            unwrapTags: [],
          })
        }
      }
    },
  },
}
</script>
