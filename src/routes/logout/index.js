import React from 'react';
import history from '../../core/history';

const title = 'Log Out';

export default {

  path: '/logout',

  async action(state, next) {
    state.store.dispatch({
      type: 'USER_AUTH_OUT'
    })
    history.push('/login', {state: 'login'})
  },

};
