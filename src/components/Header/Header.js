import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import Subheader from '../Subheader';
import ListViewSubheader from '../Subheader/ListViewSubheader';
import PropertySubheader from '../Subheader/PropertySubheader';
import СalendarViewSubheader from '../Subheader/СalendarViewSubheader';
import SimpleSubheader from '../Subheader/SimpleSubheader';

function Header({ user, subheader, property, subheaderTitle, buttonAction }) {

  let subheaderComponent = '';

  switch (subheader) {
    case "listview":
      subheaderComponent = <ListViewSubheader title={subheaderTitle} />;
      break;
    case "calendarview":
      subheaderComponent = <СalendarViewSubheader title={subheaderTitle} buttonAction={buttonAction}/>;
      break;
    case "simple":
      subheaderComponent = <SimpleSubheader title={subheaderTitle} />;
      break;
    default:
      subheaderComponent = <PropertySubheader property={property} />;
      break;
  }
  return (
    <div className={s.root}>
      <header className={s.top}>
        <div className={s.container}>
          <Navigation className={s.nav} user={user} />
          <Link className={s.brand} to="/">
            <span className={s.logo} />
          </Link>
        </div>
      </header>
      {subheaderComponent}
    </div>
  );
}

export default withStyles(s)(Header);
