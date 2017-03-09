import React from 'react';
import { Field, FormSection } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../EditProperty.css';
import RenderTextField from '../../Common/RenderTextField';
import WhyWeLove from './WhyWeLove';
import Tags from './Tags';
import GreatFor from './GreatFor';
import OnTheProperty from './OnTheProperty';

function RenderEditorial({ fields }) {
  return (
    <div>
      {fields.map((option, index) =>
        <div key={index}>
          <div className={s.fieldSet}>
            <div className={`${s.formRow} clearfix`}>
              <div className="col-md-4">
                <label className={s.label}>Overview Statement</label>
                <div className={s.fieldDescription}>
                  What makes your property unique and an appealing place for meeting?
                  Please provide a brief description.
                </div>
              </div>
              <div className="col-md-6 pull-right">
                <Field
                  name={`${option}.overviewStatement`}
                  type="text"
                  component={RenderTextField}
                  placeholder="Name"
                  maxLength={150}
                />
              </div>
            </div>
            <div className={`${s.formRow} clearfix`}>
              <div className="col-md-4">
                <label className={`${s.label} text-uppercase`}>URL name</label>
                <div className={s.fieldDescription}>
                  Customize slug name.
                </div>
              </div>
              <div className="col-md-6 pull-right">
                <Field
                  name={`${option}.urlName`}
                  type="text"
                  component={RenderTextField}
                  placeholder="Name"
                  maxLength={150}
                />
              </div>
            </div>
          </div>
          <div className={s.fieldSet}>
            <div className={`${s.formRow} clearfix`}>
              <div className="col-md-12">
                <label className={`${s.label} text-uppercase`}>Why we love</label>
              </div>
              <div className="col-md-12">
                <FormSection name={`${option}.whyWeLove`}>
                  <WhyWeLove />
                </FormSection>
              </div>
            </div>
          </div>
          <div className={s.fieldSet}>
            <div className={`${s.formRow} clearfix`}>
              <div className="col-md-12">
                <label className={`${s.label} text-uppercase`}>Tags</label>
              </div>
              <FormSection name={`${option}.tags`}>
                <Tags />
              </FormSection>
            </div>
          </div>
          <div className={s.fieldSet}>
            <div className={`${s.formRow} clearfix`}>
              <div className="col-md-12">
                <label className={`${s.label} text-uppercase`}>Great For</label>
                <p>Select at least three (3) Great For statements</p>
              </div>
              <FormSection name={`${option}.greatFor`}>
                <GreatFor />
              </FormSection>
            </div>
          </div>
          <div className={s.fieldSet}>
            <div className="clearfix">
              <div className="col-md-12">
                <label className={`${s.label} text-uppercase`}>On the property</label>
              </div>
            </div>
            <FormSection name={`${option}.onTheProperty`}>
              <OnTheProperty />
            </FormSection>
          </div>
        </div>
      )}
      <div className="col-md-12">
        <button
          type="button"
          className={s.addBtn}
          onClick={() => fields.push({})}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default withStyles(s)(RenderEditorial);
