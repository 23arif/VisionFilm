<script>
  import Loader from "./Loader";
  import BackdropImage from "./BackdropImage";
  import Poster from "./Poster";

  export default {
    name: "TicketSelection",
    data() {
      return {
        isLoading: true,
        selectedTime: null,
        selectedTickets: {},
        hasTicketingInfo: false,
      }
    },
    created() {
      this.$store.dispatch('fetchMovieDetails', this.movieId).then(() => {
        this.$store.dispatch('fetchMovieTimes', this.movieId).then(() => {
          this.isLoading = false;
          this.hasTicketingInfo = true
        })
      });
    },
    computed: {
      movieId() {
        return this.$route.params.id;
      },
      getEnv(){
        console.log(process.env.VUE_APP_TITLE)
      }

    },
    methods: {
      movie() {
        return this.$store.state.movieDetails[this.movieId];
      },
      movieTimes() {
        return this.$store.state.movieTime[this.movieId];
      },
      selectTime(time) {
        this.selectedTime = time;
      }
    },
    components: {
      BackdropImage, Loader, Poster
    }
  }
</script>


<template>
  <div>
    <Loader v-if="isLoading"/>
    <section v-if="hasTicketingInfo">
      <BackdropImage :imageName="movie().backdrop_path"/>
      <div class="container pt-5">
        <div class="row">
          <div class="col-sm-4">
            <Poster :posterName="movie().poster_path"/>
          </div>
          <div class="col-sm-8 details">
            <div class="movie-details">
              <h2 class="movie-title">{{movie().original_title}}</h2>
              <p>{{movie().overview}}</p>
              <div class="movie-times">
                <h5>{{movieTimes().hallName}}</h5>
                <p v-for="time in movieTimes().times"
                   @click="selectTime(time)"
                   :class="{ selected: time === selectedTime }">
                  {{time}}
                </p>
              </div>
<!--              <div class="ticket-types">-->
<!--                <div v-for="ticket in ticketPrices">-->
<!--                  <p-->
<!--                    @click="removeTicket(ticket.label)"-->
<!--                    :class="{ disabled: !selectedTickets[ticket.label]}">-</p>-->
<!--                  <div class="text">-->
<!--                    <span class="label">-->
<!--                      <span class="count" v-if="selectedTickets[ticket.label] > 0">-->
<!--                         {{selectedTickets[ticket.label]}}-->
<!--                      </span>-->
<!--                      {{ticket.label}}-->
<!--                    </span>-->
<!--                    <span class="price">{{parseInt(ticket.price, 10).toFixed(2)}} TL</span>-->
<!--                  </div>-->
<!--                  <p @click="addTicket(ticket.label)">+</p>-->
<!--                </div>-->
<!--              </div>-->
<!--              <button-->
<!--                @click="navigateToSeatSelection"-->
<!--                :disabled="!isTimeAndTicketCountSelected"-->
<!--                type="button"-->
<!--                class="btn btn-success">Select Your Seat-->
<!--              </button>-->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .details {
    color: #fff
  }

  .movie-times p {
    display: inline-block;
    padding: 5px 20px;
    border: 1px solid #FFF;
    border-radius: 20px;
    margin-right: 10px;
    cursor: pointer;
  }

  .movie-times p.selected,
  .movie-times p:hover,
  .ticket-types p:not(.disabled):hover {
    background-color: #FFF;
    color: #000;
  }

  .ticket-types {
    margin-top: 30px;
  }

  .ticket-types p {
    font-size: 22px;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    border: 2px solid #FFF;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    user-select: none;
    position: relative;
    top: -15px;
  }

  .ticket-types p.disabled {
    opacity: .33;
  }

  .ticket-types .text {
    display: inline-block;
    width: 175px;
    text-align: center;
  }

  .ticket-types .label {
    display: block;
    font-size: 24px;
    font-weight: bold;
  }
</style>
