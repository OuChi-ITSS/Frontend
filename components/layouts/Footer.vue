<template>
  <v-footer dark padless inset width="auto">
    <v-container fluid class="pa-0">
      <v-card class="primary lighten-1 white--text text-center rounded-0">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          今日は天気がいいから
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Hedspi</strong>
        </v-card-text>
      </v-card>
    </v-container>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
  }),
}
</script>
