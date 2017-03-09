import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListViewSubheader.css';
import Link from '../Link';

function ListViewSubheader({ buttonAction, title = 'Calendar' }) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h3 className={`${s.title} col-md-6`}>
          {title}
        </h3>
        <a to="#" onClick={buttonAction} className={`${s.action} btn col-md-2`}>Add New Event</a>
      </div>
    </div>
  );
}

export default withStyles(s)(ListViewSubheader);
