export default {
  fetchMovies(){
    return firebase.database().ref('/movies').once('value');
  },
  fetchMovieDetails(id){
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c0ba1afeab76b551a93d32aaaeff150a&language=en-US`)
  },
  fetchMovieCast(id){
    return fetch(`http://api.themoviedb.org/3/movie/${id}/casts?api_key=c0ba1afeab76b551a93d32aaaeff150a&language=en-US`)
  },
  fetchMovieTrailer(id){
    return fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=c0ba1afeab76b551a93d32aaaeff150a&language=en-US`)
  },

  fetchMovieTimes(id) {
    return firebase.database().ref(`/movieTimes/${id}`).once('value');
  },

}
