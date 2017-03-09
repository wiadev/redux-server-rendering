import history from './history';

function historyAvailable() {
  return !!history.location;
}

const isActiveRoute = (to = '') => {
  if (historyAvailable() && to) {
    return history.location.pathname === to;
  }

  return false;
};

export const isActiveRouteDeep = (to = '') => {
  if (historyAvailable() && to) {
    const possibleMatches = to.split('/').filter(v => !!v);
    const historyFragments = history.location.pathname.split('/').filter(v => !!v);

    return historyFragments.some(fragment => possibleMatches.indexOf(fragment) >= 0);
  }

  return false;
};

export default isActiveRoute;
