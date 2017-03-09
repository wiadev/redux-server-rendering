import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import timeSelect from '../../Common/Calendar/SelectWithSelected';
import prepareHoursSelect from '../../Common/Calendar/PrepareHoursSelect';
import s from './EventForm.css';

const selector = formValueSelector('eventForm');

function mapStateToProps(state) {

  return {
    eventStartTime: selector(state, 'eventStartTime'),
    eventEndTime: selector(state, 'eventEndTime'),
    eventRoomId: selector(state, 'eventRoomId'),
    eventName: selector(state, 'eventName'),
  };
}

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    const { slotInfo } = props;
    this.state = {
      eventStartTime: 'h_' + ((slotInfo.start.getMinutes() < 59) ? slotInfo.start.getHours() + (slotInfo.start.getMinutes() > 0 ? 0.5 : 0) : 24),
      eventEndTime: 'h_' + ((slotInfo.end.getMinutes() < 59) ? slotInfo.end.getHours() + (slotInfo.end.getMinutes() > 0 ? 0.5 : 0) : 24),
      eventDate:  slotInfo.start.getFullYear() + '-' + (slotInfo.start.getMonth() + 1 < 10 ? '0' + (slotInfo.start.getMonth() + 1) : slotInfo.start.getMonth() + 1) + '-' + (slotInfo.start.getDate() < 10 ? '0' + slotInfo.start.getDate() : slotInfo.start.getDate()),
    };

    this.onTimeChange = this.onTimeChange.bind(this);
    this.onEventCreate = this.onEventCreate.bind(this);
    this.onAllDayChange = this.onAllDayChange.bind(this);
    this.onEditEvent = this.onEditEvent.bind(this);
  }

  componentDidMount() {
    this.props.change('eventStartTime', this.state.eventStartTime);
    this.props.change('eventEndTime', this.state.eventEndTime);
    this.props.change('eventRoomId', this.props.rooms[0].id);
  }

  onTimeChange (field, selectName) {
    /*validate selects to eventStartTime must be less then eventEndTime*/

    let eventStartTime = parseFloat(this.props.eventStartTime.match(/[+-]?\d+(\.\d+)?/g)[0]);
    let eventEndTime = parseFloat(this.props.eventEndTime.match(/[+-]?\d+(\.\d+)?/g)[0]);

    if (selectName == 'eventStartTime' && eventStartTime >= eventEndTime) {
      eventEndTime = eventStartTime + 0.5 > 24 ? 24 : eventStartTime + 0.5;
      document.getElementById('eventEndTime').value = 'h_' + eventEndTime;
      this.props.change('eventEndTime', 'h_' + eventEndTime);
    } else if (selectName == 'eventEndTime' && eventStartTime >= eventEndTime) {
      eventStartTime = eventEndTime - 0.5 < 0 ? 0 : eventEndTime - 0.5;
      document.getElementById('eventStartTime').value = 'h_' + eventStartTime;
      this.props.change('eventStartTime', 'h_' + eventStartTime);
    }

    document.getElementById('allDay').checked = false;
  }

  onAllDayChange (event) {
    if (event.target.checked) {
      document.getElementById('eventStartTime').value = 'h_0';
      document.getElementById('eventEndTime').value = 'h_24';
      /*should do it because changing selectedIndex do not change value in redux-form*/
      this.props.change('eventStartTime', 'h_0');
      this.props.change('eventEndTime', 'h_24');
    }
  }

  onEventCreate (formValues) {

    /*prepare values to pass into api*/
    const { createEvent, closeEvent } = this.props;
    let eventStartTime =  parseFloat(formValues.eventStartTime.match(/[+-]?\d+(\.\d+)?/g)[0]);
    let eventEndTime =  parseFloat(formValues.eventEndTime.match(/[+-]?\d+(\.\d+)?/g)[0]);
    let duration = (eventEndTime -  eventStartTime) * 60;

    let eventStartTimeParts = eventStartTime.toString().split('.');
    eventStartTimeParts[0] = parseInt(eventStartTimeParts[0]);

    if (eventStartTimeParts[0] < 10) {
      eventStartTimeParts[0] = '0' + eventStartTimeParts[0];
    }

    eventStartTimeParts[1] = parseInt(eventStartTimeParts[1]);

    if (eventStartTimeParts[1] > 0) {
      eventStartTimeParts[1] = '30';
    } else {
      eventStartTimeParts[1] = '00';
    }

    eventStartTime = eventStartTimeParts.join(':');
    if (eventStartTime == '24:00') {
      eventStartTime = '23:59';
    }

    createEvent({
      eventStartTime: eventStartTime,
      eventDuration: parseInt(duration),
      eventName: formValues.eventName,
      eventRoomId: parseInt(formValues.eventRoomId),
      eventDate: this.state.eventDate,
      eventDescription: '',
    });
    closeEvent();
  }

  onEditEvent () {
    const { eventStartTime, eventEndTime, eventRoomId, eventName, editEvent, closeEvent }  = this.props;
    editEvent({ eventStartTime: eventStartTime, eventEndTime: eventEndTime, eventName: eventName ? eventName : '', eventRoomId: eventRoomId,  eventDate: this.state.eventDate });
    closeEvent();
  }

  render() {
    const { corner, formSize, rooms, closeEvent, handleSubmit } = this.props;

    let roomsList = [];
    const startTime = prepareHoursSelect();
    const endTime = prepareHoursSelect();

    rooms ? roomsList = rooms.map((room, index) => {
      return (<option key={`room_${index}`} value={room.id}>{room.name}</option>);
    }) : [];

    return (
      <div className={`${s.holder} ${s[corner]}`} style={{ left: formSize.left + 'px', top: formSize.top + 'px' }}>
        <form onSubmit={handleSubmit(this.onEventCreate)}>
          <a href="#" className={s.cls} onClick={closeEvent}/>
          <div className={s.caption}>New Event</div>
          <div className="row">
            <div className="col-xs-12">
              <div className="form-group">
                <Field
                  name="eventName"
                  component="input"
                  type="text"
                  placeholder="i.e. Closed for Renovations"
                  className="form-control"
                  id="eventName"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <div className="form-group">
                <Field
                  name="eventStartTime"
                  id="eventStartTime"
                  component={timeSelect}
                  className="form-control"
                  defaultValue={this.state.eventStartTime}
                  options={startTime}
                  onChangeAction={this.onTimeChange}
                >
                </Field>
              </div>
            </div>
            <div className="col-xs-6">
              <div className="form-group">
                <Field
                  name="eventEndTime"
                  id="eventEndTime"
                  component={timeSelect}
                  className="form-control"
                  defaultValue={this.state.eventEndTime}
                  options={endTime}
                  onChangeAction={this.onTimeChange}
                >
                </Field>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="checkbox">
                <label>
                  <input type="checkbox" id="allDay" onChange={this.onAllDayChange}/> All day
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <div className="form-group">
                <Field
                  name="eventRoomId"
                  id="eventRooms"
                  component="select"
                  className="form-control"
                  required
                >
                  {roomsList}
                </Field>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-6">
              <button type="button" className="btn btn-default" onClick={this.onEditEvent}>
                Edit Details
              </button>
            </div>
            <div className="col-xs-6">
              <button type="submit" className="btn btn-success">Create</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

EventForm.propTypes = {
  corner: PropTypes.string,
  formSize: PropTypes.object,
  slotInfo: PropTypes.object,
  rooms: PropTypes.array,
  closeEvent: PropTypes.func,
  editEvent: PropTypes.func,
};

EventForm = reduxForm({
  form: 'eventForm',
})(EventForm);

EventForm = connect(mapStateToProps)(EventForm);
export default withStyles(s)(EventForm);
