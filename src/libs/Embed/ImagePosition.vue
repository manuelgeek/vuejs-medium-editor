<template>
  <div
    v-if="handler.isShow"
    class="image-handler"
    :style="handler.position"
  >
    <div class="image-hander-menu">
      <button
        class="btn-toggle"
        @click="imageSizing('is-normal')"
      >
        <img
          v-if="handler.currentSize == 'is-normal'"
          src="../../assets/icons/image-align-normal-active.png"
        />
        <img
          v-if="handler.currentSize != 'is-normal'"
          src="../../assets/icons/image-align-normal.png"
        />
      </button>
      <button
        class="btn-toggle"
        @click="imageSizing('is-expand')"
      >
        <img
          v-if="handler.currentSize == 'is-expand'"
          src="../../assets/icons/image-align-expand-active.png"
        />
        <img
          v-if="handler.currentSize != 'is-expand'"
          src="../../assets/icons/image-align-expand.png"
        />
      </button>
      <button
        class="btn-toggle"
        @click="imageSizing('is-full')"
      >
        <img
          v-if="handler.currentSize == 'is-full'"
          src="../../assets/icons/image-align-full-active.png"
        />
        <img
          v-if="handler.currentSize != 'is-full'"
          src="../../assets/icons/image-align-full.png"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['handler'],
  emits: ['onPositionChange'],
  methods: {
    imageSizing(sizing: string) {
      // eslint-disable-next-line vue/no-mutating-props
      this.handler.currentSize = sizing
      // eslint-disable-next-line vue/no-mutating-props
      this.handler.currentLine.className = 'editor-image ' + sizing

      this.$emit('onPositionChange')
    },
  },
}
</script>
