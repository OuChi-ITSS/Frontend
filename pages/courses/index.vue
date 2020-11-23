<template>
  <v-container class="fill-height justify-center" fluid>
    <v-col cols="12">
      <h1 class="display-1 my-4">{{ $t('programList') }}</h1>
      <ProgramList />
    </v-col>
  </v-container>
</template>
<script>
import ProgramList from '~/components/Program/ProgramList'

export default {
  components: {
    ProgramList,
  },
}
</script>
