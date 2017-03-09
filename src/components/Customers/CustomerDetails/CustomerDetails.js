import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CustomerDetails.css';

function CustomerDetails({ customer }) {
  console.log(customer);
  return (
    <div className={s.customerDetailsWrapper}>
      <div className={s.overlay} />
      <div className={s.customerView}>
        view customer {customer}
      </div>
    </div>
  )
}

export default withStyles(s)(CustomerDetails);
