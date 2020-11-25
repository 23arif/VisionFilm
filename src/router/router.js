import Home from '../components/Home.vue';
import MovieDetails from "../components/MovieDetails";
import TicketSelection from "../components/TicketSelection";

export default {
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/movie/:id',
      component: MovieDetails,
    },
    {
      path: '/movie/:id/tickets',
      component: TicketSelection,
    }
  ],
  mode: 'history'
}
