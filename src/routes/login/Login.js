import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginLayout from '../../components/LoginLayout';
import s from './Login.css';
import { authUserRequest, getUserRequest } from '../../actions/user';
import history from '../../core/history';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      authUserRequest,
      getUserRequest,
    }, dispatch),
  };
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

@connect(mapStateToProps, mapDispatchToProps)

/**
  This is a proof of concept auth with GRaphQL and Redux
  */

class Login extends React.Component {

  componentDidMount() {

  }

  handleLoginForm(event) {
    event.preventDefault();
    const { username, password } = this.refs;
    this.props.actions.authUserRequest({
      email: username.value,
      password: password.value,
    }).then(() => {
      this.props.actions.getUserRequest().then((res) => {
        const user = res.user.getCurrentUser;
        if(user.id && user.attributes.roles[0].id < 10) {
          /**
            if role id < 10 it's an Admin role and should get redirected to list
          */
          history.push('/properties', { state: 'home' });
        }
      });
    });
  }

  redirectToRegister(event) {
    event.preventDefault();
    history.push('/register', { state: 'register' });
  }

  render() {

    const { title, user } = this.props;

    return (
      <LoginLayout>
        <div className={s.root}>
          <div className={s.container}>
            <h1 className={`${s.formTitle} text-center`}>{title}</h1>
            <p className={`${s.lead} text-center`}>Log in with your username or company email address.</p>
            <form
              method="post"
              onSubmit={event => this.handleLoginForm(event)} className={s.registerForm}
            >
              <div className={`${s.formGroup} col-xs-12 col-md-12`}>
                <label className={s.label} htmlFor="usernameOrEmail">
                  Username or email address:
                </label>
                <input
                  className={s.input}
                  id="usernameOrEmail"
                  type="email"
                  name="usernameOrEmail"
                  ref="username"
                  placeholder="Email address"
                  required
                  autoFocus
                />
              </div>
              <div className={`${s.formGroup} col-xs-12 col-md-12`}>
                <label className={s.label} htmlFor="password">
                  Password:
                </label>
                <input
                  className={s.input}
                  id="password"
                  ref="password"
                  type="password"
                  name="password"
                  required
                  placeholder="password"
                />
              </div>

              <button className={s.button} type="submit">
                Submit
              </button>

            </form>
          </div>

          <div className="col-md-12 text-center">
            <p className={s.registerHelper}>
            Wait! I dont have an account yet. <a href="/register" onClick={this.redirectToRegister}>
              Sign up here.
            </a>
            </p>
          </div>
        </div>
      </LoginLayout>
    );
  }
}

Login.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(s)(Login);
