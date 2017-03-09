import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAddresses } from '../../../actions/properties/getAddresses';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Field, reduxForm } from 'redux-form';
import { Modal } from 'react-bootstrap';
import debounce from '../../Common/debounce';
import s from './AddNewProperty.css';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getAddresses,
    }, dispatch),
  };
}

function mapStateToProps({ getAddresses }) {
  return {
    addresses: getAddresses.addresses,
  };
}

class AddNewProperty extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addresses: this.props.addresses,
      showSuggestions: false,
      term: '',
    };
    this.getSuggestions = debounce(this.getSuggestions.bind(this), 500);
  }

  getSuggestions(target) {

    if (target.value != this.state.term && target.name == 'propAddress') {
      this.setState({
        term: target.value,
      });
      this.props.actions.getAddresses(target.value);
    }
  }

  setSuggestion(event) {
    let address = event._targetInst._currentElement.props.value;
    this.props.change('propAddress', address);
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

  updateConditional(event) {
    this.setState({ conditional: event.target.value === 'Yes' });
  }

  onHide(event) {
    this.props.actions.getAddresses('');
    this.props.close();
  }

  render() {
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
      <Modal show={this.props.show} onHide={this.onHide.bind(this)}>

        <div className={`${s.formGroup} form-group row`}>
          <h1 className={s.formTitle}>Add new property</h1>
        </div>

        <form className={s.form} onSubmit={this.props.submitForm} onChange={(e) => {
          this.getSuggestions(e.target);
        }}>

          <div className={`${s.formGroup} form-group row`}>
            <div className="col-md-5">
              <label className={s.label} htmlFor="propName">Property Name</label>
            </div>
            <div className="col-md-7">
              <Field
                name="propName"
                component="input"
                type="text"
                placeholder="Property Name"
                className={`${s.inputField} form-control`}
                id="propName"
                required
              />
            </div>
          </div>

          <div className={`${s.formGroup} form-group row`}>
            <div className="col-md-5">
              <label className={s.label} htmlFor="propAddress">Property Address</label>
            </div>
            <div className="col-md-7">
              <div className={`${s.typeHead}`}>
                <Field
                  name="propAddress"
                  component="input"
                  type="text"
                  placeholder="Property Address"
                  id="propAddress"
                  className={`${s.inputField} form-control`}
                  onBlur={this.toggleSelectableOff.bind(this)}
                  onFocus={this.toggleSelectableOn.bind(this)}
                  required
                  autoComplete={false}
                />
                {suggestAddress.length > 0 ?
                  <div className={`${s.dropDown} ${this.state.showSuggestions ? 'show' : ''}`}>
                    <ul>{suggestAddress}</ul>
                  </div> : ''}
              </div>
            </div>
          </div>

          <div className={`${s.formGroup} form-group row`}>
            <div className="col-md-5">
              <label className={s.label} htmlFor="contactName">Contact Name</label>
            </div>
            <div className="col-md-7">
              <Field
                name="contactName"
                component="input"
                type="text"
                placeholder="Contact Name"
                className={`${s.inputField} form-control`}
                id="contactName"
                required
              />
            </div>
          </div>

          <div className={`${s.formGroup} form-group row`}>
            <div className="col-md-5">
              <label className={s.label} htmlFor="contactEmail">Contact Email</label>
            </div>
            <div className="col-md-7">
              <Field
                name="contactEmail"
                component="input"
                type="email"
                placeholder="Contact Email"
                className={`${s.inputField} form-control`}
                id="contactEmail"
                required
              />
            </div>
          </div>

          <div className={`${s.formGroup} form-group row`}>
            <div className="col-md-5">
              <label className={s.label} htmlFor="amenityPercentageAmount">
                Amenity comission rate
              </label>
            </div>
            <div className="col-md-7 col-xs-12">
              <Field
                name="amenityPercentageAmount"
                id="amenityPercentageAmount"
                component="select"
                className={`${s.inputField} form-control`}
              >
                <option>0.2</option>
                <option>0.4</option>
                <option>0.6</option>
              </Field>
            </div>
          </div>

          <div className={`${s.formGroup} form-group row`}>
            <div className="col-md-5">
              <label className={s.label} htmlFor="roomPercentageAmount">Room comission rate</label>
            </div>
            <div className="col-md-7 col-xs-12">
              <Field
                name="roomPercentageAmount"
                id="roomPercentageAmount"
                component="select"
                className={`${s.inputField} form-control`}
              >
                <option>0.2</option>
                <option>0.4</option>
                <option>0.6</option>
              </Field>
            </div>
          </div>

          <button className={s.button} type="submit">Submit</button>

        </form>
      </Modal>
    );
  }
}

AddNewProperty.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  submitForm: PropTypes.func,
  addresses: PropTypes.array,
  showSuggestions: PropTypes.bool,
  term: PropTypes.string,
};

AddNewProperty = reduxForm({
  form: 'newProperty',
})(AddNewProperty);

AddNewProperty = connect(mapStateToProps, mapDispatchToProps)(AddNewProperty);

export default withStyles(s)(AddNewProperty);
