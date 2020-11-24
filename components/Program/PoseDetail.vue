<template>
  <div>
    <v-row dense class="justify-center">
      <v-col cols="12" class="pa-10">
        <video-player
          ref="videoPlayer"
          class="video-player-box vjs-default-skin vjs-big-play-centered"
          :options="playerOptions"
        >
        </video-player>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
// 'http://dl75.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyaDJ5SjQzemg1b0o3NUFxc1lOMk9DNWFQcDdISUk3N3FLYlB2bDF2ampYWTV1NEJEMnNoYXR0QnlIWHZQY1RnUmJxeDdkcmE4eDlYeFArcExmenptRm14d3JsS3A3TEhMUlRVbWQ2dDBnK2xuUzExZjdCclFENnRqai9nVUNUT0dGWWxHaE9iOVBKbzVKSndXeUZiUGpwbU4xTy8zYWc3NU5INWZhSXVBM0p3YjA2b2VObVNsWnhaNU5Wd0pYeTNzL0txbFVtazQwTzMxNjNsdU9vSHBjd0NMeWhheko4TnljUDF2emJmVFVYd0JwTTNUeVB5ZjUxdGpBWlA2MWx2Q1N4NGVMZ2REcU1kOC96RXNEU2VyenE4Sld0c0trbnJFamJvNzZTeGNNWnhWRC9HWTdzVUl3YnB4Zz0%3D'

// Similarly, you can also introduce the plugin resource pack you want to use within the component
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
export default {
  components: {
    videoPlayer,
  },
  props: {
    typeVid: {
      type: String,
      default: 'video/mp4',
    },
    heightVid: {
      type: Number,
      default: 420,
    },
    poster: {
      type: String,
      default: null,
    },
    srcVid: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      playerOptions: {},
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
  },
  created() {
    this.playerOptions = {
      height: this.heightVid,
      autoplay: false,
      muted: true,
      controls: true,
      language: 'ja',
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      sources: [
        {
          type: this.typeVid,
          src: this.srcVid,
        },
      ],
      poster: this.poster,
    }
  },
}
</script>
