import React, { Children, PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BigCalendar from 'react-big-calendar';
import DayPicker, {DateUtils} from 'react-day-picker';
import moment from 'moment';
import Header from '../../Header';
import Footer from '../../Footer';
import Link from '../../Link';
import EventForm from '../EventForm';
import EditDetails from  '../EditDetails';
import EventDetails from  '../EventDetails';

import { getProperty, setSelectedDay} from '../../../actions/properties/getSingleProperty';
import { getUserRequest } from '../../../actions/user';
import { createProperty } from '../../../actions/properties/createProperty';
import { getPropertyEventsFetch } from '../../../actions/events/getPropertyEvents';
import { getEventDetails } from '../../../actions/events/getEventDetails';
import { createPropertyEvent } from '../../../actions/events/createPropertyEvent';

import CustomToolbar from './CustomToolbar';

import history from '../../../core/history';
import s from './CalendarContainer.css';

BigCalendar.momentLocalizer(moment);

// TODO: Pass new subtitle based on current route
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getProperty,
      getUserRequest,
      createProperty,
      getPropertyEventsFetch,
      setSelectedDay,
      getEventDetails,
      createPropertyEvent,
    }, dispatch),
  };
}

function mapStateToProps({user, newProperty, form, userProperties, singleProperty, propertyEvents, getEventDetails}) {
  return {
    user,
    newProperty,
    form,
    userProperties,
    singleProperty,
    propertyEvents,
    getEventDetails,
  };
}

@connect(mapStateToProps, mapDispatchToProps)

class CalendarContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: props.newPropertyForm,
      showEventForm: false,
      showEditDetails: false,
      corner: "left",
      formSize: {},
      mouseDown: {},
      showEventDetails: false,
      slotInfo:{},
      formValues:{},
    };
    this.createNewProperty = this.createNewProperty.bind(this);
    this.handleSelectSlot = this.handleSelectSlot.bind(this);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
    this.closeEventForm = this.closeEventForm.bind(this);
    this.closeEventDetails = this.closeEventDetails.bind(this);
    this.launchEditDetails = this.launchEditDetails.bind(this);
    this.launchEventDetails = this.launchEventDetails.bind(this);
    this.launchEventContact = this.launchEventContact.bind(this);
    this.roomToggle = this.roomToggle.bind(this);
    this.onMousedown = this.onMousedown.bind(this);
    this.createPropertyEvent = this.createPropertyEvent.bind(this);
    this.propertyId = props.propertyId;
  }

  componentDidMount() {
    this.props.actions.getProperty(this.propertyId).then(() => {
      this.setState({
        singleProperty: this.props.singleProperty.data,
        rooms: this.props.singleProperty.rooms,
      });
    });

    this.props.actions.getPropertyEventsFetch(this.propertyId);
    const body = document.getElementsByTagName('body')[0];
    body.addEventListener('mousedown', this.onMousedown, false);
  }

  launchModal() {
    this.setState({showModal: true});
    history.push('/properties/new', {state: 'newProperty'});
  }

  hideModal() {
    this.setState({showModal: false});
    history.push('/properties', {state: 'properties'});
  }

  createNewProperty(event) {
    if(event) {
      event.preventDefault();
    }
    this.props.actions.createProperty(this.props.form.newProperty.values);
    this.setState({
      showModal: false,
    });
  }

  //store click coordinates for popup position
  onMousedown (event) {
    this.setState({
      mouseDown: {left: event.pageX, top:event.pageY}
    });
  }

  //show popup for event details
  handleSelectEvent(eventInfo) {

    this.props.actions.getEventDetails(eventInfo.id, eventInfo.room);

    const popupPosition = this.getPopupPosition(true);
    this.setState({
      showEditDetails: false,
      showEventForm:false,
      showEventDetails:true,
      corner: popupPosition.corner,
      formSize: popupPosition.formSize,
    });
  }

  // show popup for new event
  handleSelectSlot(slotInfo) {
    const popupPosition = this.getPopupPosition(false);
    this.setState({
      showEventForm: true,
      corner: popupPosition.corner,
      formSize: popupPosition.formSize,
      slotInfo: slotInfo,
    });
  }

  // calendar popup window position calculation
  getPopupPosition(click) {

    const selection = document.getElementsByClassName('rbc-slot-selection')[0];
    const selectionSize= selection ? selection.getBoundingClientRect() : null;
    const calendar =  document.getElementsByClassName('rbc-calendar')[0];
    const calendarSize = calendar ? calendar.getBoundingClientRect() : null;
    let  centerPoint = {};

    if ( calendarSize == null) {
      return false;
    }

    if (selectionSize == null || click) {
      centerPoint = {
        left: this.state.mouseDown.left - document.body.scrollLeft,
        top: this.state.mouseDown.top - document.body.scrollTop
      };
    }
    else {
      centerPoint = {
        left: selectionSize.left + selectionSize.width / 2,
        top: selectionSize.top + selectionSize.height / 2
      };
    }
    let formSize = { width:310, height:300, left: centerPoint.left - calendarSize.left + 30, top: centerPoint.top - calendarSize.top - 150};
    let corner = "left";

    formSize.left = centerPoint.left - calendarSize.left + 30;
    formSize.top = centerPoint.top - calendarSize.top - formSize.height/2;

    if (centerPoint.left + formSize.width > calendarSize.right)
    {
      corner = "right";
      formSize.left = centerPoint.left-formSize.width  - calendarSize.left;
    }

    if (formSize.top + formSize.height + calendarSize.top> calendarSize.bottom ) {
      formSize.top = calendarSize.bottom - formSize.height - calendarSize.top;
    }

    return {corner:corner,formSize:formSize};
  }

  handleNavigation(date1, date2) {
    console.log(date1, date2);
    this.props.actions.setSelectedDay(date1.toDateString());
  }

  handleDayClick( e, day, { selected, disabled } ) {
    if (disabled) {
      return;
    }
    this.props.actions.setSelectedDay(day.toDateString());
  }

  getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0, 0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 1));
    // Get first day of year
    let yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    return Math.ceil(( ( (d - yearStart) / 86400000) + 1) / 7);
  }

  launchEditDetails(formValues) {
    this.setState({
      showEditDetails: true,
      formValues: formValues,
    });
  }

  hideEditDetails(event) {
    if (event&&typeof event.preventDefault == "function") {
      event.preventDefault();
    }
    this.setState({
      showEditDetails: false,
    });
  }

  closeEventForm(event) {
    if(event) {
      event.preventDefault();
    }
    this.setState({
      showEventForm: false,
    });
  }

  closeEventDetails(event) {
    event.preventDefault();
    this.setState({
      showEventDetails: false,
    });
    this.props.actions.getEventDetails(0);
  }

  launchEventDetails() {

  }

  launchEventContact() {

  }


