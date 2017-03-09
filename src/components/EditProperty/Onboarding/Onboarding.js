import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel, PanelGroup } from 'react-bootstrap';
import { arrayPush } from 'redux-form';
import moment from 'moment';

import { getProperty } from '../../../actions/properties/getSingleProperty';
import { updateProperty } from '../../../actions/properties/updateSingleProperty';
import { updatePolicy } from '../../../actions/properties/updatePolicy';
import { getAllTags } from '../../../actions/tags/getTags';
import { updateTagMapping, deleteTagMapping, createTagMapping } from '../../../actions/tags/tagMapping';

import { getStaff } from '../../../actions/properties/getStaff';
import { addStaff } from '../../../actions/properties/addStaff';
import { deleteStaff } from '../../../actions/properties/deleteStaff';

import { uploadDocumentRequest } from '../../../actions/uploads/uploadDocument';
import { createAmenity, updateAmenity } from '../../../actions/properties/propertyAmenity';
import { updateImage } from '../../../actions/uploads/updateImage';
import { deleteImage } from '../../../actions/uploads/deleteImage';
import { getPropDocuments } from '../../../actions/uploads/getPropertyDocuments';
import { deleteDocument } from '../../../actions/uploads/deleteDocument';

import Header from '../../Header';
import AddNewRoom from '../AddNewRoom/AddNewRoom';
import GeneralSection from '../General/GeneralSection';
import PoliciesSection from '../Policies/PoliciesSection';
import TeamSection from '../Team/Team';
import UploadsSection from '../Uploads/Uploads';
import AVAddOns from '../AVAddOns/AVAddOns';
import PrimaryLeftNavigation from '../../PrimaryLeftNavigation/PrimaryLeftNavigation';
import FoodAndBeverage from '../FoodAndBeverage/FoodAndBeverage';
import OnboardingToolbar from '../Toolbar/Toolbar';
import Editorial from '../Editorial/Editorial';
import Footer from '../../Footer';
import history from '../../../core/history';
import debounce from '../../Common/debounce';
import s from './Onboarding.css';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getProperty,
      updateProperty,
      getStaff,
      addStaff,
      deleteStaff,
      uploadDocumentRequest,
      createAmenity,
      updateAmenity,
      arrayPush,
      deleteImage,
      updateImage,
      deleteDocument,
      getPropDocuments,
      updatePolicy,
      getAllTags,
      updateTagMapping,
      deleteTagMapping,
      createTagMapping,
    }, dispatch),
  };
}

function mapStateToProps({ singleProperty, user, form, newRoom, staff, propertyAmenity, tags, propertyDocuments }) {
  return {
    singleProperty,
    user,
    form,
    newRoom,
    staff,
    propertyAmenity,
    tags,
    propertyDocuments,
  };
}

@connect(mapStateToProps, mapDispatchToProps)

