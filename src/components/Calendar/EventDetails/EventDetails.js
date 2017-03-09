import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EventDetails.css';
function EventDetails({ corner, formSize, contactEvent, eventDetails, closeEvent }) {

  const eventContent = eventDetails.attributes ? (
    <div className={s.eventHolder}>
      <div className={s.eventRow}>
        <button type="button" className="btn btn-default" onClick={contactEvent}>
          Contact
        </button>
        <div className={s.eventName}>{eventDetails.eventName}</div>
        <p>{eventDetails.eventDescription}</p>
      </div>
      <div className={s.eventRow}>
        <ul className={s.eventTable}>
          <li>
            <div className={s.eventRoomIcon}/>
          </li>
          <li>{eventDetails.roomName}</li>
          <li>
            <div className={s.eventUsersIcon}/>
          </li>
          <li>10</li>
        </ul>
      </div>
      <div className={s.eventRow}>
        <button type="submit" className="btn btn-success">View Details</button>
      </div>
    </div>
  ) : (<div className={s.eventLoading}>loading</div>);

  return (
    <div className={`${s.holder} ${s[corner]}`} style={{ left: formSize.left + 'px', top: formSize.top + 'px' }}>
      <a href="#" className={s.cls} onClick={closeEvent}/>
      <div className={s.caption}>{eventDetails.caption}</div>
      {eventContent}
    </div>
  );
}

export default withStyles(s)(EventDetails);
