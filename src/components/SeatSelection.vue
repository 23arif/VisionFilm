<script>
  import Loader from "./Loader";
  import BackdropImage from "./BackdropImage";
  import Poster from "./Poster";

  export default {
    name: "SeatSelection",
    data() {
      return {
        isLoading: true,
        hasSeatingInfo: false,
        selectedSeats: [],
      }
    },
    created() {
      const options = {
        movieId: this.$route.params.id,
        time: this.$store.state.selectedTime,
        hallId: this.$store.state.selectedMovieHallId,
      };

      if (!options.time || !options.hallId) {
        return this.$router.push(`/movie/${options.movieId}/tickets`);
      }

      this.$store.dispatch('fetchMovieDetails', this.movieId).then(() => {
        this.$store.dispatch('fetchSeatingInfo', options).then(() => {
          this.isLoading = false;
          this.hasSeatingInfo = true
        });
      });
    },
    computed: {
      movieId() {
        return this.$route.params.id;
      },
      seatMap() {
        const {halls, selectedMovieHallId} = this.$store.state;
        return halls[selectedMovieHallId].seats
      },
      soldTickets() {
        const {soldTickets, selectedTime} = this.$store.state;
        if (soldTickets && soldTickets[this.movieId] && soldTickets[this.movieId][selectedTime]) {
          return soldTickets[this.movieId][selectedTime];
        }
      },
      selectedTicketCount() {
        let count = 0;
        for (let key in this.$store.state.selectedTicketCounts) {
          count += this.$store.state.selectedTicketCounts[key]
        }
        return count;
      },
      selectedSeatCount(){
        return this.selectedSeats.length;
      }

    },
    methods: {
      movie() {
        return this.$store.state.movieDetails[this.movieId];
      },
      isSeatSold(row, seat) {
        return this.soldTickets.indexOf(`${row}${seat}`) > -1;
      },
      isSeatSelected(row, seat) {
        return this.selectedSeats.indexOf(`${row}${seat}`) > -1;
      },
      toggleSeat(row, seat) {
        const key = `${row}${seat}`;
        if (this.selectedSeats.indexOf(key) > -1) {
          this.selectedSeats.splice(this.selectedSeats.indexOf(key), 1);
        } else {
          this.selectedSeats.push(key);
        }
      },
      navigateToSuccessPage(){
        this.$store.commit('setSelectedSeats',this.selectedSeats);
        this.$router.push('/confirmation');
      }
    },
    components: {
      Loader, BackdropImage, Poster
    }

  }
</script>


<template>
  <div>
    <Loader v-if="isLoading"/>
    <section v-if="hasSeatingInfo">
      <BackdropImage :imageName="movie().backdrop_path"/>
      <div class="container pt-5">
        <div class="row">
          <div class="col-sm-4">
            <Poster :posterName="movie().poster_path"/>
          </div>
          <div class="col-sm-8">
            <div class="movie-details">
              <div class="seating">
                <p class="scene">SCENE</p>
                <div class="seats" v-for="(seats, row) in seatMap">
                  <span class="row-title">{{row}}</span>
                  <div class="row">
                    <span v-for="seat in seats"
                          @click="toggleSeat(row, seat)"
                          :disabled="isSeatSold(row,seat)"
                          :class="{
                         'not-allowed': !seat,
                         'not-available': isSeatSold(row, seat),
                         'selected': isSeatSelected(row, seat)
                       }">
                      {{seat}}
                    </span>
                  </div>
                </div>
                <button
                  @click="navigateToSuccessPage"
                  :disabled="selectedTicketCount != selectedSeatCount"
                  class="btn btn-success">Buy Tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .seating {
    width: 694px;
    position: relative;
  }

  .seating .scene {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }

  .seating .row-title {
    float: left;
    font-weight: bold;
    width: 50px;
  }

  .seating .row {
    display: inline-block;
  }

  .seating .row span {
    float: left;
    width: 40px;
    height: 25px;
    border: 1px solid #FFF;
    text-align: center;
    margin: 0 2px;
    cursor: pointer;
  }

  .seating .row span:not(.not-allowed):not(.not-available):hover {
    background: #FFF;
    color: #000;
  }

  .seating .row span.not-allowed {
    background: #9d9d9d;
    cursor: not-allowed;
  }

  .seating .row span.not-available {
    background: #E4112B;
    cursor: not-allowed;
  }

  .seating .row span.selected {
    background: #5cb85c;
  }

  .seating .btn-success {
    cursor: pointer;
    margin-top: 10px;
    position: absolute;
    right: 0;
  }
</style>
