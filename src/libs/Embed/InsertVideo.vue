<template>
  <button
    class="btn-toggle"
    title="Video URL"
    @click="addEmbed"
  >
    <font-awesome-icon :icon="['fas', 'video']" />
  </button>
</template>

<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import randomstring from 'randomstring'
import _ from 'underscore'

library.add(faVideo)

export default {
  components: {
    FontAwesomeIcon,
  },
  props: ['editor', 'insert'],
  emits: ['onChange'],
  data() {
    return {
      embedElm: null as any,
      whiteEmbedList: {
        loom: 'https://www.loom.com/embed',
        vimeo: 'https://player.vimeo.com',
        youtube: 'https://www.youtube.com',
        'youtu.be/': 'https://www.youtube.com',
      },
    }
  },
  mounted() {
    this.subscribe()
    this.initializeExisting()
  },
  unmounted() {
    this.unsubscribe()
  },
  methods: {
    subscribe() {
      this.editor.subscribe('editableKeyup', this.detectEmbed)
    },
    unsubscribe() {
      this.editor.unsubscribe('editableKeyup', this.detectEmbed)
    },
    initializeExisting() {
      setTimeout(() => {
        const focused = this.editor.getFocusedElement()
        if (!focused) return false

        const editorEmbeds = focused.getElementsByClassName('editor-video')
        _.map(editorEmbeds, (elm: any) => {
          const nextElm = elm.nextElementSibling
          const link = elm.getElementsByTagName('a')[0]
          if (!link) return

          const url = link.getAttribute('href')
          nextElm.outerHTML = ''

          this.renderEmbed(url, elm)
        })
      })
    },
    addEmbed() {
      if (this.insert.isToggle) {
        this.editor.pasteHTML(`<p class="editor-video"><br></p>`, {
          cleanAttrs: [],
          cleanTags: [],
          unwrapTags: [],
        })
        this.embedElm = this.editor.getSelectedParentElement()

        // eslint-disable-next-line vue/no-mutating-props
        this.insert.isToggle = false
        // eslint-disable-next-line vue/no-mutating-props
        this.insert.isShow = false
      }
    },
    detectEmbed(e: { keyCode: number }) {
      if (e.keyCode === 13 && this.embedElm) {
        const url = this.embedElm.innerHTML.replace('<br>', '')
        this.renderEmbed(url, this.embedElm)
        this.embedElm = null
        // eslint-disable-next-line vue/no-mutating-props
        this.insert.isShow = false
      }
    },
    renderEmbed(url: string, elm: any) {
      if (!this.isValidUrl(url)) {
        return
      }
      elm.innerHTML = `
            <div class="video-embed-iframe"></div>
            `
      const id = randomstring.generate()
      const iframe = document.createElement('iframe')
      const iframeContainer =
        elm.getElementsByClassName('video-embed-iframe')[0]
      iframe.id = id

      iframe.height = '500'
      iframe.title = 'Video ' + id
      iframe.allow =
        'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      iframe.src = this.extractAndValidateVideoUrl(url)
      iframeContainer.appendChild(iframe)

      setTimeout(() => {
        // const focused = this.editor.getSelectedParentElement()
        // this.currentLine =
        //     this.editor.getSelectedParentElement().previousElementSibling.previousElementSibling
        // const currentIframe = focused.querySelector('iframe')
        // const currentPos = currentIframe.getBoundingClientRect()
        // window.scrollTo(0, currentPos.top - currentPos.x)
        this.$emit('onChange')
      }, 100)
    },

    addHttpIfRequired(url: string) {
      const httpRegex = /^https?:\/\//
      return httpRegex.test(url) ? url : `https://${url}`
    },

    extractAndValidateVideoUrl(linkUrl: string) {
      const clearedSpaceUrl = linkUrl.replace(/\s/g, '')
      const transformedUrl = this.addHttpIfRequired(clearedSpaceUrl)

      if (!this.isValidUrl(linkUrl)) {
        return ''
      }

      // TODO: implement wiser vaildation now it tries to extract src="..." section if it's not found ->
      //       check if it's a player from youtube or other whitelisted and save it. on load - it embeds y inside <iframe>
      const matched = transformedUrl.match(/src\s*=\s*"([^"]+)"/)
      const videoSrc = matched && matched[1] ? matched[1] : transformedUrl

      if (
        !Object.keys(this.whiteEmbedList).some((element) =>
          videoSrc.includes(element)
        )
      ) {
        return ''
      }

      return videoSrc.includes('embed')
        ? videoSrc
        : this.transformToPlayer(videoSrc)
    },

    transformToPlayer(link: string) {
      if (link.includes('youtube')) {
        if (link.includes('youtube.com/shorts/')) {
          const matched = link.match(/youtube.com\/shorts\/(.*)$/)
          if (!matched) {
            return ''
          }
          const videoId = matched[1].split('?')[0]
          return `${this.whiteEmbedList.youtube}/embed/${videoId}`
        }

        const matched = link.match(/v=(.*)$/)
        if (!matched) {
          return ''
        }
        return `${this.whiteEmbedList.youtube}/embed/${
          matched[1].includes('&') ? matched[1].split('&')[0] : matched[1]
        }`
      }

      if (link.includes('youtu.be/')) {
        const matched = link.match(/youtu\.be\/(.*)$/)
        if (!matched) {
          return ''
        }
        return `${this.whiteEmbedList.youtube}/embed/${matched[1]}`
      }

      if (link.includes('vimeo')) {
        const matched = link.split('/').pop()
        if (!matched) {
          return ''
        }
        return `${this.whiteEmbedList.vimeo}/video/${matched}`
      }

      if (link.includes('loom')) {
        const matched = link.split('/').pop()
        if (!matched) {
          return ''
        }
        return `${this.whiteEmbedList.loom}/${matched}`
      }

      return ''
    },

    isValidUrl(url: string) {
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      )
      return !!pattern.test(url)
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
