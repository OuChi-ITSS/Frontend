<template>
  <nuxt-link to="/courses" />
</template>

<script>
export default {
  created() {
    this.$router.push('/courses')
  },
}
</script>
