import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import StaffField from '../../Common/StaffField/StaffField';
import RenderSelect from '../../Common/RenderSelect';
import MemberRow from './MemberRow';
import s from '../EditProperty.css';

function RenderMembers({ fields, handleSaveMember, handleDeleteMember, meta: { touched, error } }) {

  return (
    <div>
      <div className={`${s.formRow} clearfix`}>
        <div className="col-md-12">
          <label className={s.label}>Additional Team Members</label>
          <div className={s.fieldDescription}>
            These contacts are for Bizly internal purposes only.
          </div>
        </div>
      </div>
      {fields.map((member, index) =>
        <div key={index} className={`${s.formRow} clearfix`}>
          <Field
            name={member}
            component={MemberRow}
            handleSaveMember={handleSaveMember}
            handleDeleteMember={handleDeleteMember}
            removeIndex={fields.remove}
            index={index}
          />
        </div>
      )}
      <div className={`${s.formRow} clearfix`}>
        <div className="col-xs-12">
          <button
            type="button"
            onClick={() => fields.push({})}
            className={s.addBtn}
          >Add</button>
        </div>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
}

RenderMembers.propTypes = {

};

export default withStyles(s)(RenderMembers);
