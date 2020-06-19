import React from 'react';
import EventList from './modules/Event/EventList';
import EventDetail from './modules/Event/EventDetail';
import Login from './modules/Session/Login';
import ForgotPassword from './modules/Session/ForgotPassword';
import FavoriteList from './modules/Account/FavoriteList';

const Home = React.lazy(() => import('./modules/Pages/Home'));

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
    path: '/login',
    exact: true,
    component: Login
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
