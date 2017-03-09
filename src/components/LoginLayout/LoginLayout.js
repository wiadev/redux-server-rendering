import React, { Children, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoginLayout.css';

function Layout({ children }) {
  return (
    <div className={s.loginLayout}>
      {Children.only(children)}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default withStyles(s)(Layout);
