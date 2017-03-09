import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Field } from 'redux-form';
import s from './GreatFor.css';
import styles from './Editorial.css';
import RenderCheckbox from '../../Common/RenderCheckbox';

function GreatFor() {
  return (
    <div>
      <h3 className="sectionTitle">Great for</h3>
      <div className="col-md-3">
        <Field
          name="boardMeeting"
          type="checkbox"
          component={RenderCheckbox}
          label="Board meeting"
        />
        <Field
          name="teamOffsite"
          type="checkbox"
          component={RenderCheckbox}
          label="Team offsite"
        />
        <Field
          name="roadshow"
          type="checkbox"
          component={RenderCheckbox}
          label="Roadshow"
        />
        <Field
          name="inspiring"
          type="checkbox"
          component={RenderCheckbox}
          label="Inspiring"
        />
        <Field
          name="education"
          type="checkbox"
          component={RenderCheckbox}
          label="Education"
        />
        <Field
          name="clientEntertaining"
          type="checkbox"
          component={RenderCheckbox}
          label="Client Entertaining"
        />
      </div>
      <div className="col-md-3">
        <Field
          name="breakfastSession"
          type="checkbox"
          component={RenderCheckbox}
          label="Breakfast Session"
        />
        <Field
          name="businessLunch"
          type="checkbox"
          component={RenderCheckbox}
          label="Business Lunch"
        />
        <Field
          name="boardDinner"
          type="checkbox"
          component={RenderCheckbox}
          label="Board Dinner"
        />
        <Field
          name="AVPresentation"
          type="checkbox"
          component={RenderCheckbox}
          label="A/V presentation"
        />
        <Field
          name="brainstorming"
          type="checkbox"
          component={RenderCheckbox}
          label="Brainstorming"
        />
        <Field
          name="creativity"
          type="checkbox"
          component={RenderCheckbox}
          label="Creativity"
        />
      </div>
      <div className="col-md-3">
        <Field
          name="clientMeeting"
          type="checkbox"
          component={RenderCheckbox}
          label="Client Meeting"
        />
        <Field
          name="teleconferencing"
          type="checkbox"
          component={RenderCheckbox}
          label="Teleconferencing"
        />
        <Field
          name="videoConferencing"
          type="checkbox"
          component={RenderCheckbox}
          label="VideoConferencing"
        />
        <Field
          name="podcasting"
          type="checkbox"
          component={RenderCheckbox}
          label="Podcasting"
        />
        <Field
          name="interviews"
          type="checkbox"
          component={RenderCheckbox}
          label="Interviews"
        />
        <Field
          name="teamBuilding"
          type="checkbox"
          component={RenderCheckbox}
          label="Team-building"
        />
      </div>
      <div className="col-md-3">
        <Field
          name="trainingSessions"
          type="checkbox"
          component={RenderCheckbox}
          label="Training sessions"
        />
        <Field
          name="roundtables"
          type="checkbox"
          component={RenderCheckbox}
          label="Roundtables"
        />
        <Field
          name="privateDining"
          type="checkbox"
          component={RenderCheckbox}
          label="Private dining"
        />
        <Field
          name="soloWork"
          type="checkbox"
          component={RenderCheckbox}
          label="Solo work"
        />
        <Field
          name="relaxedConversations"
          type="checkbox"
          component={RenderCheckbox}
          label="Relaxed conversations"
        />
      </div>
    </div>
  );
}

export default withStyles(s)(GreatFor);
