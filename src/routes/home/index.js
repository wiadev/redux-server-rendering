import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';
import history from '../../core/history';

export default {

  path: '/',

  action(context) {
    /**
      * store objects for user and userProperties
      * are hydrated on the server side through middleware
      * and available before user gets to this route
    */
    const { user, userProperties } = context.store.getState();

    /**
      * REDIRECTION LOGIC BASED ON USER ROLES AND BIZ LOGIC
      *
      * If user has any roles (call users/:id/properties)
      *  1). no roles - throw an exception
      *  2). is Admin (role < 10)? - goto property listings page
      *
      * If the user has only one property then there are two scenarios
      *  1) Property is published - then goto Calendar
      *  2) Property is onboarding - then goto onboarding page
    */

    let redirectTo = null; // by default do not redirect
    if (user.profile.attributes.roles[0].id < 10) {
      redirectTo = '/properties';
    } else if (userProperties.properties < 2) {
      // get the only property ID from the store
      const propId = userProperties.properties[0].id;
      redirectTo = `/properties/${propId}/edit`;
    }

    return {
      title: 'Home page!',
      component: <Home />,
      redirect: redirectTo,
    };
  },

};
