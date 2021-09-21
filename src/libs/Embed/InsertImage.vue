<template>
    <file-upload
        ref="upload"
        class="btn-toggle"
        extensions="gif,jpg,jpeg,png,webp"
        accept="image/png,image/gif,image/jpeg,image/webp"
        :post-action="uploadUrl"
        :headers="uploadUrlHeader"
        :name="file_input_name"
        :multiple="true"
        :size="file_size"
        v-model="insert.files"
        @input-filter="inputFilter"
        @input-file="inputFile">
        <font-awesome-icon :icon="['far', 'images']" />
    </file-upload>
</template>

<script>
import VueUploadComponent from 'vue-upload-component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import _ from 'underscore';
library.add(faImages)
export default {
    props: [
        'editor',
        'insert',
        'uploadUrl',
        'uploadUrlHeader',
        'file_input_name',
        'file_size',
        'imgur_bool',
        'editorRef',
        'handler'
    ],
    components: {
        FontAwesomeIcon,
        'file-upload': VueUploadComponent
    },
    data() {
        return {
            currentLine: null,
            currentImg: null,
            currentSize: 'is-normal',
            position: {
                top: '0'
            },
            isShow: false
        }
    },
    methods: {
        initializeExisting() {
            const handlerVm = this;
            setTimeout(() => {
                const focused = this.editor.getFocusedElement()
                if(!focused) return false;

                const editorImages = focused.getElementsByClassName('editor-image')
                _.map(editorImages, (elm) => {
                    // Set Onclick to Show Image Size Handler
                    elm.onclick = function() {
                        setTimeout(() => {
                            handlerVm.sizingHandler(this)
                        })
                    }
                })
            })
        },
        addImage(url) {
            this.$emit('uploaded', url);
            if(this.insert.isToggle) {
                const handlerVm = this
                this.editorRef.focus()
                this.editor.selectElement(this.insert.focusLine)
                this.editor.pasteHTML(`<div class="editor-image">
                        <img src="${url}" />
                    </div>
                    <div class="editor-image-description"><br></div>
                    <br />`, { cleanAttrs: [], cleanTags: [], unwrapTags: []})
                this.currentLine = this.editor.getSelectedParentElement().previousElementSibling.previousElementSibling
                this.currentImg = this.currentLine.querySelector('img')
                const currentPos = this.currentImg.getBoundingClientRect();
                this.window.scrollTo(0, currentPos.top - currentPos.x);
                this.currentLine.onclick = function() {
                    setTimeout(() => {
                        handlerVm.sizingHandler(this)
                    })
                }
                this.insert.isShow = false;
            }
        },
        sizingHandler(elm) {
            const className = elm.className
            elm.className = className.replace('is-focus', '') + ' is-focus'
            if(className.indexOf('expand') > -1) {
                this.currentSize = 'is-expand'
            } else if(className.indexOf('full') > -1) {
                this.currentSize = 'is-full'
            } else {
                this.currentSize = 'is-normal'
            }
            const img = elm.querySelector('img')
            this.currentLine = elm;
            this.isShow = true;
            const currentPos = img.getBoundingClientRect();
            this.position.top = currentPos.top + 'px'
            this.$emit('imageClick', {
                position: this.position,
                currentLine: this.currentLine,
                isShow: this.isShow,
                currentSize: this.currentSize
            })
        },
        inputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                    return prevent()
                }
                if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                    return prevent()
                }
            }
        },
        inputFile(newFile, oldFile) {
            if (newFile && !oldFile) {
                this.$refs.upload.active = true
            }

            // Image Upload Successful
            if(newFile && newFile.success) {
                if(this.imgur_bool) {
                    this.addImage(newFile.response.data.link)
                } else {
                    this.addImage(newFile.response.url)
                }
            }
        }
    },
    mounted() {
        this.initializeExisting()
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
