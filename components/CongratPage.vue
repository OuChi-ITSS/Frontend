<template>
  <v-container
    class="gradientBG fill-height justify-center"
    style="height: 560px"
    fluid
  >
    <v-row>
      <v-col cols="12" align="center" justify="center">
        <h1 class="display-3 mx-4 white--text">{{ $t('congratulation') }}</h1>
      </v-col>
      <v-col cols="12" align="center" justify="center" class="mt-6">
        <v-btn icon dark @click="$router.push('/')">
          <v-icon size="65">mdi-home-outline</v-icon>
        </v-btn></v-col
      >
    </v-row>
  </v-container>
</template>
