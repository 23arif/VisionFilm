import service from "../services/service";

const state = {
  movies: [],
  movieDetails: {},
  movieCast: [],
  movieTrailer: [],
  movieTime: {},
};
const getters = {
  movies() {
    return state.movies;
  },
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
    const {id,times}  = data;
    state.movieTime[id] = times;
  }
};
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
};

export default {
  state,
  getters,
  mutations,
  actions
}
