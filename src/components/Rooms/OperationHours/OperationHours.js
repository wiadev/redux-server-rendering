import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import debounce from '../../Common/debounce';

import s from './OperationHours.css';

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const API_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const OPEN_HOUR = 6;
const END_HOUR = 23;

function mapDispatchToProps(dispatch) {
  return {
  };
}

function mapStateToProps({ room }) {
  return {
    room,
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class OperationHoursInfo extends React.Component {

  constructor(props) {
    super(props);
    this.updateOperationHours = debounce(this.updateOperationHours.bind(this), 2000);
    this.convertStringHoursToObojects = this.convertStringHoursToObojects.bind(this);
    const operationTimePolicy = props.room.policy.find(item => item.name === 'operation_times');
    this.state = ({
      isSelecting: false,
      startedSlot: 0,
      savedRoomHours: operationTimePolicy.value,
      changedRoomHours: null,
      operationHours: this.convertStringHoursToObojects(),
      mappingId: operationTimePolicy.mapping_id,
    });
    console.log(this.state);
  }

  // key down event
  onSelectFirstSlot = (dayIndex, hourIndex) => {
    const slots = this.state.operationHours.slice(0);
    slots[dayIndex].openTime = OPEN_HOUR + hourIndex;
    slots[dayIndex].closeTime = 0;
    this.setState({
      isSelecting: true,
      startedSlot: OPEN_HOUR + hourIndex,
      operationHours: slots,
    });
  }

  // fires on hover
  onSelectSlots = (dayIndex, hourIndex) => {
    const { isSelecting, startedSlot } = this.state;
    if (isSelecting) {
      const slots = this.state.operationHours.slice(0);
      const currentTime = OPEN_HOUR + hourIndex;

      if ((slots[dayIndex].openTime !== 0) && (slots[dayIndex].closeTime !== OPEN_HOUR + hourIndex)) {
        if (currentTime > startedSlot) {
          slots[dayIndex].closeTime = currentTime;
        } else {
          slots[dayIndex].openTime = currentTime;
          slots[dayIndex].closeTime = startedSlot;
        }

        this.setState({ operationHours: slots });
      }
    }
  }

  // fires on MouseUp event, when user finished selecting blocks
  onSelectLastSlot = (dayIndex, hourIndex) => {
    const { startedSlot } = this.state;
    const slots = this.state.operationHours.slice(0);
    const currentTime = OPEN_HOUR + hourIndex;

    if ((slots[dayIndex].openTime !== 0) && (slots[dayIndex].closeTime !== OPEN_HOUR + hourIndex)) {
      if (currentTime > startedSlot) {
        slots[dayIndex].closeTime = currentTime;
      } else {
        slots[dayIndex].openTime = currentTime;
        slots[dayIndex].closeTime = startedSlot;
      }

      this.setState({ operationHours: slots });
    }

    this.setState({
      startedSlot: 0,
      isSelecting: false,
    });

    this.updateOperationHours();
  }

  // generate day cells
  getDayRow = (currentDay, dayIndex) => {
    const { operationHours } = this.state;
    const hourCells = [];
    for (let i = OPEN_HOUR; i <= END_HOUR; i += 1) {
      if (dayIndex < 8 && (i >= operationHours[dayIndex].openTime && i <= operationHours[dayIndex].closeTime)) {
        hourCells.push(
          <div>
            <div className={s.placeholder} />
            <div className={`${s.day} ${s.open}`} />
          </div>
        );
      } else if (dayIndex === 8) {
        hourCells.push(
          <div>
            <div className={s.placeholder} />
            <div className={`${s.day} ${s.open}`} />
          </div>
        );
      } else {
        hourCells.push(
          <div>
            <div className={s.placeholder} />
            <div className={`${s.day} ${s.closed}`} />
          </div>
        );
      }
    }

    const dayRow = (<tr className={s.dayRow} key={dayIndex}>
      <td className={s.dayCell}>{currentDay}</td>
      {
        hourCells.map((hour, hourIndex) =>
          <td
            className={s.hourCell} key={hourIndex}
            onMouseDown={() => this.onSelectFirstSlot(dayIndex, hourIndex)}
            onMouseUp={() => this.onSelectLastSlot(dayIndex, hourIndex)}
            onMouseMove={() => this.onSelectSlots(dayIndex, hourIndex)}
          >
            {hour}
          </td>
        )
      }
    </tr>);
    return dayRow;
  }

  getTimeRow = () => {
    const hourLabels = [];
    for (let hour = OPEN_HOUR; hour <= END_HOUR; hour += 1) {
      let formattedHour = '';
      if (hour < 12) {
        formattedHour = `${hour}am`;
      } else if (hour === 12) {
        formattedHour = `${hour}pm`;
      } else {
        formattedHour = `${hour - 12}pm`;
      }

      hourLabels.push(
        <div>
          <div className={s.placeholder} />
          <div className={s.day}>{formattedHour}</div>
        </div>
      );
    }

    const timeRow = (<tr className={s.dayRow}>
      <td className={s.dayCell} />
      {
        hourLabels.map((hour, index) =>
          <td className={s.hourCell} key={index}>{hour}</td>
        )
      }
    </tr>);

    return timeRow;
  }

  stringToHour = (stringToSplit) => {
    const arrayOfStrings = stringToSplit.split(':');
    return parseInt(arrayOfStrings[0], 10);
  }

  updateOperationHours = () => {
    let hours = '';
    this.state.operationHours.map((slot, index) => {
      hours += `${API_DAYS[index]}-${slot.openTime}:00-${slot.closeTime}:00;`;
    });

    /**
      Save new data to API
    */
    this.props.updateHours({
      value: hours,
      units: null,
    }, this.state.mappingId);
  }

  convertStringHoursToObojects() {
    const savedRoomHours = this.props.room.policy.find(item => item.name === 'operation_times').value;
    const arr = savedRoomHours.split(';').slice(0, -1);
    const hours = [];
    arr.map((a, i) => {
      hours.push({
        openTime: this.stringToHour(a.split('-')[1]),
        closeTime: this.stringToHour(a.split('-')[2]),
      });
    });

    return hours;
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <p>
          User the sliders below to set the daily open and close times for this room.
          Need to add a specific hotel-booked event or block off a defined period?
          <span><a href="">Add it to your Calendar.</a></span>
        </p>
        <div className={s.calendar}>
          <table className={s.calendarTable}>
            <thead>
              {
                this.getTimeRow()
              }
            </thead>
            <tbody>
              {
                DAYS.map((day, index) =>
                  this.getDayRow(day, index)
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

OperationHoursInfo.propTypes = {
  room: React.PropTypes.object,
};

export default withStyles(s)(OperationHoursInfo);
