<template>
 <section>
   <AppHeader/>
   <img :src="imagePath" class="backdrop-image">
 </section>
</template>

<script>
  import AppHeader from "./AppHeader";
  export default {
    name: "BackdropImage",
    props: {
      imageName: {
        type: String,
        required: true
      },
    },
    computed: {
      imagePath() {
        return `https://image.tmdb.org/t/p/w1280${this.imageName}`;
      }
    },
    components:{
      AppHeader
    }
  }
</script>

<style scoped>
  .backdrop-image {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    filter:blur(30px);
    transform: scale(1.1);
  }
</style>
