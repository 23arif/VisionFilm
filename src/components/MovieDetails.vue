<script>
  import Loader from "./Loader";
  import BackdropImage from "./BackdropImage";
  import Poster from "./Poster";

  export default {
    name: "MovieDetails",
    data() {
      return {
        hasDetails: false,
        isLoading: true
      }
    },
    created() {
      this.$store.dispatch('fetchMovieDetails', this.movieId).then(() => {
        this.$store.dispatch('fetchMovieCast', this.movieId);
        this.$store.dispatch('fetchMovieTrailer', this.movieId);
        this.isLoading = false;
        this.hasDetails = true
      });
    },
    methods: {
      castAvatar(path) {
        return `https://image.tmdb.org/t/p/w45${path}`
      }
    },
    computed: {
      movieId() {
        return this.$route.params.id;
      },
      movie() {
        return this.$store.state.movieDetails[this.movieId];
      },
      cast() {
        return this.$store.state.movieCast;
      },
      trailers() {
        const trailers = [];
        this.$store.state.movieTrailer.forEach(video => {
          if (video.type === 'Trailer') {
            trailers.push({
              name: video.name,
              thumbnail: `https://i.ytimg.com/vi/${video.key}/sddefault.jpg`,
              url: `https://youtube.com/watch?v=${video.key}`,
            });
          }
        });
        return trailers;
      },
      ticketsPath() {
        return `/movie/${this.movieId}/tickets`;
      },
      runtime() {
        const runtime = this.movie.runtime;
        const hours = Math.floor(runtime / 60);
        const minutes = runtime - (60 * hours);

        return `${hours}h ${minutes}m`;
      },
    },
    components: {
      Loader,
      BackdropImage, Poster
    }
  }
</script>

<template>
  <section>
    <Loader v-if="isLoading"/>
    <section v-if="hasDetails">
      <BackdropImage :imageName="movie.backdrop_path"/>
      <div class="container pt-5">
        <div class="row">
          <div class="col-sm-4">
            <Poster :posterName="movie.poster_path"/>
          </div>
          <div class="col-sm-8 details">
            <h2>{{movie.title}}</h2>
            <p>{{movie.overview}}</p>
            <div>
              Runtime: {{runtime}}
            </div>
            <div>
              Average Rating: {{movie.vote_average.toFixed(1)}}
            </div>
            <div>
              Production Company: {{movie.production_companies[0].name}}
            </div>
            <div>
              Release Date: {{movie.release_date}}
            </div>
            <h4>Cast</h4>
            <img v-for="person in cast" :src="castAvatar(person.profile_path)" class="cast-avatar" :title="person.name">
            <h4>Trailers</h4>
            <a :href="trailer.url" v-for="trailer in trailers" target="_blank" class="trailers"  :title="trailer.name">
              <span></span>
              <img :src="trailer.thumbnail" width="180" height="105">
            </a>
            <a :href="ticketsPath" class="btn btn-success ticket-button">Get tickets</a>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
  .details {
    color: #fff
  }

  h4 {
    margin: 15px 0 15px 0;
  }

  .cast-avatar {
    width: 45px;
    height: 45px;
    border-radius: 45px;
    border: 2px solid #fff;
    box-sizing: border-box;
    margin: 0 10px 10px 0;
  }

  .trailers {
    display: inline-block;
    margin-right: 20px;
    position: relative;
  }

  .trailers span {
    background: url("../assets/play.png") no-repeat;
    background-size: 55px 35px;
    position: absolute;
    width: 62px;
    height: 35px;
    top: 35px;
    left: 65px;
    display: block;
  }

  .ticket-button {
    position: absolute;
    top:0;
    right: 15px;
  }
</style>
