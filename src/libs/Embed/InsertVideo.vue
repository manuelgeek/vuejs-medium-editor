<template>
  <button class="btn-toggle">
    <!-- <font-awesome-icon :icon="['fas', 'code']" /> -->
    <font-awesome-icon @click="addVideo" icon="code" />

    <!-- <youtube style="width: 100%" :video-id="'5-uIwpo0dCU'"></youtube> -->
  </button>

  <!-- <v-dialog /> -->
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faImages } from "@fortawesome/free-regular-svg-icons";
import VueYouTubeEmbed from "vue-youtube-embed";
library.add(faImages);
import { getIdFromURL, getTimeFromURL } from "vue-youtube-embed";
import VModal from "vue-js-modal";

export default {
  data() {
    return { youtubeUrl: "https://www.youtube.com/embed/" };
  },
  props: ["editor", "editorRef", "onChange", "insert"],
  components: {
    FontAwesomeIcon,
    VueYouTubeEmbed,
  },
  methods: {
    addVideo() {
      var inputUrl = prompt("Please enter url", "");
      if (inputUrl === null) {
        return;
      }

      console.log("url is", inputUrl);

      let videoId = getIdFromURL(inputUrl);

      if (videoId === inputUrl) {
        alert("wrong url!");
        return;
      }

      this.editorRef.focus();
      this.editor.pasteHTML(
        `<div style="margin: 20vw;">
        <iframe width="20" height="315"
        src="${this.youtubeUrl + videoId}">
        </iframe>
      </div>`,
        { cleanAttrs: [], cleanTags: [], unwrapTags: [] }
      );
    },
  },
};
</script>
