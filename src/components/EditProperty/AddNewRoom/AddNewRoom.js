import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';
import history from '../../../core/history';
import { addRoomTemp } from '../../../actions/rooms/addRoom';
import RenderCheckbox from '../../Common/RenderCheckbox';
import s from './AddNewRoom.css';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addRoomTemp,
    }, dispatch),
  };
}

function mapStateToProps({ newRoom }) {
  return {
    newRoom,
  };
}

@connect(mapStateToProps, mapDispatchToProps)

class AddNewRoom extends React.Component {
  render() {
    const { show, submitForm, close } = this.props;

    return (
      <Modal show={show} onHide={close}>
        <Modal.Body className={s.body}>
          <h1 className={s.title}>Add New Room</h1>
          <form onSubmit={submitForm}>
            <div className={`${s.section} ${s.firstSection}`}>
              <div className="col-md-4">
                <h5 className={s.groupTitle} className={s.groupTitle}>Select one:</h5>
              </div>
              <div className="col-md-8">
                <div className="col-md-6">
                  <Field
                    name="roomTypeId"
                    component={RenderCheckbox}
                    type="radio"
                    value="meetingRoom"
                    label="Meeting Room"
                  />
                </div>
                <div className="col-md-6">
                  <Field
                    name="roomTypeId"
                    component={RenderCheckbox}
                    type="radio"
                    value="dinningRoom"
                    label="Private Dinning Room"
                  />
                </div>
              </div>
            </div>

            <div className={`${s.section}`}>
              <div className="col-md-4">
                <h5 className={s.groupTitle}>Select one:</h5>
              </div>
              <div className="col-md-8">
                <div className="col-md-6">
                  <Field
                    name="bookTypeId"
                    component={RenderCheckbox}
                    type="radio"
                    value="isBookInstant"
                    label={`Book Instantly`}
                  />
                </div>
                <div className="col-md-6">
                  <Field
                    name="bookTypeId"
                    component={RenderCheckbox}
                    type="radio"
                    value="isNotBookInstant"
                    label="Request to Book"
                  />
                </div>
              </div>
            </div>

            <Button className={s.button} type="submit">
              Add Room
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

AddNewRoom.propTypes = {
  addRoomTemp: PropTypes.func,
  show: PropTypes.bool,
  submitForm: PropTypes.func,
  close: PropTypes.func,
};

AddNewRoom = reduxForm({
  form: 'newRoom',
})(AddNewRoom);

export default withStyles(s)(AddNewRoom);

// setMeetingRoom(value) {
//   console.log(value);
//   this.setState({ isMeetingRoom: value });
// }
//
// setBookInstant(value) {
//   this.setState({ isBookInstant: value });
// }

{ /*
<div className={styles.segmentBox}>
  <ButtonGroup justified className={styles.segmentGroup}>
    <h4>Select the Room type</h4>
    <Button className={this.props.isMeetingRoom ? styles.segmentButton + ' ' + styles.active : styles.segmentButton} onClick={() => this.setMeetingRoom(true)}>Meeting Room</Button>
    <Button className={!this.props.isMeetingRoom ? styles.segmentButton + ' ' + styles.active : styles.segmentButton} onClick={() => this.setMeetingRoom(false)}>Private Dining Room</Button>
  </ButtonGroup>
</div>
<div className={styles.segmentBox}>
  <ButtonGroup justified className={styles.segmentGroup}>
    <h4>Select the booking type</h4>
    <Button className={this.props.isBookInstant ? styles.segmentButton + ' ' + styles.active : styles.segmentButton} onClick={() => this.setBookInstant(true)}>Book Instantly</Button>
    <Button className={!this.props.isBookInstant ? styles.segmentButton + ' ' + styles.active : styles.segmentButton} onClick={() => this.setBookInstant(false)}>Request for Book</Button>
  </ButtonGroup>
</div>

*/}
