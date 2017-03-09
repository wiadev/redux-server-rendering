import React, { PropTypes }  from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Field, FieldArray, reduxForm, arrayPush } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReduxFormDropzone from '../../Common/FormDropzone';
import s from './General.css';
import debounce from '../../Common/debounce';
import galleryImagePreview from './galleryImagePreview';
import { getAddresses } from '../../../actions/properties/getAddresses';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getAddresses,
    }, dispatch),
  };
}

function mapStateToProps({ getAddresses, singleProperty }) {
  return {
    addresses: getAddresses.addresses,
    initialValues: {
      general: singleProperty.data.attributes,
      galleryImages: singleProperty.image,
    },
  };
}

class GeneralSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoPreviewSrc: '',
      galleryPreview: [],
      property: this.props.property.data.attributes,
      images: this.props.property.image,
      addresses: this.props.addresses,
      showSuggestions: false,
      term: '',
    };

    // this.updateProperty = debounce(this.updateProperty.bind(this), 1000);
    this.updateProperty = this.updateProperty.bind(this);
    this.handleLogoDrop = this.handleLogoDrop.bind(this);
    this.handleGalleryDrop = this.handleGalleryDrop.bind(this);
    this.removeLogo = this.removeLogo.bind(this);
    this.removeLogoImage = this.removeLogoImage.bind(this);
    this.updatePropertyAttributes = debounce(this.updatePropertyAttributes.bind(this), 1500);
    this.getSuggestions = debounce(this.getSuggestions.bind(this), 500);
    this.updateImage = this.updateImage.bind(this);
    this.property = this.props.property;
  }

  /**
    * This methods sends API request to update the current property
    * it uses this.state.property as a payload for API request
  */
  updateProperty() {
    this.props.handleForm(this.state.property, this.props.property.data.id);
  }

  updateImage(image) {
    console.log(image);
    //this.props.updateImage
  }

  handleLogoDrop(files) {
    const { details } = this.state.property;
    details.logo_url = 'https://dl.dropboxusercontent.com/u/3070228/spiffygif_30x30.gif'; // spinner
    this.setState({
      property: { ...this.state.property, details },
    });
    this.props.uploadAction(files, this.props.property.data.id, (res) => {
      details.logo_url = res.image_url;
      this.setState({
        property: { ...this.state.property, details },
      });
      this.updateProperty();
    });
  }

  handleGalleryDrop(files) {
    this.props.addGalleryImage('editPropertyGeneral', 'galleryImages', {
      image_url: files[0].preview,
      name: files[0].name,
    });
    this.props.uploadImageAction(files, this.props.property.data.id, (res) => {});
  }

  removeLogoImage() {
    const { details } = this.state.property;
    details.logo_url = null;
    this.setState({
      property: { ...this.state.property, details },
    });
    this.updateProperty();
  }

  updatePropertyAttributes(val, propName) {
    this.setState({
      property: { ...this.state.property, [propName]: val },
    });
    this.updateProperty();
  }

  removeLogo() {
    this.setState({
      logoPreviewSrc: '',
    });
  }

  removeGalleryImage(field, index) {
    console.log(field);
    // const galleryPreview = this.state.galleryPreview.slice();
    // galleryPreview.splice(index, 1);
    // this.setState({
    //   galleryPreview,
    // });
  }

  getSuggestions(target) {
    if (target.value != this.state.term && target.name == 'general.full_address') {
      this.setState({
        term: target.value,
      });
      this.props.actions.getAddresses(target.value);
      this.updatePropertyAttributes(target.value, 'full_address');
    }
  }

  setSuggestion(event) {
    let address = event._targetInst._currentElement.props.value;
    this.props.change('general.full_address', address);
    this.updatePropertyAttributes(address, 'full_address');
  }

  toggleSelectableOn(event) {
    this.setState({
      showSuggestions: true,
    });
  }

  toggleSelectableOff(event) {
    this.setState({
      showSuggestions: false,
    });
  }

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;
    const logoPreview = this.state.logoPreviewSrc !== '' ? (<div className={s.logoHolder}>
      <img src={this.state.logoPreviewSrc} alt="logo" />
      <button className={s.logoHolderCls} onClick={this.removeLogo}>×</button>
    </div>) : '';

    const renderField = (field) => {
      return (
        <input {...field.input} type="text" className="form-control" onChange={(e) => {
            field.input.onChange(e);
            debounce(field.onChangeAction(e.target.value, field.propName), 1500);
          }}
        />
      )
    };

    let suggestAddress = this.props.addresses.map((option, index) =>  (
      <li key={`sugg_${index}`}>
        <a href="#" onClick={
            event =>  event.preventDefault()
          } onMouseDown={this.setSuggestion.bind(this)} value={option.address}>
          {option.address}
        </a>
      </li>
    ));

    return (
      <div>
        <form onChange={(e) => {
          this.getSuggestions(e.target);
        }}
        >
          <div className="form-group row">
            <div className="col-xs-12 col-md-6">
              <label className={s.label} htmlFor="general.display_name">Property Name</label>
              <p className={s.helperText}>Full name as you’d like it to appear on listing</p>
            </div>
            <div className="col-xs-12 col-md-6">
              <Field
                name="general.display_name"
                type="text"
                placeholder="The John Smith Hotel"
                className="form-control"
                propName="display_name"
                onChangeAction={this.updatePropertyAttributes.bind(this)}
                component={renderField}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-xs-12 col-md-6">
              <label className={s.label} htmlFor="general.full_address">Address</label>
              <p className={s.helperText}>Complete street address, including postal code</p>
            </div>
            <div className="col-xs-12 col-md-6">
              <div className={`${s.typeHead}`}>
                <Field
                  name="general.full_address"
                  component="input"
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="off"
                  placeholder="1000 W Main St. New York, NY 1000"
                  className="form-control"
                  onBlur={this.toggleSelectableOff.bind(this)}
                  onFocus={this.toggleSelectableOn.bind(this)}
                  autoComplete={false}
                />
              {suggestAddress.length > 0 ?
                <div className={`${s.dropDown} ${this.state.showSuggestions ? 'show' : ''}`}>
                  <ul>{suggestAddress}</ul>
                </div> : ''}
              </div>
            </div>
          </div>

          <div className={`form-group row ${s.logoSection}`}>
            <div className="col-xs-12 col-md-6">
              <label className={s.label}>Upload Logo</label>
              <p className={s.helperText}>
                File must be hi-res quality. JPG & PNG file types only.
                We recommend using a transparent logo.
              </p>
            </div>
            <div className="col-xs-12 col-md-6 pull-right">
              {this.state.property.details.logo_url ?
                <div className={s.logo}>
                  <img height="70" src={this.state.property.details.logo_url} alt="logo" />
                    <button
                      type="button"
                      className={s.galleryImageHolderCls}
                      onClick={this.removeLogoImage}
                    >
                      ×
                    </button>
                </div>  :
                <Field
                  name={'logofiles'}
                  component={ReduxFormDropzone}
                  className={`${s.dropZone} ${this.state.logoPreviewSrc !== '' ? 'hidden' : ''}`}
                  multiple={false}
                  dropzoneOnDrop={this.handleLogoDrop}
                />
              }
            </div>
          </div>

          <div className="form-group row">
            <div className="col-xs-12 col-md-6">
              <label className={s.label}>Upload Imagery</label>
              <p className={s.helperText}>
                Please upload several images that will give clients a sense of the property,
                including at least one exterior shot.
                Images of specific rooms will be requested later.
                Files must be hi-res quality. JPG & PNG file types only.
              </p>
            </div>
            <div className="col-xs-12 col-md-6">
              <Field
                name={'imageryfiles'}
                component={ReduxFormDropzone}
                multiple={false}
                className={s.dropZone}
                dropzoneOnDrop={this.handleGalleryDrop}
              />
            </div>
          </div>
          <div className={`${s.galleryHolder}`}>
            <FieldArray
              name="galleryImages"
              component={galleryImagePreview}
              removeGalleryImage={this.props.deleteImage}
              updateImageAction={this.updateImage}
            />
          </div>
        </form>
      </div>
    );
  }
}

GeneralSection.propTypes = {
  logoPreviewSrc: PropTypes.string,
  galleryPreview: PropTypes.array,
  deleteImage: PropTypes.func,
};

GeneralSection = reduxForm({
  form: 'editPropertyGeneral',
  enableReinitialize: false,
})(GeneralSection);

GeneralSection = connect(mapStateToProps, mapDispatchToProps)(GeneralSection);

export default withStyles(s)(GeneralSection);
