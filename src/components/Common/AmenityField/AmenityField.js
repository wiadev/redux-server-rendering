import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AmenityField.css';

const AmenityField = ({ input, onChangeAction, label, amenity, type, meta: { touched, error } }) => {
  const { value } = input;
  const { attributes } = value;
  return (
    <div className={s.inputWrapper}>
      <input
        className={`${s.formInput} form-control`}
        type={type}
        name={input.name}
        placeholder={label}
        defaultValue={value.attributes[amenity]}
        onChange={event => {
          onChangeAction({ ...value.attributes, [amenity]: event.target.value }, value.id);
          input.onChange({ ...value, [amenity]: event.target.value })
        }}
      />
      {touched && error && <span>{error}</span>}
    </div>
  );
};

export default withStyles(s)(AmenityField);
