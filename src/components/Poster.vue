<template>
  <img :src="posterPath" class="poster">
</template>

<script>
  export default {
    name: "Poster",
    props: {
      posterName: {
        type: String,
        required: true
      }
    },
    computed: {
      posterPath() {
        return `https://image.tmdb.org/t/p/w500${this.posterName}`;
      }
    }
  }
</script>

<style scoped>

  .poster{
    width: 100%;
  }
</style>
