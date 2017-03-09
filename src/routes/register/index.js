import React from 'react';
import Register from './Register';
import Welcome from '../../components/Welcome';

const title = 'Welcome to Bizly Admin';

export default {

  path: '/register',

  children: [
    {
      path: '/welcome',
      action: () => {
        return {
          title,
          component: <Welcome title="We're here to help" />,
        };
      },
    },
    {
      path: '/',
      action: () => {
        return {
          title,
          component: <Register title={title} />,
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
    route.title = `${route.title || 'Register  Page'} - bizly.com`;
    route.description = route.description || '';
    return route;
  },

};
