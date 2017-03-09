import React, { PropTypes } from 'react';
import s from '../EditProperty.css';

function MemberRow({
  input,
  className,
  wrapperClass,
  handleSaveMember,
  removeIndex,
  index,
  handleDeleteMember,
  label,
  type,
  meta: { touched, error }
}) {
  const { value } = input;
  /**
    * TODO: Add email vbalidation before submitting handleSaveMember
  */
  value.role_id = 10;
  return (
    <div>
      <div className="col-md-3 col-xs-6">
        <label className={s.staffLabel}>Admin</label>
      </div>
      <div className="col-md-7 col-xs-10">
        <input
          type="email"
          name={`${input.name}.email`}
          className="form-control"
          placeholder="Email"
          defaultValue={value.email}
          onChange={event => input.onChange({ ...value, email: event.target.value })}
        />
        {touched && error && <span>{error}</span>}
      </div>
      <div className="col-md-2">
        <button
          type="button"
          title="Save Member"
          className={s.saveButton}
          onClick={() => handleSaveMember(input.value)}
        />
        <button
          type="button"
          title="Remove Member"
          className={s.deleteButton}
          onClick={() => { handleDeleteMember(input.value); removeIndex(index); }}
        />
        </div>
    </div>
  )
}

MemberRow.propTypes = {
  className: PropTypes.string,
  wrapperClass: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  handleSaveMember: PropTypes.func,
  handleDeleteMember: PropTypes.func,
};

export default MemberRow;
