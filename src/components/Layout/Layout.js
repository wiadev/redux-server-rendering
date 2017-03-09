import React, { Children, PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import s from './Layout.css';
import Header from '../Header';
import PrimaryLeftNavigation from '../PrimaryLeftNavigation'
import Footer from '../Footer';
import { getUserRequest } from '../../actions/user';
import cookie from 'react-cookie';

// TODO: Pass new subtitle based on current route

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getUserRequest
    }, dispatch)
  };
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Layout extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }


  getUser() {
    const auth_token = typeof(window) != 'undefined' ? window.localStorage.getItem('auth_token') : null
    return this.props.user.auth ? this.props.user.profile : this.props.actions.getUserRequest()
  }

  render() {
    return (
      <div>
        <Header user={this.props.user} />
        {Children.only(this.props.children)}
        {/* TODO: refactor this out */}
        <div className="clearfix"></div>

        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default withStyles(s)(Layout);
