import React from 'react';
import { Field } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RenderTextField from '../../Common/RenderTextField';
import s from './WhyWeLove.css';

function WhyWeLove() {
  return (
    <div>
      <Field
        className={s.formControl}
        name="bullet1"
        type="text"
        component={RenderTextField}
        maxLength={200}
        placeholder="Bullet #1"
      />
      <Field
        className={s.formControl}
        name="bullet2"
        type="text"
        component={RenderTextField}
        maxLength={200}
        placeholder="Bullet #2"
      />
      <Field
        className={s.formControl}
        name="bullet3"
        type="text"
        component={RenderTextField}
        maxLength={200}
        placeholder="Bullet #3"
      />
      <Field
        className={s.formControl}
        name="bullet4"
        type="text"
        component={RenderTextField}
        maxLength={200}
        placeholder="Bullet #4"
      />
    </div>
  );
}

export default withStyles(s)(WhyWeLove);
