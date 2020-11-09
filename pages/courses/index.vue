<template>
  <v-container class="fill-height justify-center" fluid>
    <v-col cols="12" xl="8">
      <ProgramList />
      <CameraMan v-if="false" />
    </v-col>
  </v-container>
</template>
<script>
import ProgramList from '~/components/Program/ProgramList'
import CameraMan from '~/components/CameraMan'

export default {
  components: {
    ProgramList,
    CameraMan,
  },
}
</script>
