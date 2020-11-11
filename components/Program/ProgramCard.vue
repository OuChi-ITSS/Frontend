<template>
  <v-hover v-slot="{ hover }">
    <v-card :loading="loading" class="ma-5 mx-auto" max-width="360">
      <template slot="progress">
        <v-progress-linear
          color="grey darken-3"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img v-if="!!itemInfo" height="250" :src="itemInfo.img_url">
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out grey darken-4 v-card--reveal display-3 white--text"
            style="height: 100%"
          >
            <v-card :loading="loading" max-width="360" elevation="0">
              <v-card-title>{{ itemInfo.name }}</v-card-title>
              <v-card-subtitle>
                {{ itemInfo.intro }}
              </v-card-subtitle>

              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>

                  <div class="grey--text ml-4">4.5 (413)</div>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-btn color="deep-orange darken-1" text @click="getPose">
                  {{ $t('start') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-expand-transition>
      </v-img>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      itemInfo: {},
    }
  },
  created() {
    this.$backend
      .getProgramInfo(this.id)
      .then((e) => {
        this.itemInfo = JSON.parse(JSON.stringify(e.data)).find(
          (e) => e.id === this.id
        )
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    getPose() {
      this.itemInfo = this.$router.push('/courses/' + this.id)
    },
  },
}
</script>
<style lang="scss" scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
