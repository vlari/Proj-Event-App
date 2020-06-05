import React from 'react';
import EventList from './modules/Event/EventList';
import Login from './modules/Session/Login';
import ForgotPassword from './modules/Session/ForgotPassword';

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
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/forgotpassword',
    exact: true,
    component: ForgotPassword
  }
];

export default routes;
