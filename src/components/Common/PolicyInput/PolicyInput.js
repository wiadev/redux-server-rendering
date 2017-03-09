import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PolicyInput.css';

const PolicyInput = ({ input, onChangeAction, label, amenity, type, meta: { touched, error } }) => {
  const { value } = input;
  return (
    <div className={s.inputWrapper}>
      <input
        className={`${s.formInput} form-control`}
        type={type}
        name={input.name}
        placeholder={label}
        defaultValue={value.value}
        onChange={event => {
          onChangeAction({ ...value, value: event.target.value });
          input.onChange({ ...value, value: event.target.value });
        }}
      />
      {touched && error && <span>{error}</span>}
    </div>
  );
};

export default withStyles(s)(PolicyInput);
