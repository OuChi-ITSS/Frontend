<template>
  <v-app>
    <v-app-bar fixed flat app class="dfBg">
      <img
        class="appLogo mx-auto"
        src="/fbLogo.png"
        alt="App's Logo"
        @click="$router.push('/')"
      />
    </v-app-bar>
    <v-main class="deepDarkBg">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'Vuetify.js',
    }
  },
}
</script>
