import React from 'react';
import Auth from './Auth';
import Login from '../../components/Auth/Login';

const title = 'Welcome Back!';

export default {

  path: '/auth',

  children: [
    {
      path: '/login',
      action: () => {
        return {
          title,
          component: <Login title={title} />,
        };
      },
    },
    {
      path: '/',
      action: () => {
        return {
          title,
          component: <Auth title={title} />,
        };
      },
    },
  ],

  async action({ next }) {
    let route;
    // Execute each child route until one of them return the result
    // TODO: move this logic to the `next` function
    do {
      route = await next();
    } while (!route);

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Auth Page'} - bizly.com`;
    route.description = route.description || '';

    return route;
  },

};
