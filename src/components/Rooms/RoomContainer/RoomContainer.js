import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel, PanelGroup } from 'react-bootstrap';
import moment from 'moment';
import { getProperty } from '../../../actions/properties/getSingleProperty';
import { updateProperty } from '../../../actions/properties/updateSingleProperty';
import { getRoom } from '../../../actions/rooms/getRoom';
import { resetRoom } from '../../../actions/rooms/resetRoom';
import { addRoom } from '../../../actions/rooms/addRoom';
import { updateRoom } from '../../../actions/rooms/updateRoom';
import { uploadDocumentRequest } from '../../../actions/uploads/uploadDocument';
import { updatePolicy } from '../../../actions/properties/updatePolicy';

import Header from '../../Header';
import PrimaryLeftNavigation from '../../PrimaryLeftNavigation/PrimaryLeftNavigation';
import OnboardingToolbar from '../../EditProperty/Toolbar/Toolbar';
import s from './RoomContainer.css';
import GeneralRoomInfo from '../General/GeneralSection';
import PricingRoomInfo from '../Pricing/Pricing';
import OperationHoursInfo from '../OperationHours/OperationHours';
import RoomSetup from '../RoomSetup/RoomSetup';
import PoliciesSection from '../../EditProperty/Policies/PoliciesSection';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getProperty,
      updateProperty,
      getRoom,
      addRoom,
      updateRoom,
      resetRoom,
      uploadDocumentRequest,
      updatePolicy,
    }, dispatch),
  };
}

function mapStateToProps({ singleProperty, user, room }) {
  return {
    singleProperty,
    user,
    room,
  };
}

@connect(mapStateToProps, mapDispatchToProps)

class RoomContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      roomId: props.roomId,
      singleProperty: this.props.singleProperty,
      showRoomModal: false,
      isNewRoom: props.roomId === 'new' ? 'true' : 'false',
      isExpanded: false,
      sectionExpanded: [true, false, false, false, false],
      policies: this.props.singleProperty.policy,
      termsUrl: null,
      room: null,
    };
    this.onExpandPanels = this.onExpandPanels.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handlePolicyTermsDrop = this.handlePolicyTermsDrop.bind(this);
    this.handleDocumentUpload = this.handleDocumentUpload.bind(this);
    this.propertyId = props.propertyId;
    this.roomId = props.roomId;
  }

  componentDidMount() {
    console.log(this);
    this.props.actions.getProperty(this.propertyId).then(() => {
      this.setState({
        singleProperty: this.props.singleProperty,
      });
      if (this.props.roomId !== 'new') {
        this.props.actions.getRoom(this.props.roomId).then(() => {
          this.setState({
            room: this.props.room,
          });
        });
      } else {
        this.props.actions.resetRoom();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.roomId !== nextProps.roomId) {
      if (nextProps.roomId === 'new') {
        this.setState({ isNewRoom: true });
        this.props.actions.resetRoom();
      } else {
        this.props.actions.getRoom(nextProps.roomId).then(() => {
          this.setState({
            roomId: nextProps.roomId,
            isNewRoom: false,
          });
        });
      }
    }
  }

  onChange(activeKey) {
    const expanded = this.state.sectionExpanded;
    expanded[activeKey - 1] = !expanded[activeKey - 1];

    this.setState({
      sectionExpanded: expanded,
    });
  }

  onExpandPanels() {
    const isExpanded = this.state.isExpanded;
    const expanded = this.state.sectionExpanded;
    for (let i = 0; i < expanded.length; i += 1) {
      expanded[i] = !isExpanded;
    }
    this.setState({
      isExpanded: !isExpanded,
      sectionExpanded: expanded,
    });
  }

  handlePolicyTermsDrop(files) {
    console.log(files);
    this.handleDocumentUpload(files, this.propertyId, (res) => {
      const { details } = this.state.singleProperty.data.attributes;
      details.terms_url = res.image_url;
      this.props.actions.updateProperty(this.state.singleProperty.data.attributes, this.propertyId);
    })
  }

  handleDocumentUpload(files, id, cb) {
    const file = files[0];
    this.props.actions.uploadDocumentRequest({
      document: file,
      name: file.name,
      object_id: this.propertyId,
      document_type_id: id,
      description: 'document uploaded on the web app',
      object_type: 'Property',
    }).then(res => cb && typeof cb === 'function' ? cb(res) : res);
  }

  handleGeneralInfo = (formValues) => {
    if (this.state.isNewRoom === true) {
      this.props.actions.addRoom(() => {
        this.props.actions.getProperty(this.propertyId).then(() => {
          this.setState({ singleProperty: this.props.singleProperty });
        });
      });
    } else {
      this.props.actions.updateRoom(formValues, this.state.roomId).then((res) => {
        this.props.actions.getProperty(this.propertyId).then(() => {
          this.setState({ singleProperty: this.props.singleProperty });
        });
      });
    }
  }

  render() {
    const expanded = this.state.sectionExpanded;
    const { isNewRoom, roomId, singleProperty, room } = this.state;
    return (
      <div>
        {
          singleProperty.data && singleProperty.data.attributes && room && room.data ?
            <div>
              <Header
                user={this.props.user}
                subheader="property"
                property={singleProperty}
              />

              <OnboardingToolbar
                property={singleProperty}
                onExpandPanels={this.onExpandPanels}
                isExpanded={this.state.isExpanded}
              />

              <div className={`${s.onboardingContainer} container`}>

                <div className={`${s.leftColumn} col-xs-3`}>
                  <PrimaryLeftNavigation
                    property={singleProperty}
                    isAddingNew={isNewRoom}
                    roomId={roomId}
                  />
                </div>

                <div className={`${s.rightColumn} col-md-9`}>
                  <PanelGroup
                    className={s.propertiesAccordion}
                  >
                    <Panel header="General information" eventKey="1" className={s.panel} collapsible expanded={expanded[0]} onSelect={this.onChange}>
                      <GeneralRoomInfo
                        property={singleProperty}
                        handleForm={(formValues) => this.handleGeneralInfo(formValues)}
                      />
                    </Panel>
                    <Panel header="Pricing" eventKey="2" className={s.panel} collapsible expanded={expanded[1]} onSelect={this.onChange}>
                      <PricingRoomInfo />
                    </Panel>
                    <Panel header="Hours of Operations" eventKey="3" className={s.panel} collapsible expanded={expanded[2]} onSelect={this.onChange}>
                      <OperationHoursInfo
                        room={this.state.room}
                        updateHours={this.props.actions.updatePolicy}
                      />
                    </Panel>
                    <Panel header="Room Setup" eventKey="4" className={s.panel} collapsible expanded={expanded[3]} onSelect={this.onChange}>
                      <RoomSetup />
                    </Panel>
                    <Panel header="Policies" eventKey="5" className={s.panel} collapsible expanded={expanded[4]} onSelect={this.onChange}>
                      <PoliciesSection
                        policies={this.state.policies}
                        propId={this.propertyId}
                        key={singleProperty.data.id}
                        policyTermsDrop={this.handlePolicyTermsDrop}
                        termsUrl={this.state.termsUrl}
                      />
                    </Panel>
                  </PanelGroup>
                </div>
              </div>
            </div>
           : 'Loading...'
        }
      </div>
    );
  }
}

RoomContainer.propTypes = {
  actions: PropTypes.shape({
    getProperty: PropTypes.func,
    updateProperty: PropTypes.func,
    getRoom: PropTypes.func,
    addRoom: PropTypes.func,
    updateRoom: PropTypes.func,
    resetRoom: PropTypes.func,
  }),
  user: PropTypes.any,
  propertyId: PropTypes.string.isRequired,
  singleProperty: PropTypes.object,
  room: PropTypes.object,
  roomId: PropTypes.string.isRequired,
};

export default withStyles(s)(RoomContainer);
