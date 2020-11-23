<template>
  <v-container class="fill-height justify-center" fluid>
    <v-row dense>
      <v-col v-for="(item, i) in items" :key="i" cols="12" md="4" lg="3">
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
          this.items = e.data.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
