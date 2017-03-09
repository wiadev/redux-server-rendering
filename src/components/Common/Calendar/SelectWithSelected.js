import React from 'react';

const PolicySelect = ({ input, onChangeAction, label, id, options, defaultValue, propName, amenity, meta: { touched, error } }) => {
  const { value } = input;
  const selectOptions = [];
  for(const key in options) {
    selectOptions.push(<option key={key} value={key}>{options[key]}</option>)
  }
  return (
    <div>
      <select
        id = {id}
        className='form-control'
        placeholder={label}
        defaultValue={defaultValue}
        name={input.name}
        onChange={(event) => {
          input.onChange(event);
          setTimeout(function (value, name) { onChangeAction(value, name);}, 150, event.target.value, input.name)
        }}
      >
        {selectOptions.map(option => option)}
      </select>
      {touched && error && <span>{error}</span>}
    </div>
  );
};

export default PolicySelect;
