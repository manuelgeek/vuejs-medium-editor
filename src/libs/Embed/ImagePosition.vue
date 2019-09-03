<template>
    <div class="image-handler" v-if="handler.isShow" v-bind:style="handler.position">
        <div class="image-hander-menu">
            <button class="btn-toggle" v-on:click="imageSizing('is-normal')">
                <img src="../../assets/icons/image-align-normal-active.png" v-if="handler.currentSize == 'is-normal'">
                <img src="../../assets/icons/image-align-normal.png" v-if="handler.currentSize != 'is-normal'">
            </button>
            <button class="btn-toggle" v-on:click="imageSizing('is-expand')">
                <img src="../../assets/icons/image-align-expand-active.png" v-if="handler.currentSize == 'is-expand'">
                <img src="../../assets/icons/image-align-expand.png" v-if="handler.currentSize != 'is-expand'">
            </button>
            <button class="btn-toggle" v-on:click="imageSizing('is-full')">
                <img src="../../assets/icons/image-align-full-active.png" v-if="handler.currentSize == 'is-full'">
                <img src="../../assets/icons/image-align-full.png" v-if="handler.currentSize != 'is-full'">
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'handler'
    ],
    methods: {
        imageSizing(sizing) {
            this.handler.currentSize = sizing
            this.handler.currentLine.className = 'editor-image ' + sizing

            this.$emit('onPositionChange')
        }
    }
}
</script>

