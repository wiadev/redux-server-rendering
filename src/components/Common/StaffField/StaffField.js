import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StaffField.css';

function StaffField(field) {
  console.log(field);
  return (
    <label className={`${s.formGroup} ${field.className} clearfix`}>
      <input
        type="text"
        onChange={(event, index, value) => field.input.onChange(value)}
        value={field.input.value}
        maxLength={field.maxLength}
        placeholder={field.placeholder}
        {...field.input}
        onBlur={event => {
          field.blurAction()
        }}
        className={field.maxLength ? `${s.formControl}` : `${s.fullWidth} ${s.formControl}`}
      />
      {
        field.maxLength ?
          <div className={s.counter}>{field.maxLength - field.input.value.length}</div> :
        null
      }
    </label>
  );
}

export default withStyles(s)(StaffField);
