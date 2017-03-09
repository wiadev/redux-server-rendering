import React from 'react';
import Link from '../Link';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DashboardDropdown.css';

function DashboardDropdown() {
  return (
    <div className={s.dashboardMenu}>
      <div className="row">
        <Link to="#" className={`${s.menuLink} col-xs-6`}>
          <div className={cx(s.menuItem, s.calendar)}>
            <h4 className={s.menuTitle}>Calendar</h4>
            <p className={s.menuDescription}>Manage room availability</p>
          </div>
        </Link>
        <Link to="/properties" className={`${s.menuLink} col-xs-6`}>
          <div className={cx(s.menuItem, s.properties)}>
            <h4 className={s.menuTitle}>Properties</h4>
            <p className={s.menuDescription}>Manage policies, rates, setups and amenities</p>
          </div>
        </Link>
        <Link to="#" className={`${s.menuLink} col-xs-6`}>
          <div className={cx(s.menuItem, s.invoices)}>
            <h4 className={s.menuTitle}>Invoices</h4>
            <p className={s.menuDescription}>View, search all invoices</p>
          </div>
        </Link>
        <Link to="#" className={`${s.menuLink} col-xs-6`}>
          <div className={cx(s.menuItem, s.customers)}>
            <h4 className={s.menuTitle}>Customers</h4>
            <p className={s.menuDescription}>View contact information</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default withStyles(s)(DashboardDropdown);
