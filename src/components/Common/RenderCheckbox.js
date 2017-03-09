import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RenderCheckbox.css';

function RenderCheckbox({ input, init, label, ...rest }) {
  return (
    <label className={`${s.label} ${input.checked ? s.checked : ''}`}>
      <span className={s.checkbox}>
        <input
          {...input}
          {...rest}
          className={s.formControl}
        />
        <span className={s.checkMark} />
      </span>
      {label || input.value}
    </label>
  );
}

export default withStyles(s)(RenderCheckbox);
