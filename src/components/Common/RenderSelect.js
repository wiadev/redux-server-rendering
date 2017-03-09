import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RenderSelect.css';

function RenderSelect({ input, children, ...rest }) {
  return (
    <select
      {...input}
      {...rest}
      className={s.select}
    >
      {children}
    </select>
  );
}

export default withStyles(s)(RenderSelect);
