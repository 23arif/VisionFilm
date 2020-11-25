<template>
  <div class="navbar navbar-inverse bg-inverse bg-dark">
    <div class="container d-flex justify-content-between">
      <router-link class="navbar-brand" to="/">VisionFilm</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AppHeader"
  }
</script>

<style scoped>
  div{
    z-index: 100;
  }
  a,a:hover{
    color:#fff;
    font-weight: bold;
  }
</style>
