import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import {Editor, EditorState} from 'draft-js';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../Link';
import AmenityField from '../../Common/AmenityField/AmenityField';
import AmenitySelect from '../../Common/AmenitySelect/AmenitySelect';
import s from './RenderFoodAndBeverage.css';

function RenderFoodAndBeverage({ fields, amenityAction, createAmenity, meta: { touched, error } }) {

  function addNewAddon() {
    // Empty amenity object to be passed to API
    const newAddOn = {
      amenity_id: 10000,
      name: '',
      description: '',
      notice_required: true,
      included: false,
      flat_rate: false,
      net_rate: 0,
      published_rate: 0,
      units: 'New addon',
      disclaimer: '',
    };

    createAmenity(newAddOn);
  }

  return (
    <div>
      {fields.map((option, index) =>
        <div key={index} className={s.foodWrapper}>
          <div className={`${s.formRow} ${s.formRowWithLabels} row`}>
            <div className="col-md-12">
              <h3 className={s.label}>Add A Meal Item</h3>
              <p className={s.helperText}>
                We recommend three to five items be offered,
                including at least one budget-friendly option.
              </p>
            </div>
            <div>
              <div className="col-md-4">
                <Field
                  name={option}
                  component={AmenityField}
                  className={`${s.formInput} form-control`}
                  onChangeAction={amenityAction}
                  label="Meal Name"
                  amenity="name"
                  type="input"
                />
              </div>
              <div className="col-md-4">
                <Field
                  name={option}
                  component={AmenityField}
                  className={`${s.formInput} form-control`}
                  onChangeAction={amenityAction}
                  label="Cost"
                  amenity="net_rate"
                  type="input"
                />
              </div>
              <div className="col-md-4">
                <Field
                  name={option}
                  component={AmenitySelect}
                  className={`${s.formSelect} form-control`}
                  onChangeAction={amenityAction}
                  label="Units"
                  amenity="units"
                  options={{
                    'Person': 'Person',
                    'Group': 'Group',
                    'New addon': 'New addon',
                  }}
                />
              </div>
            </div>

        </div>

        <div className={`${s.formRow} ${s.formRowWithLabels} row`}>
          <div className="col-md-6">
            <h3 className={s.label}>Description</h3>
            <p className={s.helperText}>Please describe what is included with this item</p>
          </div>
          <div className="col-md-6">
            <Field
              name={option}
              component={AmenityField}
              className={`${s.formInput} form-control`}
              onChangeAction={amenityAction}
              label="Description"
              amenity="description"
              type="textarea"
            />
          </div>
        </div>
      </div>
      )}
      <div className={s.footerLink}>
        <div className="row">
          <button
            type="button"
            className={`${s.addAnotherSection} ${s.addBtn} col-md-12`}
            onClick={() => addNewAddon()}
          >
            Add another Food &amp; Beverage option
          </button>
        </div>
      </div>
    </div>
  );
}

export default withStyles(s)(RenderFoodAndBeverage);
