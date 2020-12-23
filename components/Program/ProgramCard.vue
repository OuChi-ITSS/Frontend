<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        :loading="loading"
        class="mx-auto mx-6 my-3"
        max-width="344"
        elevation="1"
      >
        <v-img height="240" :src="item.imageUrl"></v-img>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-text>
              <h2 class="title primary--text">
                {{ item.programName }}
              </h2>
              {{ item.introduction }}
            </v-card-text>
            <!-- <v-card-title class="pt-0">
              <v-rating
                :value="4"
                dense
                color="orange"
                background-color="orange"
                hover
                class="mr-2"
              ></v-rating>
              <span class="primary--text subtitle-2">64 レビューア</span>
            </v-card-title> -->
          </div>
          <v-avatar
            v-if="item.status === 'fulfilled'"
            class="ma-3"
            size="35"
            tile
          >
            <v-icon large color="orange darken-2">
              mdi-checkbox-marked-outline
            </v-icon>
          </v-avatar>
        </div>

        <v-fade-transition>
          <v-overlay v-if="hover" absolute color="#036358">
            <v-btn class="blue lighten-1" outlined @click="getPose">{{
              $t('start')
            }}</v-btn>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      // item: {},
      overlay: false,
    }
  },
  methods: {
    getPose() {
      this.$router.push('/courses/' + this.item.id)
    },
  },
}
</script>
