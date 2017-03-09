import React from 'react';
import PromoCodes from './PromoCodes';

const title = 'Promo Codes';

export default {

  path: '/promo-codes',

  action() {
    return {
      title,
      component: <PromoCodes title={title} />,
    };
  },

};
