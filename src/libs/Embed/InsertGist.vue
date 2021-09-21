<template>
    <button class="btn-toggle" v-on:click="addEmbed" title="Gist URL">
        <font-awesome-icon :icon="['fas', 'code']" />
    </button>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import Gist from 'pure-gist-embed';
import randomstring from 'randomstring';
import _ from 'underscore';

library.add(faCode)

export default {
    props: [
        'editor',
        'insert'
    ],
    data() {
        return {
            embedElm: null
        }
    },
    components: {
        FontAwesomeIcon
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
                if(!focused) return false;

                const editorEmbeds = focused.getElementsByClassName('editor-embed')
                _.map(editorEmbeds, (elm) => {
                    const nextElm = elm.nextElementSibling
                    const link = elm.getElementsByTagName('a')[0]
                    if(!link) return;

                    const url = link.getAttribute('href')
                    nextElm.outerHTML = ''

                    this.renderEmbed(url, elm)
                })
            })
        },
        addEmbed() {
            if(this.insert.isToggle) {
                this.editor.pasteHTML(`<p class="editor-embed"><br></p>`, { cleanAttrs: [], cleanTags: [], unwrapTags: []})
                this.embedElm = this.editor.getSelectedParentElement()

                this.insert.isToggle = false
                this.insert.isShow = false
            }
        },
        detectEmbed(e) {
            if (e.keyCode === 13 && this.embedElm) {
                const url = this.embedElm.innerHTML.replace("<br>", "")
                this.renderEmbed(url, this.embedElm)
                this.embedElm = null
                this.insert.isShow = false
            }
        },
        renderEmbed(url, elm) {

            elm.innerHTML = `
            <a href="${url}">${url}</a>
            <div class="gist-embed-iframe"></div>
            `;
            Gist.get(url)
                .then((result) => {
                    const id = randomstring.generate();
                    const iframe = document.createElement('iframe');
                    const html = result.content;
                    const iframeContainer = elm.getElementsByClassName('gist-embed-iframe')[0]
                    iframeContainer.appendChild(iframe);
                    iframe.id = id;
                    iframe.contentWindow.document.open();
                    iframe.contentWindow.document.write(html);
                    iframe.contentWindow.document.close();

                    const cssLink = document.createElement("link");
                    cssLink.href = "https://github.githubassets.com/assets/gist-embed-4ac6018bcc05457cde2f66d2e7299d11.css";
                    cssLink.rel = "stylesheet";
                    cssLink.type = "text/css";
                    iframe.contentWindow.document.head.appendChild(cssLink);
                    iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";

                    setTimeout(() => {
                        const focused = this.editor.getSelectedParentElement()
                        const currentPos = focused.getBoundingClientRect()
                        this.window.scrollTo(0, currentPos.top - currentPos.x);
                        this.$emit('onChange')
                    }, 100)
                })
        }
    },
    mounted() {
        this.subscribe()
        this.initializeExisting()
    },
    destroyed() {
        this.unsubscribe()
    },
    beforeMount () {
        this.window = window;
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy () {
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>
