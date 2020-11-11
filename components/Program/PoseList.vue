<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col v-if="poseLists.length > 0" cols="12">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <template v-for="(pose, i) in poseLists">
              <v-stepper-step
                :key="`${i}-step`"
                :complete="e1 > i + 1"
                editable
                :step="i + 1"
              >
                {{ pose.name }}
              </v-stepper-step>
              <v-divider :key="`${i}-div`"></v-divider>
            </template>
            <v-stepper-step :step="poseLists.length + 1">
              {{ $t('completed') }}
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content
              v-for="(pose, i) in poseLists"
              :key="`${i}-content`"
              class="gradientBG"
              :step="i + 1"
            >
              <v-card
                class="gradientBG"
                align="center"
                justify="center"
                elevation="0"
              >
                <PoseDetail :src-vid="pose.video_url" :poster="pose.poster" />
                <v-btn class="my-5 px-8" color="primary" @click="e1 = i + 2">{{
                  $t('continue')
                }}</v-btn>
              </v-card>
            </v-stepper-content>
            <v-stepper-content class="gradientBG" :step="poseLists.length + 1">
              <v-card class="gradientBG" align="center" justify="center">
                <h1 class="pt-12 pb-10 white--text">{{ $t('training') }}</h1>
                <v-card-actions>
                  <v-btn
                    class="mx-auto white--text"
                    rounded
                    color="cyan"
                    elevation="0"
                    @click="$router.push('/test')"
                  >
                    <v-icon>mdi-rocket-launch-outline</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PoseDetail from '~/components/Program/PoseDetail'

export default {
  components: {
    PoseDetail,
  },
  data() {
    return {
      poseLists: [],
      e1: 1,
    }
  },
  created() {
    this.getPostInfo()
  },
  methods: {
    getPostInfo() {
      this.$backend
        .getPoseList()
        .then((e) => {
          this.poseLists = JSON.parse(JSON.stringify(e.data))
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
