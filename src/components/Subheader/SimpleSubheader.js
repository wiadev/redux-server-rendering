import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PropertySubheader.css';
import Link from '../Link';

function SimpleSubheader({ title }) {

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h3 className={`${s.title} col-md-3`}>
          {title}
        </h3>
      </div>
    </div>
  );
}

export default withStyles(s)(SimpleSubheader);
