import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RenderTag.css';

function RenderTag({ input, tag, onChangeAction, propertyTags, propertyTagNames, init, label }) {
  const { value, checked } = input;
  const currentIndex = propertyTagNames.indexOf(tag.name);
  if(currentIndex >= 0) {
    input.checked = true;
  }
  return (
    <label className={`${s.label} ${input.checked ? s.checked : ''} col-md-3`}>
      <span className={s.checkbox}>
        <input
          {...input}
          name={tag.name}
          type="checkbox"
          className={s.formControl}
          onChange={event => {
            onChangeAction({
              propertyTag: propertyTags[currentIndex],
              checked: event.target.checked,
              tag,
            });
            !event.target.checked ? propertyTagNames.splice(currentIndex, 1) : propertyTagNames.push(tag.name);
            input.onChange(event);
            console.log(event);
          }}
        />
        <span className={s.checkMark} />
      </span>
      {label || input.value}
    </label>
  );
}

export default withStyles(s)(RenderTag);
