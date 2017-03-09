import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import RenderAVAddOns from './RenderAVAddOns';
import s from './AVAddOns.css';

class AVAddOns extends React.Component {
  constructor(props) {
    super(props);
    this.handleAVAddOnsSubmit = this.handleAVAddOnsSubmit.bind(this);
  }

  handleAVAddOnsSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAVAddOnsSubmit}>
          <FieldArray
            name="addOns"
            component={RenderAVAddOns}
            amenityAction={this.props.amenityAction}
            createAmenity={this.props.createAmenity}
          />
        </form>
      </div>
    );
  }
}

AVAddOns = reduxForm({
  form: 'editAVAddOns',
})(AVAddOns);

AVAddOns = connect(
  (state, props) => {
    const addOns = props.avAddOns;
    return ({
      initialValues: {
        addOns,
      },
    });
  },
)(AVAddOns);

export default withStyles(s)(AVAddOns);
