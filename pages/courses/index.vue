<template>
  <v-container class="fill-height" align="center" justify="center" fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="display-1 text-center">{{ $t('programList') }}</h1>
        <ProgramList />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ProgramList from '~/components/Program/ProgramList'

export default {
  components: {
    ProgramList,
  },
  middleware: 'authenticated',
}
</script>
