<template>
  <div>
    <v-row dense class="justify-center">
      <v-col cols="12" md="6">
        <web-cam
          ref="webcam"
          :autoplay="autoplay"
          :width="width"
          :height="height"
        ></web-cam>
      </v-col>
      <v-col cols="12" md="6">
        <v-img :src="photo" alt="" style="width: 400px; height: 300px" />
        <v-btn type="button" @click="take_photo">Take Photo</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { WebCam } from 'vue-web-cam'

export default {
  components: {
    WebCam,
  },
  props: {
    autoplay: {
      type: Boolean,
      default: true,
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 300,
    },
    mirror: {
      type: Boolean,
      default: true,
    },
    screenshotFormat: {
      type: String,
      default: 'image/jpeg',
    },
  },
  data() {
    return {
      video: '',
      src: '',
      stream: '',
      hasUserMedia: false,
      styleObject: {
        transform: 'scale(-1, 1)',
        filter: 'FlipH',
      },
    }
  },
  mounted() {
    this.video = this.$refs.video
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      navigator.oGetUserMedia

    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { video: true },
        (stream) => {
          this.src = window.URL.createObjectURL(stream)
          this.stream = stream
          this.hasUserMedia = true
        },
        (error) => {
          console.log(error)
        }
      )
    }
  },
  beforeDestroy() {
    this.video.pause()
    this.src = ''
    this.stream.getTracks()[0].stop()
  },
  destroyed() {
    console.log('Destroyed')
  },
  methods: {
    getPhoto() {
      if (!this.hasUserMedia) return null

      const canvas = this.getCanvas()
      return canvas.toDataURL(this.screenshotFormat)
    },
    getCanvas() {
      if (!this.hasUserMedia) return null

      const video = this.$refs.video
      if (!this.ctx) {
        const canvas = document.createElement('canvas')
        canvas.height = video.clientHeight
        canvas.width = video.clientWidth
        this.canvas = canvas

        this.ctx = canvas.getContext('2d')

        /* if (this.mirror) {
        const context = canvas.getContext('2d');
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        this.ctx = context;
        } else {
        this.ctx = canvas.getContext('2d');
        } */
      }

      const { ctx, canvas } = this
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      return canvas
    },
    take_photo() {
      this.photo = this.$refs.webcam.getPhoto()
    },
  },
}
</script>
