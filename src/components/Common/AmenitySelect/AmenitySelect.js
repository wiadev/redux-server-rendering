import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AmenitySelect.css';

const AmenitySelect = ({ input, onChangeAction, label, options, amenity, meta: { touched, error } }) => {
  const { value } = input;
  const selectOptions = [];
  for(const key in options) {
    selectOptions.push(<option key={key} value={key}>{options[key]}</option>)
  }

  return (
    <div className={s.selectWrapper}>
      <select
        className={`${s.formSelect} form-control`}
        placeholder={label}
        defaultValue={value.attributes[amenity]}
        name={input.name}
        onChange={(event) => {
          onChangeAction({ ...value.attributes, [amenity]: event.target.value }, value.id);
          input.onChange({ ...value, name: event.target.value })
        }}
      >
        {selectOptions.map(option => option)}
      </select>
      {touched && error && <span>{error}</span>}
    </div>
  );
};

export default withStyles(s)(AmenitySelect);
