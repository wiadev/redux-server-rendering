/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./home').default,
    require('./reservations').default,
    require('./promoCodes').default,
    require('./properties').default,
    require('./admin').default,
    require('./login').default,
    require('./logout').default,
    require('./register').default,
    require('./auth').default,
    // place new routes before...
    require('./notFound').default,
  ],

  async action({ next }) {
    let route;

    // Execute each child route until one of them return the result
    // TODO: move this logic to the `next` function
    do {
      route = await next();
    } while (!route);

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Admin Page'} - bizly.com`;
    route.description = route.description || '';

    return route;
  },

};
