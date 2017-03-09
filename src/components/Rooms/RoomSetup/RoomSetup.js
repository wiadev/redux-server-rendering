import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FieldArray, Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import s from './RoomSetup.css';

class RoomSetup extends React.Component {

  constructor(props) {
    super(props);
    this.updateProperty = this.updatePricing.bind(this);
    this.property = this.props.property;
    this.state = {
      activeBox: '',
    };
    this.setBox = this.setBox.bind(this);
  }

  updatePricing(formValues) {
    event.preventDefault();
    console.log(this.props);
  }

  setBox(event) {
    event.preventDefault();
    let target = event.currentTarget;
    this.setState({
      activeBox: target.id,
    });
    this.props.change('roomType', target.id);
  }

  roomLastMinuteHandle() {

    if (document.getElementsByClassName('roomLastMinuteSection').length == 0)
      document.getElementById('addMoreButton').click();
  }

  render() {

    const { error, handleSubmit, pristine, reset, submitting } = this.props;

    let roomTypes = [
      { id: 0, type: 'Boardroom / Conference' },
      { id: 1, type: 'U-shape' },
      { id: 2, type: 'Hollow Square' },
      { id: 3, type: 'Theater' },
      { id: 4, type: 'Classroom' },
      { id: 5, type: 'Banquet' },
      { id: 6, type: 'Reception' },
    ];

    let roomsBoxes = roomTypes.map((room, index) =>
      <div className="col-xs-6 col-sm-3" key={`boxHolder_${index}`}>
        <a href="#"
           className={`${s.box} ${room.id == this.state.activeBox ? 'active' : ''}`}
           id={room.id}
           ref={`box_${index}`}
           onClick={this.setBox}
        >
          <div className={s.boxContent}>
            <div className={s.boxName}>{room.type}</div>
          </div>
        </a>
      </div>
    );

    const roomLastMinute = ({ fields }) => (

      <div >

        {fields.map((setup, index) =>
          <div className={`roomLastMinuteSection ${s.roomLastMinuteSection}`} key={`roomLastMinuteSection_${index}`}>
            <div className="clearfix">
              <button
                type="button"
                title="Remove Setup"
                className={s.roomLastMinuteSectionRemove}
                onClick={() => fields.remove(index)}>&times;
              </button>
            </div>
            <div className="form-group row">
              <div className="col-xs-12 col-md-7">
                <label htmlFor={`${setup}.roomLastMinuteLayout`} className={s.labelThin}>
                  What layout is it?
                </label>
              </div>
              <div className="col-xs-12 col-md-5">
                <Field
                  name={`${setup}.roomLastMinuteLayout`}
                  component="select"
                  className="form-control"
                >
                  <option>Boardroom/Conference</option>
                  <option>U-shape</option>
                  <option>Hollow Square</option>
                  <option>Theater</option>
                  <option>Classroom</option>
                  <option>Banquet</option>
                  <option>Reception</option>

                </Field>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-xs-12 col-md-7">
                <label htmlFor={`${setup}.roomLastMinuteCapacity`} className={s.labelThin}>
                  What is capacity of this setup?
                </label>
              </div>
              <div className="col-xs-12 col-md-5">
                <Field
                  name={`${setup}.roomLastMinuteCapacity`}
                  component="input"
                  type="text"
                  className="form-control"
                  placeholder="1 or more"
                >

                </Field>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-xs-12 col-md-7">
                <label htmlFor={`${setup}.roomLastMinuteFee`} className={s.labelThin}>
                  Is there an additional setup fee?
                </label>
              </div>
              <div className="col-xs-12 col-md-5">
                <Field
                  name={`${setup}.roomLastMinuteFee`}
                  component="select"
                  className="form-control"
                >
                  <option>Yes</option>
                  <option>No</option>

                </Field>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-xs-12 col-md-7">
                <label htmlFor={`${setup}.roomLastMinuteNotice`} className={s.labelThin}>
                  Is there an additional advance notice?
                </label>
              </div>
              <div className="col-xs-12 col-md-5">
                <Field
                  name={`${setup}.roomLastMinuteNotice`}
                  component="select"
                  className="form-control"
                >
                  <option>Yes</option>
                  <option>No</option>

                </Field>
              </div>
            </div>
          </div>
        )}
        <div className={s.addMoreHolder}>
          <button
            type="button"
            onClick={() => fields.push({})}
            className={s.addMoreButton}
            id="addMoreButton"
          >Add
          </button>
        </div>
      </div>
    );

    return (
      <div>
        <form onSubmit={handleSubmit(this.updatePricing)}>

          <Field
            component="input"
            type="hidden"
            name="roomType"
            id="roomType"
          />


          <div className={s.section}>
            <label>How is this room most commonly set up?</label>
            <p>This setup must accommodate 50 people or less</p>
            <div className="row">

              {roomsBoxes}
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8">
                <label htmlFor="roomCapacity">** What is capacity of this setup?</label>
                <p>Indicate how many people can fit comfortably.</p>
              </div>
              <div className="col-xs-12 col-md-4 pull-right text-right">

                <Field
                  name="roomCapacity"
                  component="select"
                  className={`form-control ${s.shortField}`}
                >
                  <option>0</option>
                  <option>5</option>
                  <option>24</option>
                </Field>
              </div>


            </div>
            {/* end of section */}
          </div>

          <div className={s.section}>
            <div className="form-group row">
              <div className="col-md-6">
                <label htmlFor="name" className={s.label}>
                  Would you like to offer last minute rates?
                </label>
                <p className={s.helper}>
                  This rate would only apply to bookings within seven days or less.
                </p>
              </div>
              <div className="col-md-1 pull-right">
                <Field
                  name="roomLastMinuteSwitch"
                  id="roomLastMinuteSwitch"
                  component="input"
                  type="checkbox"
                  className="form-control"
                  onClick={this.roomLastMinuteHandle}
                />
              </div>
            </div>

            <div className={`${s.lastMinuteHolder} ${this.props.roomLastMinuteSwitch ? 'show' : false}`}>

              <FieldArray name="setup" component={roomLastMinute}/>


            </div>


          </div>
          {/* end of section */}


        </form>
      </div>
    );
  }
}

RoomSetup.propTypes = {
  activeBox: PropTypes.string,
};

RoomSetup = reduxForm({
  form: 'editRoomSetup',
})(RoomSetup);
const selector = formValueSelector('editRoomSetup');

RoomSetup = connect(
  state => ({
    roomLastMinuteSwitch: selector(state, 'roomLastMinuteSwitch'),
  }),
)(RoomSetup);

export default withStyles(s)(RoomSetup);
