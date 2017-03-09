import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginLayout from '../../components/LoginLayout';
import s from './Register.css';
import { authUserRequest } from '../../actions/user';
import history from '../../core/history';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      authUserRequest
    }, dispatch)
  };
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

@connect(mapStateToProps, mapDispatchToProps)

class Register extends React.Component {

  componentDidMount() {
    console.log(this);
  }

  handleRegisterForm(event) {
    event.preventDefault();
    const { username, password } = this.refs;
    this.props.actions.authUserRequest({
      email: username.value,
      password: password.value
    }).then(res => {
      res.user.userAuth.id ? history.push("/", {state: 'home'}) : null
    })
  }

  redirectToLogin(event) {
    event.preventDefault();
    history.push('/login', {state: 'login'})
  }

  render() {

    const { title, user } = this.props;

    return (
      <LoginLayout>
        <div className={s.root}>
          <div className={s.container}>
            <h1 className={`${s.formTitle} text-center`}>{title}</h1>
              <form method="post" onSubmit={ event => this.handleRegisterForm(event)} className={s.registerForm}>

              <div className={`${s.formGroup} col-xs-12 col-md-6`}>
                <label className={s.label} htmlFor="firstName">
                  First name:
                </label>
                <input
                  className={s.input}
                  id="firstName"
                  type="text"
                  name="firstName"
                  ref="firstName"
                  placeholder="First name"
                  required
                />
              </div>

              <div className={`${s.formGroup} col-xs-12 col-md-6`}>
                <label className={s.label} htmlFor="lastName">
                  Last name:
                </label>
                <input
                  className={s.input}
                  id="lastName"
                  type="text"
                  name="lastName"
                  ref="lastName"
                  placeholder="Last name"
                  required
                />
              </div>

              <div className={`${s.formGroup} col-xs-12 col-md-12`}>
                <label className={s.label} htmlFor="userEmail">
                  Email address:
                </label>
                <input
                  className={s.input}
                  id="userEmail"
                  type="email"
                  name="userEmail"
                  ref="userEmail"
                  placeholder="Email address"
                  required
                />
              </div>
              <div className={`${s.formGroup} col-xs-12 col-md-6`}>
                <label className={s.label} htmlFor="password">
                  Password:
                </label>
                <input
                  className={s.input}
                  id="password"
                  ref="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className={`${s.formGroup} col-xs-12 col-md-6`}>
                <label className={s.label} htmlFor="confirmPassword">
                  Confirm Password:
                </label>
                <input
                  className={s.input}
                  id="confirmPassword"
                  ref="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <div className={`${s.formGroup} col-xs-12 col-md-6`}>
                <label className={s.label} htmlFor="contactNumber">
                  Contact number
                </label>
                <input
                  className={s.input}
                  id="contactNumber"
                  type="text"
                  name="contactNumber"
                  ref="contactNumber"
                  placeholder="Contact Number"
                  required
                />
              </div>

              <div className={`${s.formGroup} col-xs-12 col-md-6`}>
                <label className={s.label} htmlFor="jobTitle">
                  Job Title
                </label>
                <input
                  className={s.input}
                  id="jobTitle"
                  type="text"
                  name="jobTitle"
                  ref="jobTitle"
                  placeholder="Job Title"
                  required
                />
              </div>

              <button className={`${s.button} btn-block`} type="submit">Submit</button>

            </form>
          </div>
          <div className="col-md-12 text-center">
            <p className={s.registerHelper}>
              Wait! I already have an account. <a href="/login" onClick={this.redirectToLogin}>
                Log in here.
              </a>
            </p>
          </div>
        </div>
      </LoginLayout>
    );
  }
}

Register.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(s)(Register);
