import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import renderPolicies from './renderPolicies';
import RenderCheckbox from '../../Common/RenderToggler';
import { updatePolicy } from '../../../actions/properties/updatePolicy';
import debounce from '../../Common/debounce';
import PolicySelect from '../../Common/PolicySelect/PolicySelect';
import PolicyInput from '../../Common/PolicyInput/PolicyInput';
import ReduxFormDropzone from '../../Common/FormDropzone';
import s from './Policies.css';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      updatePolicy,
    }, dispatch),
  };
}

function mapStateToProps({ singleProperty }) {
  return {
    policies: singleProperty.policy,
    initialValues: { policies: singleProperty.policy },
  };
}

class PoliciesSection extends React.Component {

  constructor(props) {
    super(props);
    this.policies = props.policies;
    this.handleOnChange = debounce(this.handleOnChange.bind(this), 1000);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleOnChange({ mapping_id, value, id, name, policy_type_id, type }) {
    this.props.actions.updatePolicy({
      value,
      units: "hours",
    }, mapping_id);
  }

  handleToggle({ mapping_id, value, id, name, policy_type_id, type }) {
    this.props.actions.updatePolicy({
      value,
    }, mapping_id);
  }

  termsDrop(files) {
    this.props.policyTermsDrop(files);
  }

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <form>
          <div className={`${s.foodQuestions} ${s.subSection}`}>
            <div className={`${s.formRow} row`}>
              <div className="col-md-7">
                <h3 className={s.label}>Room Cancellation Policy</h3>
                <p className={s.helperText}>We recommend 24 hours (full refund beyond)</p>
              </div>
              <div className="col-md-5">
                <Field
                  name="booking_cancellation_notice"
                  component={PolicySelect}
                  className={`${s.formSelect} form-control`}
                  onChangeAction={this.handleOnChange}
                  label="How much advanced notice is required?"
                  amenity="booking_cancellation_notice"
                  options={{
                    24: '24',
                    48: '48',
                    72: '72',
                  }}
                />
              </div>
            </div>

            <div className={`${s.formRow} row`}>
              <div className="col-md-7">
                <h3 className={s.label}>Amenity Cancellation Notice</h3>
              </div>
              <div className="col-md-5">
                <Field
                  name="amenity_cancellation_notice"
                  component={PolicySelect}
                  className={`${s.formSelect} form-control`}
                  onChangeAction={this.handleOnChange}
                  label="Amenity Cancellation Notice"
                  amenity="amenity_cancellation_notice"
                  options={{
                    24: '24',
                    48: '48',
                    72: '72',
                  }}
                />
              </div>
            </div>

            <div className={`${s.formRow} row`}>
              <div className="col-md-5">
                <h3 className={s.label}>Is outside Food & Beverage allowed?</h3>
              </div>
              <div className="col-md-5 pull-right">
                <Field
                  name="outside_food"
                  component={PolicySelect}
                  className={`${s.formSelect} form-control`}
                  onChangeAction={this.handleOnChange}
                  label="Is outside Food & Beverage allowed?"
                  amenity="outside_food"
                  options={{
                    permitted: 'permitted',
                    'not permitted': 'not permitted',
                  }}
                />
              </div>
            </div>

            <div className={`${s.formRow} row`}>
              <div className="col-md-5">
                <h3 className={s.label}>Check-In Requirements</h3>
                <p className={s.helperText}>
                  Where will Bizly clients check in and will they need photo ID and credit card?
                </p>
              </div>
              <div className="col-md-6 pull-right">
                <Field
                  name="check_in"
                  component={PolicyInput}
                  className={`${s.formSelect} form-control`}
                  onChangeAction={this.handleOnChange}
                  label="Check-In Requirements"
                  amenity="check_in"
                />
              </div>
            </div>

            <div className={`${s.formRow} row`}>
              <div className="col-md-5">
                <h3 className={s.label}>Property Terms &amp; Conditions</h3>
                <p className={s.helperText}>
                  Please upload the “fine print” you require for meeting clients.
                </p>
              </div>
              <div className="col-md-4 pull-right">
                {this.props.termsUrl ?
                  <div className={s.termsWrapper}>
                    <a
                      className={s.termsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={this.props.termsUrl}
                    >
                      Terms &amp; Conditions.pdf
                    </a>
                    <button type="button" onClick={this.props.handlePolicyTermsDelete} className={s.deleteTerms}>×</button>
                  </div>
                  :
                  <Field
                    name={'logofiles'}
                    component={ReduxFormDropzone}
                    className={`${s.dropZone} dropZone`}
                    multiple={false}
                    dropzoneOnDrop={this.props.policyTermsDrop}
                  />
                }
              </div>
            </div>

            { /* <FieldArray name="policies" component={renderPolicies} onChangeAction={this.handleOnChange} /> */ }
          </div>
        </form>
      </div>
    );
  }

}

PoliciesSection.propTypes = {
  policies: PropTypes.array,
  termsUrl: PropTypes.string,
  policyTermsDrop: PropTypes.func,
  handlePolicyTermsDelete: PropTypes.func,
};

PoliciesSection = reduxForm({
  form: 'editPropertyPolicies',
})(PoliciesSection);

PoliciesSection = connect(
  (state, props) => {
    const { policy } = state.singleProperty;
    return ({
      initialValues: {
        policies: policy,
        booking_cancellation_notice: policy.filter(pol => pol.name === 'booking_cancellation_notice')[0],
        check_in: policy.filter(pol => pol.name === 'check_in')[0],
        outside_food: policy.filter(pol => pol.name === 'outside_food')[0],
        min_lead_time: policy.filter(pol => pol.name === 'min_lead_time')[0],
        max_lead_time: policy.filter(pol => pol.name === 'max_lead_time')[0],
        flip_interval: policy.filter(pol => pol.name === 'flip_interval')[0],
        min_duration: policy.filter(pol => pol.name === 'min_duration')[0],
        max_capacity: policy.filter(pol => pol.name === 'max_capacity')[0],
        min_amenity_lead_time: policy.filter(pol => pol.name === 'min_amenity_lead_time')[0],
      },
    });
  },
)(PoliciesSection)

PoliciesSection = connect(mapStateToProps, mapDispatchToProps)(PoliciesSection);
export default withStyles(s)(PoliciesSection);
