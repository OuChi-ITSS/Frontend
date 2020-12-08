<template>
  <v-container class="justify-center" fill-height fluid>
    <v-row align="center" justify="center">
      <div height="420" style="height: 320px">
        <div class="display-3 my-16">{{ $t('imasugutamesu') }}</div>
        <v-col cols="12" align="center" justify="center">
          <v-btn fab elevation="0" text color="error" to="/courses">
            <v-icon x-large> mdi-presentation-play </v-icon>
          </v-btn>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'home',
}
</script>
