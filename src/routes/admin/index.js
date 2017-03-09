import React from 'react';
import Admin from './Admin';

const title = 'Admin Page';
const isAdmin = false;

export default {

  path: '/admin',

  action() {
    if (!isAdmin) {
      return { redirect: '/login' };
    }

    return {
      title,
      component: <Admin title={title} />,
    };
  },

};
