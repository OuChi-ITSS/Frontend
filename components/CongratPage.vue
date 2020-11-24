<template>
  <v-container
    class="gradientBG fill-height justify-center"
    style="height: 540px"
    fluid
  >
    <v-row>
      <v-col cols="12" align="center" justify="center">
        <v-img src="/Congrant.png" height="320" contain> </v-img>
      </v-col>
      <v-col cols="12" align="center" justify="center">
        <h1 class="display-1 mx-4 white--text">{{ $t('congratulation') }}</h1>
      </v-col>
      <v-col cols="12" align="center" justify="center">
        <v-btn icon dark @click="$router.push('/')">
          <v-icon size="42">mdi-home-outline</v-icon>
        </v-btn></v-col
      >
    </v-row>
  </v-container>
</template>
