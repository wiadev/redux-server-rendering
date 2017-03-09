import React from 'react';
import s from './renderPolicies.css';
import { Field } from 'redux-form';

const renderField = ({ input, onChangeAction, label, type, meta: { touched, error } }) => {
  const { value } = input;
  return (
    <div>
      <div className="col-md-6">
        <label className={s.label}>{value.copy}</label>
      </div>
      <div className="col-md-6">
        <input
          className={`${s.formInput} form-control`}
          type={type}
          placeholder={label}
          defaultValue={value.value}
          onChange={(event) => {
            onChangeAction({ ...value, value: event.target.value });
            input.onChange({ ...value, value: event.target.value })
          }}
        />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
};

const renderPolicies = ({ fields, onChangeAction, meta: { touched, error } }) => {

  return (
    <div>
      {fields.map((policy, index) => {
        return (
          <div key={`${index}-${policy}`} className={`${s.formSection} form-group col-md-12 col-xs-12`}>
            <Field
              name={policy}
              component={renderField}
              className="form-control"
              onChangeAction={onChangeAction}
            />
          </div>
        );
      }
      )}
    </div>
  );
};

export default renderPolicies;
