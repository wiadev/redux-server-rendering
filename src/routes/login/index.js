import React from 'react';
import Login from './Login';

const title = 'Welcome Back!';

export default {

  path: '/login',

  action() {
    return {
      title,
      component: <Login title={title} />,
      bodyClass: 'login',
    };
  },

};
