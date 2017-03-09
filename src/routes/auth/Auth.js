import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import s from './Auth.css';
import LoginLayout from '../../components/LoginLayout';

class Auth extends React.Component {
  render() {
    return (
      <LoginLayout>
        <div className={s.root}>
          Please auth yourself!
        </div>
      </LoginLayout>
    );
  }
}


Auth.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(s)(Auth);
