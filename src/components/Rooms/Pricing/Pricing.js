import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import ReduxFormDropzone from '../../Common/FormDropzone';
import s from './Pricing.css';

class PricingRoomInfo extends React.Component {

  constructor(props) {
    super(props);
    this.updateProperty = this.updatePricing.bind(this);
    this.property = this.props.property;
  }

  updatePricing(formValues) {
    event.preventDefault();
    console.log(this.props);
  }

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <p>Bizly rates are always hourly. A simple way to calculate this is to take your lowest day rate and divide by 8 hours. Here, we can help you do that, or instead you can simple submit an hourly rate. Buzly rates are guaranteed to be your lowest. <strong>Need help?</strong> <a href="#">View our suggestions.</a></p>

        <form onSubmit={handleSubmit(this.updatePricing)}>
          <div className={s.section}>
            <div className="form-group row">
              <div className="col-md-4">
                <label htmlFor="name">What is your lowest rate?</label>
                <p>Including corporate discounted rate plans.</p>
              </div>
              <div className="col-md-5 pull-right">
                <div className="col-md-6">
                  <Field
                    name=""
                    component="select"
                    className="form-control col-md-6"
                  >
                    <option>Full day</option>
                    <option>Half day</option>
                    <option>2 hours</option>
                  </Field>
                </div>

                <div className="col-md-6">
                  <Field
                    name=""
                    component="input"
                    type="text"
                    placeholder="$ 00.00"
                    className="form-control col-md-6"
                  />
                </div>
              </div>

              <div className="row">
                <p className="col-md-6">Based on the above, your net hourly rate would be:</p>
                <div className="pull-right col-md-2">$XX.XX</div>
              </div>
            </div>{/* end of section */}
            </div>

            <div className={s.section}>
              <div className="form-group row">
                <div className="col-md-6">
                  <label htmlFor="name" className={s.label}>
                    Would you like to offer last minute rates?
                  </label>
                  <p className={s.helper}>This rate would only apply to bookings within seven days or less.</p>
                </div>
                <div className="col-md-1 pull-right">
                  <Field
                    name=""
                    component="input"
                    type="checkbox"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-6">
                  <label htmlFor="name" className={s.label}>At what percentage? </label>
                </div>
                <div className="col-md-5 pull-right">
                  <Field
                    name=""
                    component="input"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row">
                <p className="col-md-6">Based on the above, your 7-day, last minute net hourly rate would be:</p>
                <div className="pull-right col-md-2">$XX.XX</div>
              </div>
            </div>{/* end of section */}

            <div className={s.section}>
              <div className="form-group row">
                <div className="col-md-6">
                  <label htmlFor="name" className={s.label}>
                    Would you like to add a tax, fee or service charge?
                  </label>
                  <p className={s.helper}>This rate…</p>
                </div>
                <div className="col-md-1 pull-right">
                  <Field
                    name=""
                    component="input"
                    type="checkbox"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-5">
                  <Field
                    name="priceLabel"
                    component="input"
                    type="text"
                    className="form-control"
                    placeholder="Label"
                  />
                </div>
                <div className="col-md-5">
                  <Field
                    name="priceAmount"
                    component="input"
                    type="text"
                    className="form-control"
                    placeholder="Amount"
                  />
                </div>
                <div className="col-md-2">
                  <Field
                    name=""
                    component="select"
                    className="form-control col-md-6"
                  >
                    <option>Percent</option>
                    <option>10%</option>
                    <option>20%</option>
                  </Field>
                </div>
              </div>
            </div>{/* end of section */}

            <div className="col-md-12">
              <button
                type="button"
                onClick={() => fields.push({})}
                className={s.addMoreButton}
              >Add More</button>
            </div>

        </form>
      </div>
    );
  }
}

PricingRoomInfo = reduxForm({
  form: 'editRoomPricing',
})(PricingRoomInfo);

PricingRoomInfo = connect(
  state => ({
    initialValues: state.singleProperty.attributes,
  }),
)(PricingRoomInfo)

export default withStyles(s)(PricingRoomInfo);
