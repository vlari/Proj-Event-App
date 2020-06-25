import React from 'react';
const Home = React.lazy(() => import('./modules/Pages/Home'));
const EventList = React.lazy(() => import('./modules/Event/EventList'));
const EventDetail = React.lazy(() => import('./modules/Event/EventDetail'));
const SignIn = React.lazy(() => import('./modules/Session/SignIn'));
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
    path: '/signin',
    exact: true,
    component: SignIn
  },
  {
    path: '/forgotpassword',
    exact: true,
    component: ForgotPassword
  },
  {
    path: '/favorites',
    exact: true,
    component: FavoriteList
  }
];

export default routes;
