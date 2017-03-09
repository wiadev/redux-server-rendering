import React from 'react';
import { Field } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Editorial.css';
import s from './Tags.css';
import RenderTag from '../../Common/RenderTag/RenderTag';

function Tags({ allTags, propertyTags, propertyTagNames, updateTags }) {
  const tags = Object.keys(allTags).map(key => allTags[key]);
  const priceTags = tags.filter(tag => tag.type === 'Price');
  const vibeTags = tags.filter(tag => tag.type === 'Vibe');
  const hotelTags = tags.filter(tag => tag.type === 'Hotel Type');
  const periodTags = tags.filter(tag => tag.type === 'Period');
  const benefitTags = tags.filter(tag => tag.type === 'ROI/Major Benefit');
  const greatTags = tags.filter(tag => tag.type === 'Great For');

  return (
    <div className={s.tags}>
      <h3 className={s.title}>Tags</h3>
      <div className={`${s.hotelTags} ${s.tagTypeWrapper}`}>
        <h4 className={s.label}>Hotel Type</h4>
        {hotelTags.map((tag, index) => {
          return (
            <Field
              name={tag.name}
              component={RenderTag}
              type="checkbox"
              label={tag.name}
              tag={tag}
              onChangeAction={updateTags}
              propertyTags={propertyTags}
              propertyTagNames={propertyTagNames}
              key={`hotel-${index}`}
            />
          );
        })}
      </div>

      <div className={`${s.vibeTags} ${s.tagTypeWrapper}`}>
        <h4 className={s.label}>Vibe</h4>
        {vibeTags.map((tag, index) => {
          return (
            <Field
              name={tag.name}
              component={RenderTag}
              type="checkbox"
              label={tag.name}
              tag={tag}
              onChangeAction={updateTags}
              propertyTags={propertyTags}
              propertyTagNames={propertyTagNames}
              key={`vibe-${index}`}
            />
          );
        })}
      </div>

      <div className={`${s.periodTags} ${s.tagTypeWrapper}`}>
        <h4 className={s.label}>Period</h4>
        {periodTags.map((tag, index) => {
          return (
            <Field
              name={tag.name}
              component={RenderTag}
              type="checkbox"
              label={tag.name}
              tag={tag}
              onChangeAction={updateTags}
              propertyTags={propertyTags}
              propertyTagNames={propertyTagNames}
              key={`period-${index}`}
            />
          );
        })}
      </div>

      <div className={`${s.benefitTags} ${s.tagTypeWrapper}`}>
        <h4 className={s.label}>ROI/Benefit (Select one)</h4>
        {benefitTags.map((tag, index) => {
          return (
            <Field
              name={tag.name}
              component={RenderTag}
              type="checkbox"
              label={tag.name}
              tag={tag}
              onChangeAction={updateTags}
              propertyTags={propertyTags}
              propertyTagNames={propertyTagNames}
              key={`benefit-${index}`}
            />
          );
        })}
      </div>

      <div className={`${s.priceTags} ${s.tagTypeWrapper}`}>
        <h4 className={s.label}>Price</h4>
        {priceTags.map((tag, index) => {
          return (
            <Field
              name={tag.name}
              component={RenderTag}
              type="checkbox"
              label={tag.name}
              tag={tag}
              onChangeAction={updateTags}
              propertyTags={propertyTags}
              propertyTagNames={propertyTagNames}
              key={`price-${index}`}
            />
          );
        })}
      </div>

      <div className={`${s.greatTags} ${s.tagTypeWrapper}`}>
        <h4 className={s.label}>Great For</h4>
        {greatTags.map((tag, index) => {
          return (
            <Field
              name={tag.name}
              component={RenderTag}
              type="checkbox"
              label={tag.name}
              tag={tag}
              onChangeAction={updateTags}
              propertyTags={propertyTags}
              propertyTagNames={propertyTagNames}
              key={`great-${index}`}
            />
          );
        })}
      </div>

    </div>
  );
}

export default withStyles(s)(Tags);
