<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
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
