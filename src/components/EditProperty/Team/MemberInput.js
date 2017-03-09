import React, { PropTypes } from 'react';

function MemberInput({ input, className, wrapperClass, label, type, meta: { touched, error } }) {
  return (
    <div className={wrapperClass}>
      <input {...input} type={type} placeholder={label} className={className} />
      {touched && error && <span>{error}</span>}
    </div>
  );
}

MemberInput.propTypes = {
  input: PropTypes.element,
  className: PropTypes.string,
  wrapperClass: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
};

export default MemberInput;
