<template>
  <v-container class="fill-height" fluid>
    <v-row class="gradientBG" align="center" justify="center">
      <v-col v-if="poseLists.length > 0" cols="12" md="8">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <template v-for="(pose, i) in poseLists">
              <v-stepper-step
                :key="`${i}-step`"
                :complete="e1 > i + 1"
                :step="i + 1"
              >
                {{ pose.name }}
              </v-stepper-step>
              <v-divider
                v-if="i !== poseLists.length - 1"
                :key="`${i}-div`"
              ></v-divider>
            </template>
          </v-stepper-header>

          <v-stepper-items v-for="(pose, i) in poseLists" :key="i">
            <v-stepper-content :step="i">
              <v-card class="mb-12" align="center" justify="center">
                <PoseDetail :src-vid="pose.video_url" />
              </v-card>

              <v-btn color="primary" @click="e1 = i + 1"> Continue </v-btn>

              <v-btn text> Cancel </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <!-- <v-stepper
          v-for="(pose, i) in poseLists"
          :key="i"
          v-model="e13"
          vertical
        >
          <v-stepper-step :step="i" :complete="el13 > i">
            {{ pose.name }}
          </v-stepper-step>

          <v-stepper-content :step="i">
            
            <v-btn color="primary" @click="e13 = i"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>
        </v-stepper> -->
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
