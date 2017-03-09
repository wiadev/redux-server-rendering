import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import timeSelect from '../../Common/Calendar/SelectWithSelected';
import prepareHoursSelect from '../../Common/Calendar/PrepareHoursSelect';
import { Modal } from 'react-bootstrap';
import s from './EditDetails.css';

const selector = formValueSelector('editDetails');
function mapStateToProps(state) {
  return {
    eventStartTime: selector(state, 'eventStartTime'),
    eventEndTime: selector(state, 'eventEndTime'),
    eventRoomId: selector(state, 'eventRoomId'),
    eventName: selector(state, 'eventName'),
  };
}

class EditDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.initOnShow = this.initOnShow.bind(this);
    this.onAllDayChange = this.onAllDayChange.bind(this);

    this.onTimeChange = this.onTimeChange.bind(this);
    this.onEventCreate = this.onEventCreate.bind(this);
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

  initOnShow() {
    const { formValues, change, } = this.props;
    change('eventRoomId', formValues.eventRoomId);
    document.getElementsByName('eventRoomId').value = formValues.eventRoomId;

    change('eventStartTime', formValues.eventStartTime);
    document.getElementById('eventStartTime').value = formValues.eventStartTime;

    change('eventEndTime', formValues.eventEndTime);
    document.getElementById('eventEndTime').value = formValues.eventEndTime;

    change('eventName', formValues.eventName);
    document.getElementsByName('eventName').value = formValues.eventName;
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

  onEventCreate (formValues) {

    /*prepare values to pass into api*/
    const { createEvent, close } = this.props;
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
      eventDate: this.props.formValues.eventDate,
      eventDescription: formValues.eventDescription,
    });
    close();
  }

  render() {
    const { error, handleSubmit, pristine, reset, submitting, formValues } = this.props;
    let rooms = [];
    this.props.rooms ? rooms = this.props.rooms.map((room, index) => {
      return (<option key={`room_${index}`} value={room.id}>{room.name}</option>);
    }) : [];
    const startTime = prepareHoursSelect();
    const endTime = prepareHoursSelect();

    return (
      <Modal show={this.props.show} onHide={this.props.close} onShow={this.initOnShow}>
        <a href="#" className={s.closeButton} onClick={this.props.close}/>
        <div className={`${s.formGroup} form-group row`}>
          <h1 className={s.formTitle}>Event Details</h1>

        </div>

        <form className={s.form} onSubmit={handleSubmit(this.onEventCreate)}>
          <div className={`${s.formGroup} form-group row`}>
            <div className="col-md-5">
              <label className={s.label} htmlFor="eventName">Name of Event</label>
            </div>
            <div className="col-md-7">
              <Field
                name="eventName"
                component="input"
                type="text"
                placeholder="i.e. Closed for Renovations"
                className={`${s.inputField} form-control`}
                id="eventName"
                required
              />
            </div>
          </div>

          <div className={`${s.formGroup} form-group row`}>
            <div className="col-md-5">
              <label className={s.label} htmlFor="eventDate">Date of Event</label>
            </div>
            <div className="col-md-7">
              <Field
                name="eventDate"
                id="eventDate"
                component="select"
                className={`${s.inputField} form-control`}
              >
                <option> </option>

              </Field>
            </div>
          </div>

          <div className={`${s.formGroup} form-group row`}>
            <div className="col-md-5">

            </div>
            <div className="col-md-7">
              <div className="checkbox">
                <label>
                  <input type="checkbox" id="allDay" onChange={this.onAllDayChange}/> All day
                </label>

              </div>
            </div>
          </div>

          <div className={`${s.formGroup} form-group row`}>
            <div className="col-md-5">
              <label className={s.label}>Set Start/End Time</label>
            </div>
            <div className="col-md-7">
              <div className="row">
                <div className="col-xs-6">

                  <Field
                    name="eventStartTime"
                    id="eventStartTime"
                    component={timeSelect}
                    className="form-control"
                    options={startTime}
                    onChangeAction={this.onTimeChange}
                  >
                  </Field>
                </div>
                <div className="col-xs-6">

                  <Field
                    name="eventEndTime"
                    id="eventEndTime"
                    component={timeSelect}
                    className="form-control"
                    options={endTime}
                    onChangeAction={this.onTimeChange}
                  >
                  </Field>

                </div>
              </div>
            </div>
          </div>

          <div className={`${s.formGroup} form-group row`}>
            <div className="col-md-5">
              <label className={s.label} htmlFor="eventRepeat">Does this event repeat?</label>
            </div>
            <div className="col-md-7">
              <Field
                name="eventRepeat"
                id="eventRepeat"
                component="select"
                className={`${s.inputField} form-control`}
              >
                <option />
                <option>Yes</option>
                <option>No</option>
              </Field>
            </div>
          </div>

          <div className={`${s.formGroup} form-group row`}>
            <div className="col-md-5">
              <label className={s.label} htmlFor="eventEnd">Does it end?</label>
            </div>
            <div className="col-md-7">
              <Field
                name="eventEnd"
                id="eventEnd"
                component="select"
                className={`${s.inputField} form-control`}
              >
                <option />
                <option>Yes</option>
                <option>No</option>
              </Field>
            </div>
          </div>

          <div className={`${s.formGroup} form-group row`}>
            <div className="col-md-5">
              <label className={s.label} htmlFor="eventRooms">Which rooms?</label>
            </div>
            <div className="col-md-7">
              <Field
                name="eventRoomId"
                id="eventRoomId"
                component="select"
                className={`${s.inputField} form-control`}
              >
                {rooms}
              </Field>
            </div>
          </div>

          <div className={`${s.formGroup} form-group row`}>

            <div className="col-xs-12">
              <Field
                name="eventDescription"
                component="input"
                type="text"
                placeholder="Add any additional comments/notes"
                className={`${s.inputField} form-control`}
                id="eventDescription"
              />
            </div>
          </div>
          <button className={s.button} type="submit">Submit</button>

        </form>
      </Modal>
    );
  }
}

EditDetails.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  submitForm: PropTypes.func,
};

EditDetails = reduxForm({
  form: 'editDetails',
})(EditDetails);

EditDetails = connect(mapStateToProps)(EditDetails);
export default withStyles(s)(EditDetails);

