import React from 'react';
import { Field } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './OnTheProperty.css';
import RenderTextField from '../../Common/RenderTextField';
import RenderSelect from '../../Common/RenderSelect';

function OnTheProperty() {
  return (
    <div className={`${s.section} row`}>
      <div className="col-md-2">
        <Field
          name="type"
          component={RenderSelect}
          placeholder="Type"
        >
          <option>Bar</option>
          <option>Cafe</option>
        </Field>
      </div>
      <div className="col-md-5">
        <Field
          name="fullName"
          type="text"
          component={RenderTextField}
          placeholder="Full name"
        />
      </div>
      <div className="col-md-5">
        <Field
          name="description"
          type="text"
          component={RenderTextField}
          placeholder="Description"
        />
      </div>
    </div>
  );
}

export default withStyles(s)(OnTheProperty);
