import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import moment from 'moment';
import s from './Footer.css';
import Link from '../Link';


function Footer() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <span className={s.text}>{moment().format('YYYY')} &copy; BIZLY, Inc. All Rights Reserved.</span>
      </div>
    </div>
  );
}

export default withStyles(s)(Footer);
