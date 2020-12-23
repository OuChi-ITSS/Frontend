<template>
  <v-container class="pt-0 fill-height justify-center" fluid>
    <v-row dense align="center" justify="center">
      <v-col cols="12">
        <v-card flat>
          <v-card-text>
            <v-row align="center" justify="center">
              <v-btn-toggle v-model="itemSearch" mandatory>
                <v-btn color="deep-orange" text @click="getProgramList">
                  <div class="h4">
                    <v-icon color="deep-orange darken-4" text
                      >mdi-select-all
                    </v-icon>
                    全て
                  </div>
                </v-btn>
                <v-btn color="orange" text @click="getBoughtProgramList">
                  <div class="h4">
                    <v-icon color="orange darken-2" text>
                      mdi-checkbox-marked-outline
                    </v-icon>
                    購入済み
                  </div>
                </v-btn>
                <v-btn color="blue" text @click="getAvailableProgramList">
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
        <ProgramCard :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ProgramCard from '~/components/Program/ProgramCard'
let responseList = []
let list = []
let responseBoughtList = []
let availableList = []
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
  async created() {
    responseList = await this.$backend.getProgramList().catch((err) => {
      console.log(err)
    })
    responseBoughtList = await this.$backend
      .getBoughtProgramList(localStorage.getItem('token'))
      .catch((err) => {
        console.log(err)
      })
    console.log(responseBoughtList)
    // responseAvailableList = await this.$backend
    //   .getAvailableProgramList(localStorage.getItem('token'))
    //   .catch((err) => {
    //     console.log(err)
    //   })
    list = responseList.data.results.map((item) => {
      item.status = 'open'
      responseBoughtList.data.results.map((itemB) => {
        if (item.id === itemB.id) {
          item.status = 'fulfilled'
        }
      })
      return item
    })
    console.log(list)
    availableList = list.filter((item) => {
      return item.status === 'open'
    })
    console.log(availableList)
    this.items = list
  },
  methods: {
    getProgramList() {
      this.items = list
    },
    getAvailableProgramList() {
      this.items = availableList
    },
    getBoughtProgramList() {
      this.items = responseBoughtList.data.results
    },
  },
}
</script>
