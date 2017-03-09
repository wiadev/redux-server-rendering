import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { reduxForm, FieldArray, Field, formValueSelector } from 'redux-form';
import RenderFoodAndBeverage from './RenderFoodAndBeverage';
import PolicySelect from '../../Common/PolicySelect/PolicySelect';
import s from './FoodAndBeverage.css';

class FoodAndBeverage extends React.Component {
  constructor(props) {
    super(props);
    this.handleFoodSubmit = this.handleFoodSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleFoodSubmit() {
    event.preventDefault();
  }

  handleOnChange({ mapping_id, value, id, name, policy_type_id, type }) {
    this.props.updatePolicy({
      value,
      units: "hours",
    }, mapping_id);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFoodSubmit}>
          <div className={s.foodPolicy}>
            <div className={`${s.formRow} ${s.formRowWithLabels} row`}>
              <div className="col-md-6">
                <h4 className={s.label}>How much advanced notice is required?</h4>
              </div>
              <div className="col-md-5 pull-right">
                <Field
                  name="min_lead_time"
                  component={PolicySelect}
                  className={`${s.formSelect} form-control`}
                  onChangeAction={this.handleOnChange}
                  label="How much advanced notice is required?"
                  amenity="min_lead_time"
                  options={{
                    '029': '029',
                    '30': '30',
                  }}
                />
              </div>
            </div>

            <div className={`${s.formRow} ${s.formRowWithLabels} row`}>
              <div className="col-md-6">
                <h3 className={s.label}>What is your minimum per meeting (people)?</h3>
              </div>
              <div className="col-md-5 pull-right">
                <Field
                  name="min_capacity"
                  component={PolicySelect}
                  className={`${s.formSelect} form-control`}
                  onChangeAction={this.handleOnChange}
                  label="Units"
                  amenity="min_capacity"
                  options={{
                    '4': '4',
                    '6': '6',
                    '8': '8',
                    '10': '10',
                  }}
                />
              </div>
            </div>
          </div>

          <FieldArray
            name="foods"
            component={RenderFoodAndBeverage}
            amenityAction={this.props.amenityAction}
            createAmenity={this.props.createAmenity}
          />
        </form>
      </div>
    );
  }
}

FoodAndBeverage = reduxForm({
  form: 'editFoodAndBeverage',
})(FoodAndBeverage);

FoodAndBeverage = connect(
  (state, props) => {
    const { policy } = state.singleProperty;
    const { foods } = props;
    return ({
      initialValues: {
        min_lead_time: policy.filter(pol => pol.name === 'min_lead_time')[0],
        min_capacity: policy.filter(pol => pol.name === 'min_capacity')[0], // ID 16 /App/Models/Property
        foods,
      },
    });
  },
)(FoodAndBeverage)

export default withStyles(s)(FoodAndBeverage);
