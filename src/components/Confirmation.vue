<template>
  <section>
    <div class="container text-center">
      <div class="row">
        <div class="card text-white bg-success mt-5 p-5 col-md-6 offset-3">
          <div class="card-block">
            <h2 class="card-title">Your tickets are ready!</h2>
            <p class="card-text">{{$store.state.movieDetails[$store.state.selectedMovieId].original_title}}</p>
            <p class="card-text">{{$store.state.halls[$store.state.selectedMovieHallId].name}}, {{$store.state.selectedTime}}</p>
            <p class="card-text">{{$store.state.selectedSeats.join(', ')}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
    export default {
        name: "Confirmation",
      mounted() {
          if (!this.$store.state.movieDetails[this.$store.state.selectedMovieId] || !this.$store.state.halls[this.$store.state.selectedMovieHallId] || !this.$store.state.selectedSeats){
            this.$router.push('/');
            console.clear();
          }
      }
    }
</script>

<style scoped>
  section{
    height: 100vh;
    display: flex;
    align-items: center;
  }
</style>