class Onboarding extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      singleProperty: this.props.singleProperty,
      showRoomModal: props.newRoomForm,
      policies: this.props.singleProperty.policy,
      isExpanded: false,
      sectionExpanded: [true, false, false, false, false, false, false],
      termsUrl: '',
      executiveSummary: null,
    };

    this.createNewRoom = this.createNewRoom.bind(this);
    this.hideRoomModal = this.hideRoomModal.bind(this);
    this.launchRoomModal = this.launchRoomModal.bind(this);
    this.handleDocumentUpload = this.handleDocumentUpload.bind(this);
    this.handleAmenityUpdate = debounce(this.handleAmenityUpdate.bind(this), 1500);
    this.handleCreateAmenity = this.handleCreateAmenity.bind(this);
    this.onExpandPanels = this.onExpandPanels.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteStaff = this.deleteStaff.bind(this);

    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleImageUpdate = debounce(this.handleImageUpdate.bind(this), 1500);
    this.handleDocumentDelete = this.handleDocumentDelete.bind(this);

    this.handleFormArrayPush = this.handleFormArrayPush.bind(this);
    this.handlePolicyTermsDrop = this.handlePolicyTermsDrop.bind(this);
    this.handlePolicyTermsDelete = this.handlePolicyTermsDelete.bind(this);
    this.handleSaveMember = this.handleSaveMember.bind(this);
    this.handlePrimaryContactSubmit = this.handlePrimaryContactSubmit.bind(this);
    this.updateExecutiveSummary = this.updateExecutiveSummary.bind(this);
    this.propertyId = props.propertyId;
  }

  componentDidMount() {
    this.setState({
      singleProperty: null,
      policies: null,
    });
    this.props.actions.getProperty(this.propertyId).then(() => {
      this.setState({
        singleProperty: this.props.singleProperty,
        policies: this.props.singleProperty.policy,
        termsUrl: this.props.singleProperty.data.attributes.details.terms_url,
        executiveSummary: this.props.singleProperty.data.attributes.details.executive_summary,
      });
    });

    this.props.actions.getStaff(this.propertyId);
    this.props.actions.getAllTags();
    this.props.actions.getPropDocuments(this.propertyId);
  }

  onChange(activeKey) {
    const expanded = this.state.sectionExpanded;
    expanded[activeKey - 1] = !expanded[activeKey - 1];

    this.setState({
      sectionExpanded: expanded,
    });
  }

  launchRoomModal() {
    this.setState({
      showRoomModal: true,
    });
    history.push(`/properties/${this.propertyId}/rooms/new`, {
      state: 'newRoom',
    });
  }

  hideRoomModal() {
    this.setState({
      showRoomModal: false,
    });
    history.push(`/properties/${this.propertyId}/edit`, {
      state: 'properties',
    });
  }

  createNewRoom(event) {
    event.preventDefault();
    history.push(`/properties/${this.propertyId}/rooms/new/edit`, { state: 'newRoom' });
  }

  deleteStaff(member) {
    this.props.actions.deleteStaff(this.propertyId, member);
  }

  handleDocumentUpload(files, id, cb) {
    const file = files[0];
    console.log('upload document_type_id '+id);
    this.props.actions.uploadDocumentRequest({
      document: file,
      name: file.name,
      object_id: this.propertyId,
      document_type_id: id,
      description: 'document uploaded on the web app',
      object_type: 'Property',
    }).then(res => cb && typeof cb === 'function' ? cb(res) : res);
  }

  handleImageUpload(files, id, cb) {
    const file = files[0];
    this.props.actions.uploadDocumentRequest({
      document: file,
      name: file.name,
      object_id: this.propertyId,
      document_type_id: id,
      description: '',
      object_type: 'Property',
      type: 'Image',
      url: '/images',
    }).then(res => cb(res));
  }

  handleImageUpdate(image) {
    console.log(image);
    //this.props.actions.updateImage(image);
  }

  handleFormArrayPush(form, fieldName, value) {
    this.props.actions.arrayPush(form, fieldName, value);
  }

  handleCreateAmenity(values) {
    /**
      * When creating new amenity, we need to update singleProperty
      * to get the newly added amenity with ID and other values from API
      * and then pass it to "repeatable" fields and force the form to re-render
    */
    this.props.actions.createAmenity(values, this.propertyId).then(() => {
      this.props.actions.getProperty(this.propertyId).then(() => {
        this.setState({
          singleProperty: this.props.singleProperty,
        });
      });
    });
  }

  handleAmenityUpdate(values, propAmenityId) {
    this.props.actions.updateAmenity(values, propAmenityId, this.propertyId);
  }

  componentWillReceiveProps(nextProps) {
    /**
      * updating state if name has changes.
      * subheader uses this to display the most up to date property name
    */
    if (this.state.singleProperty) {
      if (nextProps.singleProperty.data.attributes.display_name !== this.state.singleProperty.data.attributes.display_name) {
        this.setState({ singleProperty: nextProps.singleProperty });
      }
    }
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
    this.handleDocumentUpload(files, this.propertyId, (res) => {
      const { details } = this.state.singleProperty.data.attributes;
      details.terms_url = res.image_url;
      this.setState({
        termsUrl: res.image_url,
      });
      this.props.actions.updateProperty(this.state.singleProperty.data.attributes, this.propertyId);
    });
  }

  handlePolicyTermsDelete() {
    this.setState({
      termsUrl: null,
    });
    const { details } = this.state.singleProperty.data.attributes;
    details.terms_url = null;
    this.props.actions.updateProperty(this.state.singleProperty.data.attributes, this.propertyId);
  }

  handleSaveMember(member) {
    this.props.actions.addStaff(this.propertyId, member);
  }

  handlePrimaryContactSubmit(event) {
    event.preventDefault();
    const { attributes } = this.state.singleProperty.data;
    const { primary } = this.props.form.editPropertyTeam.values;
    attributes.contact_name = primary.contact;
    attributes.email = primary.email;
    attributes.phone = primary.phone;
    // attributes.public = primary.public; //TODO: uncomment when confirmed with Sai
    this.props.actions.updateProperty(attributes, this.propertyId);
  }

  updateExecutiveSummary(content) {
    console.log(content);
  }

  handleDocumentDelete(docId) {
    this.props.actions.deleteDocument(docId);
  }

  render() {
    const expanded = this.state.sectionExpanded;

    return (
      <div>
        {
          this.state.singleProperty && this.state.singleProperty.data ?
            <div>
              <Header
                user={this.props.user}
                subheader="property"
                property={this.state.singleProperty}
              />

              <OnboardingToolbar
                property={this.state.singleProperty}
                onExpandPanels={this.onExpandPanels}
                isExpanded={this.state.isExpanded}
              />

              <div className={`${s.onboardingContainer} container`}>

                <AddNewRoom
                  show={this.state.showRoomModal}
                  close={this.hideRoomModal}
                  submitForm={this.createNewRoom}
                  isMeetingRoom
                  isBookInstant
                />

                <div className={`${s.leftColumn} col-xs-3`}>
                  <PrimaryLeftNavigation property={this.state.singleProperty} />
                </div>

              <div className={`${s.rightColumn} col-md-9`}>
                <PanelGroup
                  className={s.propertiesAccordion}
                >
                  <Panel header="General information" eventKey="1" className={s.panel} collapsible expanded={expanded[0]} onSelect={this.onChange}>
                    <GeneralSection
                      property={this.state.singleProperty}
                      handleForm={this.props.actions.updateProperty}
                      uploadAction={this.handleDocumentUpload}
                      uploadImageAction={this.handleImageUpload}
                      addGalleryImage={this.handleFormArrayPush}
                      deleteImage={this.props.actions.deleteImage}
                      updateImage={this.props.actions.updateImage}
                    />
                  </Panel>
                  <Panel header="Policies" eventKey="2" className={s.panel} collapsible expanded={expanded[1]} onSelect={this.onChange}>
                    <PoliciesSection
                      policies={this.state.policies}
                      propId={this.propertyId}
                      key={this.state.singleProperty.data.id}
                      policyTermsDrop={this.handlePolicyTermsDrop}
                      termsUrl={this.state.termsUrl}
                      handlePolicyTermsDelete={this.handlePolicyTermsDelete}
                    />
                  </Panel>
                  <Panel header="Your Team" eventKey="3" className={s.panel} collapsible expanded={expanded[2]} onSelect={this.onChange}>
                    <TeamSection
                      key={this.state.singleProperty.data.id}
                      handleSaveMember={this.handleSaveMember}
                      handleDeleteMember={this.deleteStaff}
                      handlePrimaryContactSubmit={this.handlePrimaryContactSubmit}
                    />
                  </Panel>
                  <Panel header="Uploads" eventKey="4" className={s.panel} collapsible expanded={expanded[3]} onSelect={this.onChange}>
                    <UploadsSection
                      uploadAction={this.handleDocumentUpload}
                      propertyDocuments={this.props.propertyDocuments}
                      handleDocumentDelete={this.handleDocumentDelete}
                    />
                  </Panel>
                  <Panel header="Food &amp; Beverage" eventKey="5" className={s.panel} collapsible expanded={expanded[4]} onSelect={this.onChange}>
                    <FoodAndBeverage
                      amenityAction={this.handleAmenityUpdate}
                      createAmenity={this.handleCreateAmenity}
                      foods={this.state.singleProperty.foodAmenities}
                      key={this.props.singleProperty.foodAmenities.length}
                      updatePolicy={this.props.actions.updatePolicy}
                    />
                  </Panel>
                  <Panel header="A/V Add-Ons" eventKey="6" className={s.panel} collapsible expanded={expanded[5]} onSelect={this.onChange}>
                    <AVAddOns
                      amenityAction={this.handleAmenityUpdate}
                      createAmenity={this.handleCreateAmenity}
                      avAddOns={this.state.singleProperty.avAmenities}
                      key={this.props.singleProperty.avAmenities.length}
                    />
                  </Panel>
                  <Panel header="Editorial" eventKey="7" className={s.panel} collapsible expanded={expanded[6]} onSelect={this.onChange}>
                    <Editorial
                      executiveSummary={this.state.executiveSummary}
                      updateExecutiveSummary={this.updateExecutiveSummary}
                      tags={this.props.tags}
                      propertyTags={this.state.singleProperty.tag}
                      updateTagMapping={this.props.actions.updateTagMapping}
                      deleteTagMapping={this.props.actions.deleteTagMapping}
                      createTagMapping={this.props.actions.createTagMapping}
                      propId={this.propertyId}
                    />
                  </Panel>
                </PanelGroup>
              </div>
            </div>
          </div>
           : 'Loading...'
        }
        <Footer />
      </div>
    );
  }
}

Onboarding.propTypes = {
  actions: PropTypes.shape({
    getProperty: PropTypes.func,
    updateProperty: PropTypes.func,
    deleteImage: PropTypes.func,
    updateImage: PropTypes.func,
    deleteStaff: PropTypes.func,
    updatePolicy: PropTypes.func,
    getAllTags: PropTypes.func,
    updateTagMapping: PropTypes.func,
    deleteTagMapping: PropTypes.func,
    createTagMapping: PropTypes.func,
    deleteDocument: PropTypes.func,
    createAmenity: PropTypes.func,
  }),
  propertyId: PropTypes.string,
  singleProperty: PropTypes.object,
};

export default withStyles(s)(Onboarding);
