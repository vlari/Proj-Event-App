import React from 'react';
const Home = React.lazy(() => import('./modules/Pages/Home'));
const EventList = React.lazy(() => import('./modules/Event/EventList'));
const EventDetail = React.lazy(() => import('./modules/Event/EventDetail'));
const TicketList = React.lazy(() => import('./modules/Order/TicketList'));
const SignIn = React.lazy(() => import('./modules/Session/SignIn'));
const SignUp = React.lazy(() => import('./modules/Session/Signup'));
const ForgotPassword = React.lazy(() => import('./modules/Session/ForgotPassword'));
const FavoriteList = React.lazy(() => import('./modules/Account/FavoriteList'));

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/events',
    exact: true,
    component: EventList
  },
  {
    path: '/events/:id',
    exact: true,
    component: EventDetail
  },
  {
    path: '/user/tickets',
    exact: true,
    component: TicketList
  },
  {
    path: '/user/favorites',
    exact: true,
    component: FavoriteList
  },
  {
    path: '/signin',
    exact: true,
    component: SignIn
  },
  {
    path: '/signup',
    exact: true,
    component: SignUp
  },
  {
    path: '/forgotpassword',
    exact: true,
    component: ForgotPassword
  }
];

export default routes;
