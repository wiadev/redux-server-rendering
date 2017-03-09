import React from 'react';
import { Field } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RenderTextField from '../../Common/RenderTextField';
import RenderToggler from '../../Common/RenderToggler';
import s from '../EditProperty.css';

function Primary() {
  return (
    <div>
      <div className={`${s.formRow} clearfix`}>
        <div className="col-md-5 col-xs-12">
          <label htmlFor="primary.contact" className={s.label}>Primary Contact</label>
          <div className={s.fieldDescription}>
            This is the only person who will receive notifications of meetings,
            and will be the contact to assist clients with questions in the Bizly Message Center.
          </div>
        </div>
        <div className="col-md-6 col-xs-12 pull-right">
          <Field
            name="contact"
            placeholder="Name"
            component={RenderTextField}
            type="text"
          />
          <Field
            name="email"
            placeholder="Email"
            component={RenderTextField}
            type="email"
          />
        </div>
      </div>
      <div className={`${s.formRow} clearfix`}>
        <div className="col-md-5 col-xs-12">
          <div className={s.fieldDescription}>
            Phone number will not be displayed but will be provided to clients
            after booking is complete.
          </div>
        </div>
        <div className="col-md-6 col-xs-12 pull-right">
          <Field
            name="phone"
            placeholder="Phone number"
            component={RenderTextField}
            type="text"
          />
        </div>
      </div>
      {/*
      <div className={`${s.formRow} clearfix`}>
        <div className="col-md-5 col-xs-12">
          <label htmlFor="primary.public" className={s.label}>May we show this contact name publicly?</label>
          <div className={s.fieldDescription}>
            Used for prospective clients with questions to contact
            through the Bizly Message Center
          </div>
        </div>
        <div className="col-md-6 col-xs-12 pull-right">
          <Field
            name="public"
            component={RenderToggler}
            type="checkbox"
            className="pull-right"
          />
        </div>
      </div>
      */}
    </div>
  );
}

export default withStyles(s)(Primary);
