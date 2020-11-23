<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <h1 class="display-1 my-4">{{ $t('poseList') }}</h1>
      <PoseList />
    </v-row>
  </v-container>
</template>

<script>
import PoseList from '~/components/Program/PoseList'

export default {
  components: {
    PoseList,
  },
}
</script>
