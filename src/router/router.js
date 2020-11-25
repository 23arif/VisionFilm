import Home from '../components/Home.vue';
import MovieDetails from "../components/MovieDetails";
import TicketSelection from "../components/TicketSelection";
import SeatSelection from "../components/SeatSelection";

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
    },
    {
      path: '/movie/:id/seat-selection',
      component: SeatSelection
    },
    // {
    //   path: '/confirmation',
    //   component: Confirmation
    // }
  ],
  mode: 'history'
}
