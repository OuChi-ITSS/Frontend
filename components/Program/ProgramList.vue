<template>
  <v-container class="pt-0 fill-height justify-center" fluid>
    <v-row dense align="center" justify="center">
      <v-col cols="12">
        <v-card flat>
          <v-card-text>
            <v-row align="center" justify="center">
              <v-btn-toggle v-model="itemSearch" mandatory>
                <v-btn color="deep-orange" text>
                  <div class="h4">
                    <v-icon color="deep-orange darken-4" text
                      >mdi-select-all
                    </v-icon>
                    全て
                  </div>
                </v-btn>
                <v-btn color="orange" text>
                  <div class="h4">
                    <v-icon color="orange darken-2" text>
                      mdi-checkbox-marked-outline
                    </v-icon>
                    購入済み
                  </div>
                </v-btn>
                <v-btn color="blue" text>
                  <div class="h4">
                    <v-icon color="blue darken-2" text>
                      mdi-checkbox-blank-outline
                    </v-icon>
                    未購入
                  </div>
                </v-btn>
              </v-btn-toggle>
            </v-row>
          </v-card-text>
        </v-card></v-col
      >
      <v-col v-for="(item, i) in items" :key="i" cols="12" md="4" lg="4">
        <ProgramCard :id="item.id" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ProgramCard from '~/components/Program/ProgramCard'

export default {
  components: {
    ProgramCard,
  },
  data() {
    return {
      items: [],
      itemSearch: undefined,
    }
  },
  mounted() {
    this.getProgramList()
  },
  methods: {
    getProgramList() {
      this.$backend
        .getProgramList()
        .then((e) => {
          // this.items = e.data.results
          // DELME
          this.items = JSON.parse(JSON.stringify(e.data))
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
