<script>
  import {mapGetters} from 'vuex';
  import AppHeader from "./AppHeader";
  import Loader from "./Loader";
  import movie from './Movie'

  export default {
    name: "Home",
    data() {
      return {
        isLoading: true
      }
    },
    components: {
      AppHeader, Loader, movie
    },
    computed: {
      ...mapGetters([
        'movies',
        'groupMovies'
      ])
    },
    created() {
      this.$store.dispatch('fetchMovies').then(() => {
        this.isLoading = false;
      })
    }
  }
</script>


<template>
  <section>
    <AppHeader/>
    <Loader v-if="isLoading"/>
    <section class="container py-5">
      <div class="card-deck" v-for="group in groupMovies">
        <movie v-for="movie in group" :key="movie.id" :movie="movie"/>
      </div>
    </section>
  </section>
</template>

<style scoped>

</style>
