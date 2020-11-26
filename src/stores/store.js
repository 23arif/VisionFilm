import service from "../services/service";

const state = {
  movies: [],
  movieDetails: {},
  halls: {},
  movieCast: [],
  movieTrailer: [],
  movieTime: {},
  ticketPrice: [],
  soldTickets: {},
  selectedMovieId: null,
  selectedTime: null,
  selectedTicketCounts: null,
  selectedMovieHallId: null,
  selectedSeats: null,
};
const getters = {
  groupMovies() {
    const grouped = [];
    state.movies.forEach((movie, index) => {
      if (index % 3 === 0) {
        grouped.push([])
      }
      grouped[grouped.length - 1].push(movie);
    });
    return grouped
  }
};
const mutations = {
  setMovies(state, movies) {
    state.movies = movies
  },
  setMovieDetails(state, data) {
    const {movieId, movieData} = data;
    state.movieDetails[movieId] = movieData
  },
  setMovieCast(state, castData) {
    state.movieCast = castData;
  },
  setMovieTrailer(state, trailerData) {
    state.movieTrailer = trailerData;
  },
  setMovieTimes(state, data) {
    const {id, times} = data;
    state.movieTime[id] = times;
  },
  setTicketPrices(state, price) {
    state.ticketPrice = price;
  },
  setSelectedTime(state, time) {
    state.selectedTime = time;
  },
  setSelectedTicketOptions(state, tickets) {
    state.selectedTicketCounts = tickets;
  },
  setSelectedMovieHallId(state, id) {
    state.selectedMovieHallId = id;
  },
  setSeatingMap(state, data) {
    const {hallId, seating} = data;
    state.halls[hallId] = seating;
  },
  setSoldTickets(state, data) {
    const {movieId, time, tickets} = data;
    state.soldTickets[movieId] = state.soldTickets[movieId] || {};
    state.soldTickets[movieId][time] = tickets;
  },
  setSelectedMovieId(state, id) {
    state.selectedMovieId = id
  },
  setSelectedSeats(state, seats) {
    state.selectedSeats = seats;
  },
}
const actions = {
  fetchMovies(context) {
    return service.fetchMovies().then((snapshot) => {
      context.commit('setMovies', snapshot.val());
    })
  },

  fetchMovieDetails(context, id) {
    return service.fetchMovieDetails(id)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        context.commit('setMovieDetails', {movieId: id, movieData: res})
      })
  },

  fetchMovieCast(context, id) {
    return service.fetchMovieCast(id)
      .then((res) => {
        return res.json()
      })
      .then((castData) => {
        const d = [];
        let index = 0;
        for (let i = 0; i < castData.cast.length; i++) {
          if (castData.cast[i].profile_path != null) {
            d[index] = {id: index, name: castData.cast[i].name, profile_path: castData.cast[i].profile_path};
            index++;
          }
        }
        context.commit('setMovieCast', d)
      })
  },

  fetchMovieTrailer(context, id) {
    return service.fetchMovieTrailer(id)
      .then(res => {
        return res.json();
      })
      .then(trailerData => {
        context.commit('setMovieTrailer', trailerData.results)
      })
  },

  fetchMovieTimes(context, id) {
    return service.fetchMovieTimes(id).then((snapshot) => {
      context.commit('setMovieTimes', {id, times: snapshot.val()});
    });
  },

  fetchTicketPrices(context) {
    return service.fetchTicketPrices().then((snapshot) => {
      context.commit('setTicketPrices', snapshot.val())
    })
  },
// ------------------
  fetchSeatMap(context, hallId) {
    return service.fetchSeating(hallId).then((snapshot) => {
      context.commit('setSeatingMap', {hallId, seating: snapshot.val()});
    });
  },

  fetchSoldTickets(context, {movieId, time}) {
    return service.fetchSoldTickets({movieId, time}).then((snapshot) => {
      context.commit('setSoldTickets', {movieId, time, tickets: snapshot.val()});
    });
  },

  fetchSeatingInfo(context, {movieId, time, hallId}) {
    return context.dispatch('fetchSeatMap', hallId).then(() => {
      return context.dispatch('fetchSoldTickets', {movieId, time});
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
