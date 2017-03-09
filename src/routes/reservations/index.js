import React from 'react';
import Reservations from './Reservations';

const title = 'Reservations';

export default {

  path: '/reservations',

  action() {
    return {
      title,
      component: <Reservations title={title} />,
    };
  },

};
