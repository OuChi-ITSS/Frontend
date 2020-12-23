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
            <v-btn icon class="headerBtn" @click="logOut">
              <v-icon size="42">mdi-logout</v-icon>
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
    <Footer />
  </v-app>
</template>

<script>
import Footer from '~/components/layouts/Footer'
export default {
  components: { Footer },
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
  methods: {
    logOut() {
      this.$backend
        .logout(localStorage.getItem('token'))
        .then((e) => {
          localStorage.removeItem('token')
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    },
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
