import React from 'react';
import { Field } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RenderAVAddOns.css';
import AmenityField from '../../Common/AmenityField/AmenityField';
import AmenitySelect from '../../Common/AmenitySelect/AmenitySelect';

function RenderAVAddOns({ fields, amenityAction, createAmenity }) {

  function addNewAddon() {
    // Empty amenity object to be passed to API
    const newAddOn = {
      amenity_id: 8091,
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
      {fields.map((option, index) => {
        return (
        <div key={index} className={s.avSection}>
          <div className={`${s.formRow} ${s.formRowWithLabels} row`}>
            <div className="col-md-6">
              <label htmlFor="avName" className={s.label}>Select add-on</label>
            </div>
            <div className="col-md-5 pull-right">
              <Field
                name={option}
                id="avName"
                component={AmenitySelect}
                className="form-control"
                onChangeAction={amenityAction}
                label="Select add-on"
                amenity="name"
                options={{
                  'LCD Screen':'LCD Screen',
                  'Wifi':'Wifi',
                  'Easel': 'Easel',
                  'Flip Chart': 'Flip Chart',
                  'Conference Call': 'Conference Call',
                  'Projector': 'Projector',
                  'Video Conference Equipment': 'Video Conference Equipment',
                  'Whiteboard': 'Whiteboard',
                  'Apple TV': 'Apple TV',
                  'A/V Package': 'A/V Package',
                }}
              />
            </div>
          </div>
          <div className={`${s.formRow} ${s.formRowWithLabels} row`}>
            <div className="col-md-6">
              <label htmlFor="notice" className={s.label}>Do you need advance notice?</label>
            </div>
            <div className="col-md-5 pull-right">
              <Field
                name={option}
                id="notice"
                component={AmenitySelect}
                className="form-control"
                onChangeAction={amenityAction}
                label="Do you need advance notice?"
                amenity="notice_required"
                options={{
                  true: 'Yes',
                  false: 'No',
                }}
              />
            </div>
          </div>
          <div className={`${s.formRow} ${s.formRowWithLabels} row`}>
            <div className="col-md-6">
              <label htmlFor="description" className={s.label}>Description</label>
            </div>
            <div className="col-md-6">
              <Field
                name={option}
                id="description"
                component={AmenityField}
                className="form-control"
                onChangeAction={amenityAction}
                label="Description"
                amenity="description"
                type="textarea"
              />
            </div>
          </div>

          {/*}<div className={`${s.formRow} row`}>
            <div className="col-md-12">
              <button
                type="button"
                className={s.addAnotherSection}
              >
                Add Taxes &amp; Fees for this item
              </button>
            </div>
          </div>*/}
        </div>
        )}
      )}

      <div className={s.footerLink}>
        <div className="row">
          <button
            type="button"
            className={`${s.addAnotherSection} ${s.addBtn} col-md-12`}
            onClick={() => addNewAddon()}
          >
            Add another Add On
          </button>
        </div>
      </div>
    </div>
  );
}

export default withStyles(s)(RenderAVAddOns);
