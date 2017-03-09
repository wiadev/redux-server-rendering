import React from 'react';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CustomToolbar.css';

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.date.setDate(toolbar.date.getDate() - 7);
    toolbar.onNavigate('prev');
  };

  const goToNext = () => {
    toolbar.date.setDate(toolbar.date.getDate() + 7);
    toolbar.onNavigate('next');
  };

  const goToCurrent = () => {
    const now = new Date();
    toolbar.date.setMonth(now.getMonth());
    toolbar.date.setYear(now.getFullYear());
    toolbar.onNavigate('current');
  };

  const label = () => {
    const date = moment(toolbar.date);
    console.log(toolbar);
    return (
      <span>{toolbar.label}</span>
    );
  };

  return (
    <div className={s.toolbarContainer}>
      <label className={s.labelDate}>{label()}</label>
      <button className={s.backButton} onClick={goToBack}>&#8249;</button>
      <button className={s.buttonNext} onClick={goToNext}>&#8250;</button>
    </div >
  );
};

export default withStyles(s)(CustomToolbar);
