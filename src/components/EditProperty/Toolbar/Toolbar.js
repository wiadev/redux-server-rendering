import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Toolbar.css';

function OnboardingToolbar({ property, onExpandPanels, isExpanded }) {
  return (
    <div className={s.root}>
      <div className={s.toolBar}>
        <div className="container">
          <div className={s.propInfo}>
            <div className={s.item}>
              <span className={s.label}>Current Status</span> Not published
            </div>
            <div className={s.item}>
              <span className={s.label}>Completed</span> 0%
            </div>
          </div>

          <div className={`${s.actions} pull-right`}>
            <div className={s.item}>
              <span className={s.panelControl} onClick={onExpandPanels}>{isExpanded ? 'Collapse Panels' : 'Expand Panels'}</span>
            </div>
            <div className={`${s.item} ${s.viewTips}`}>
              <span className={s.tips}>View Help Tips</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(s)(OnboardingToolbar);
