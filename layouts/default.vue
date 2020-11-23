<template>
  <v-app>
    <v-card color="grey lighten-4" class="headerBG" flat height="96px" tile>
      <v-container>
        <v-row>
          <v-toolbar color="rgba(0, 0, 0, 0)" elevation="0">
            <img
              class="appLogo mx-auto"
              src="/logo.png"
              alt="App's Logo"
              @click="$router.push('/')"
            />
            <v-spacer></v-spacer>
            <v-btn icon class="headerBtn" @click="$router.push('/test')">
              <v-icon size="42">mdi-walk</v-icon>
            </v-btn>
            <v-btn icon class="headerBtn">
              <v-icon size="42">mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>
        </v-row>
      </v-container>
    </v-card>
    <v-main class="lightBg">
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
      bgImg: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.headerBtn {
  margin-left: 32px;
  :hover {
    color: #1ca0c9;
  }
}
</style>
