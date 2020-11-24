<template>
  <v-app>
    <v-card class="rounded-0" elevation="0">
      <v-card elevation="0">
        <div class="home--toolbar">
          <v-container>
            <v-row align="center">
              <v-col cols="6" justify="left">
                <img
                  class="appLogo"
                  src="/logo.png"
                  alt="App's Logo"
                  @click="$router.push('/')"
                />
              </v-col>
              <v-col cols="6" class="text-right">
                <v-btn icon class="headerBtn" @click="$router.push('/test')">
                  <v-icon size="42">mdi-walk</v-icon>
                </v-btn>

                <v-btn icon class="headerBtn">
                  <v-icon size="42">mdi-magnify</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <div class="header--slogan">
              <div class="header--divide"></div>
              <h2 class="display-1" style="display: inline">
                Welcome To
                <span class="red--text">YOGA AI</span>
              </h2>
              <div class="header--slogan-text">
                <h1 class="display-3 grey--text">
                  The Art of <br />
                  Interligent Movement
                </h1>
              </div>
            </div>
          </v-container>
        </div>
        <v-img
          height="720"
          src="/HeaderBg.jpeg"
          gradient="to top right, rgba(255, 252, 242,.3), rgba(229, 241, 238,.2)"
        ></v-img>
      </v-card>
      <v-container fluid class="pa-0">
        <v-row>
          <v-col cols="12" md="3" class="page--item">
            <v-img
              class="page--item-img"
              gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
              src="https://photo-1-baomoi.zadn.vn/w1000_r1/2020_09_06_106_36286774/e955a48f2bccc2929bdd.jpg"
            >
              <div class="page--item-text">Our Teachers</div>
            </v-img>
          </v-col>
          <v-col cols="12" md="3" class="page--item">
            <v-img
              class="page--item-img"
              gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
              src="https://vinmec-prod.s3.amazonaws.com/images/20190625_080830_605352_shutterstock_552071.max-1800x1800.jpg"
            >
              <div class="page--item-text">Our Classes</div>
            </v-img>
          </v-col>
          <v-col cols="12" md="3" class="page--item">
            <v-img
              class="page--item-img"
              gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
              src="https://suckhoedoisong.vn/Images/duylinh/2017/04/29/6-bai-tap-chua-dau-lung-hieu-qua1493477466.jpg"
            >
              <div class="page--item-text">Upcoming Events</div>
            </v-img>
          </v-col>
          <v-col cols="12" md="3" class="page--item">
            <v-img
              class="page--item-img"
              gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
              src="https://ihs.org.vn/wp-content/uploads/2020/05/chua-benh-tri-bang-tap-yoga-6.jpg"
            >
              <div class="page--item-text">About Us</div>
            </v-img>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-main class="lightBg">
          <v-container>
            <nuxt />
          </v-container>
        </v-main>
      </v-container>
    </v-card>
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