// get room name and show by id - for event details popup and filter
  getRoomNameById(roomId)
  {
    for (let i in this.state.rooms)
    {
      const room = this.state.rooms[i];
        if(room.id == roomId.toString())
        return { name: room.name, show: (room.show == undefined || room.show), index: i };
    }
   return { name:"", show: true, index: -1};
  }

//toggle room to show/hide events in calendar
  roomToggle (event) {
    event.preventDefault();
    const rooms = this.state.rooms.slice(0);
    const roomId = event.target.id.replace ( /[^\d.]/g, '' );

    rooms[roomId].show =  !(rooms[roomId].show == undefined || rooms[roomId].show);
    this.setState({
      rooms: rooms,
    });
  }

  createPropertyEvent (formValues) {
    this.props.actions.createPropertyEvent(formValues);
  }

  checkSlotConnections(slot, index)
  {
    let connections = 0;
    let item = {};
    let checkItem = slot[index];
    let position = 0;

    for (let i=0; i < slot.length; i++) {
      item=slot[i];
      if (slot[i].id!=checkItem.id && (Math.max(checkItem.eventEndTime, item.eventEndTime) - Math.min(checkItem.eventStartTime, item.eventStartTime) < (checkItem.eventEndTime - checkItem.eventStartTime) + (item.eventEndTime - item.eventStartTime)))
      {
        connections++;
      }
    }

    for (let i=0; i < slot.length; i++) {
      item=slot[i];
      if (slot[i].id==checkItem.id || (Math.max(checkItem.eventEndTime, item.eventEndTime) - Math.min(checkItem.eventStartTime, item.eventStartTime) < (checkItem.eventEndTime - checkItem.eventStartTime) + (item.eventEndTime - item.eventStartTime)))
      {
        item.connections = Math.max(item.connections, connections);
        item.position = item.position? Math.max(item.position, position): position;
        position ++;
      }
    }
    return slot;
  }

  setConnections (startTimeCounter) {

    for (let i in startTimeCounter)
    {
        for (let j=0; j< startTimeCounter[i].length; j++)
        {
          startTimeCounter[i] = this.checkSlotConnections(startTimeCounter[i], j)
        }
    }
    return startTimeCounter;
  }

  getEventIndex(slot, id)
  {
    for (let i in slot)
    {
      if (slot[i].id == id) {
        return { connections: slot[i].connections, position: slot[i].position }
      }
    }
  }

  render() {
    const { properties } = this.props.userProperties;
    const keysToFilters = ['id', 'attributes.display_name'];
    const events = [];
    let rooms = [];
    const selectedDay = new Date(this.props.singleProperty.selectedDay);
    const eventDetails = Object.assign({}, this.props.getEventDetails.eventDetails);
    let roomNameAndShow = {name:"", show: true};
    let startTimeCounter = {};
    if (eventDetails.attributes && eventDetails.attributes.room_id) {
      roomNameAndShow = this.getRoomNameById(eventDetails.attributes.room_id);
      eventDetails.caption = "Event details";
      eventDetails.roomName = roomNameAndShow.name;
      eventDetails.eventName = eventDetails.attributes.name;
      eventDetails.eventDescription = eventDetails.attributes.description;
    } else if (eventDetails.attributes && eventDetails.attributes.reservation) {
      eventDetails.caption = "Reservation details";
      eventDetails.roomName = eventDetails.attributes.name;
      eventDetails.eventName = "Reservation";
      eventDetails.eventDescription = "";
    }


    this.props.propertyEvents.events ? this.props.propertyEvents.events.map((event) => {
        const attr = event.attributes;
        const eventStart = new Date(attr.start.date);
        const eventEnd = new Date(attr.end.date);
        const eventDate = eventStart.getFullYear() + ''+ (eventStart.getMonth() + 1 < 10 ? '0' + (eventStart.getMonth() + 1) : eventStart.getMonth() + 1) + '' +  (eventStart.getDate() < 10 ? '0' + eventStart.getDate() : eventStart.getDate());
        const eventStartTime = ((eventStart.getMinutes() < 59) ? eventStart.getHours() + (eventStart.getMinutes() > 0 ? 0.5 : 0) : 24);
        const eventEndTime = ((eventEnd.getMinutes() < 59) ? eventEnd.getHours() + (eventEnd.getMinutes() > 0 ? 0.5 : 0) : 24);
        const roomIndexAndShow = this.getRoomNameById(attr.room.id);
        if (roomIndexAndShow.show) {
          if (startTimeCounter[eventDate] == undefined) {
            startTimeCounter[eventDate] = [];
          }
          startTimeCounter[eventDate].push({
            id: event.id,
            eventStartTime: eventStartTime,
            eventEndTime: eventEndTime,
            connections: 0
          });
        }
      }) : null;

    startTimeCounter = this.setConnections(startTimeCounter);

    this.props.propertyEvents.events ? this.props.propertyEvents.events.map((event) => {

      let calendarEvents = {};
      const attr = event.attributes;
      const roomIndexAndShow = this.getRoomNameById(attr.room.id);
      let className = '';

      calendarEvents.title = attr.event.name?attr.event.name:'';
      calendarEvents.desc = attr.event.description?attr.event.description:'';
      calendarEvents.start = new Date(attr.start.date);
      calendarEvents.end = new Date(attr.end.date);
      calendarEvents.id = attr.event.id;
      calendarEvents.roomIndex = roomIndexAndShow.index;
      calendarEvents.hexColor = "#ff0000";
      calendarEvents.room =  attr.reservation ? attr.room : null;

      const eventDate = calendarEvents.start.getFullYear() + ''+ (calendarEvents.start.getMonth() + 1 < 10 ? '0' + (calendarEvents.start.getMonth() + 1) : calendarEvents.start.getMonth() + 1) +''+  (calendarEvents.start.getDate() < 10 ? '0' + calendarEvents.start.getDate() : calendarEvents.start.getDate());
      const eventBox = this.getEventIndex(startTimeCounter[eventDate], event.id);
      if (eventBox) {
        className = "id_" + event.id + ' boxWidth_' + eventBox.connections + ' boxNum_' + eventBox.position;
      }
      calendarEvents.className = className;

      if (roomIndexAndShow.show) {
        events.push(calendarEvents);
      }
    }) : null;

    this.state.rooms ? rooms = this.state.rooms.map((room, index) => {
      let colorIndex = room.show==false ? "" : index;
      return (<li key={`room_${index}`} className={s["sidebarRoomColor_" + colorIndex]}><a href="#" id={`room_${index}`}  onClick={this.roomToggle}><span />{room.name}</a></li>)
    }) : [];

    const modifiers = {
      week: day => this.getWeekNumber(selectedDay) == this.getWeekNumber(day),
    };

    let subheaderTitle = (this.state.singleProperty ? this.state.singleProperty.attributes.display_name + " — " : "") + "Calendar";

    return (
      <div>
        <Header
          user={this.props.user}
          subheader="calendarview"
          property={this.state.singleProperty}
          buttonAction={this.launchEditDetails}
          subheaderTitle={subheaderTitle}
        />
        <EditDetails
          rooms={this.state.rooms}
          show={this.state.showEditDetails}
          close={this.hideEditDetails.bind(this)}
          formValues={this.state.formValues}
          createEvent={this.createPropertyEvent}
        />
        <div className={s.navigationBar}>
          {
            /**
             * this is a plceholder for calendar's toolbar
             * it is rendered from calendar view
             * with position absolute, top: -65px
             */
          }
        </div>

        <div className={`${s.applicationContainer} clearfix`}>

          <div className={`${s.sidebar} col-md-2`}>
            <div className={s.sidebarChapter}>
              View Rooms
            </div>
            <ul className={s.sidebarRooms}>
              {rooms}
            </ul>
            <hr />
            <DayPicker
              fixedWeeks
              initialMonth={selectedDay}
              modifiers={ modifiers }
              selectedDays={ day => DateUtils.isSameDay(selectedDay, day) }
              onDayClick={this.handleDayClick}
            />
            <hr />
            <p>Need to edit your Property's Hours of Operation</p>
            <p>
              <Link to="#"><strong>Go to your Properties tab</strong></Link>
            </p>
          </div>

          <div className={`${s.calendarWrapper} col-md-10`}>
            {
              events ?
                <BigCalendar

                  selectable
                  defaultView='week'
                  events={events}
                  scrollToTime={new Date(2016, 10, 10, 6)}
                  defaultDate={selectedDay}
                  date={selectedDay /*defaultDate not workind with redux*/}
                  onSelectEvent={event => this.handleSelectEvent(event)}
                  timeslots={4}
                  components={{
                    toolbar: CustomToolbar,
                  }}
                  eventPropGetter={(event) => { return { className:'room_' + event.roomIndex + ' ' + event.className,}; }}
                  onSelectSlot={(slotInfo) => this.handleSelectSlot(slotInfo)}
                  onNavigate={this.handleNavigation}
                />

                : 'Waiting ...'
            }
            {this.state.showEventForm ? <EventForm  formSize ={this.state.formSize} rooms={this.state.rooms} slotInfo={this.state.slotInfo}  corner={this.state.corner} editEvent={this.launchEditDetails} closeEvent={this.closeEventForm}  createEvent={this.createPropertyEvent}/> : ''}
            {this.state.showEventDetails ? <EventDetails  formSize ={this.state.formSize} eventDetails={eventDetails} corner={this.state.corner} contactEvent={this.launchEventContact} detailsEvent={this.launchEventDetails} closeEvent={this.closeEventDetails}/> : ''}
          </div>

          <div className="clearfix"></div>
        </div>
        <Footer />
      </div>
    );
  }
}

CalendarContainer.propTypes = {
  properties: PropTypes.array,
  showEventForm: PropTypes.bool,
  corner: PropTypes.string,
  formSize: PropTypes.object,
  mouseDown: PropTypes.object,
};

export default withStyles(s)(CalendarContainer);
