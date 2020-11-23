<template>
  <v-container class="fill-height justify-center" fluid>
    <h1 class="display-1 mx-4">{{ $t('programList') }}</h1>
    <v-col cols="12">
      <ProgramList />
    </v-col>
  </v-container>
</template>
<script>
import ProgramList from '~/components/Program/ProgramList'

export default {
  layout: 'home',
  components: {
    ProgramList,
  },
}
</script>
