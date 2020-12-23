<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col v-if="poseLists.length > 0" cols="12" lg="9">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <template v-for="(pose, i) in poseLists">
              <v-stepper-step
                :key="`${i}-step`"
                :complete="e1 > i + 1"
                editable
                :step="i + 1"
              >
                {{ pose.poseName }}
              </v-stepper-step>
              <v-divider :key="`${i}-div`"></v-divider>
            </template>
            <v-stepper-step :step="poseLists.length + 1">
              {{ $t('training') }}
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
                <PoseDetail :src-vid="pose.videoUrl" />
                <!-- <v-btn class="my-5 px-8" color="primary" @click="e1 = i + 2">{{
                  $t('continue')
                }}</v-btn> -->
                <v-btn
                  class="mx-2 mb-6"
                  fab
                  dark
                  large
                  color="cyan"
                  @click="e1 = i + 2"
                >
                  <v-icon dark> mdi-chevron-double-right </v-icon>
                </v-btn>
              </v-card>
            </v-stepper-content>
            <v-stepper-content class="gradientBG" :step="poseLists.length + 1">
              <v-card
                v-if="program.status === 'fulfilled'"
                color="rgb(255, 0, 0, 0)"
                align="center"
                justify="center"
                height="420"
                elevation="0"
              >
                <h1
                  class="pt-12 pb-10 white--text display-2"
                  style="margin-top: 160px"
                >
                  {{ $t('training') }}
                </h1>
                <v-card-actions>
                  <v-btn
                    class="mx-auto white--text"
                    rounded
                    color="cyan"
                    elevation="0"
                    @click="
                      $router.push('/courses/' + $route.params.id + '/training')
                    "
                  >
                    <v-icon>mdi-rocket-launch-outline</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-card
                v-else
                color="rgb(255, 0, 0, 0)"
                align="center"
                justify="center"
                height="420"
                elevation="0"
              >
                <h1
                  class="pt-12 pb-10 white--text display-2"
                  style="margin-top: 160px"
                >
                  今すぐ購入
                </h1>
                <v-card-actions>
                  <v-dialog v-model="dialog" persistent max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="mx-auto white--text"
                        rounded
                        x-large
                        color="cyan"
                        elevation="0"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-cart-outline</v-icon> ${{ program.price }}
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline"> 購入確認 </v-card-title>
                      <v-card-text
                        >このプログラムを購入します。よろしいですか。</v-card-text
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="red darken-1"
                          text
                          @click="dialog = false"
                        >
                          いいえ
                        </v-btn>
                        <v-btn color="cyan darken-1" text @click="buyProgram">
                          はい
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="color">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
      program: null,
      dialog: false,
      e1: 1,
      snackbar: false,
      text: null,
      timeout: 2000,
      color: 'success',
    }
  },
  created() {
    this.getProgramInfo()
  },
  methods: {
    getProgramInfo() {
      this.$backend
        .getProgramInfo(this.$route.params.id, localStorage.getItem('token'))
        .then((e) => {
          this.poseLists = e.data.poses
          this.program = e.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    buyProgram() {
      this.$backend
        .buyProgram(this.$route.params.id, localStorage.getItem('token'))
        .then((e) => {
          this.text = 'Success'
          this.color = 'success'
          this.snackbar = true
          this.dialog = false
          this.$router.push('/courses/' + this.$route.params.id + '/training')
        })
        .catch((err) => {
          console.log(err.response.data.message)
          this.text = err.response.data.message
          this.color = 'error'
          this.snackbar = true
        })
    },
  },
}
</script>
