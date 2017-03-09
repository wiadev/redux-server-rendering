import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RenderToggler.css';

function RenderCheckbox({ input, label, name, className, ...rest }) {
  const { value } = input;
  console.log(input.name);
  console.log(input);
  return (
    <label className={className}>
      <span>
        <input
          {...input}
          {...rest}
          id={name}
          className={s.checkbox}
        />
      </span>
      {input.value ?
        <div className={`${s.toggler} ${s.yes}`}>Yes</div> :
        <div className={`${s.toggler} ${s.no}`}>No</div>
      }
    </label>
  );
}

export default withStyles(s)(RenderCheckbox);
