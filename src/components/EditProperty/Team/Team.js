import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { reduxForm, FieldArray, FormSection } from 'redux-form';
import { connect } from 'react-redux';
import globalStyles from '../EditProperty.css';
import RenderMembers from './RenderMembers';
import Primary from './Primary'

class TeamSection extends React.Component {

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <form>
          <div className={globalStyles.fieldSet}>
            <FormSection name="primary">
              <Primary />
            </FormSection>
          </div>
          <button
            className={globalStyles.addBtn}
            onClick={this.props.handlePrimaryContactSubmit}
          >Update Primary Contact Information</button>
          <div className={globalStyles.fieldSet}>
            <FieldArray
              name="members"
              component={RenderMembers}
              handleSaveMember={this.props.handleSaveMember}
              handleDeleteMember={this.props.handleDeleteMember}
            />
          </div>
        </form>
      </div>
    );
  }
}

TeamSection = reduxForm({
  form: 'editPropertyTeam',
})(TeamSection);

TeamSection = connect(
  state => {
    const property = state.singleProperty.data.attributes;
    const members = Object.keys(state.staff).map(key => state.staff[key]);
    return ({
      initialValues: {
        primary: {
          contact: property.contact_name,
          email: property.email,
          phone: property.phone,
          public: true,
        },
        members,
      },
    });
  },
)(TeamSection);


export default withStyles(globalStyles)(TeamSection);
