import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';
import UserDropdown from './UserDropdown';
import DashboardDropdown from './DashboardDropdown';

class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showUserDropdown: false,
      showDashboardDropdown: false,
    };

    this.toggleUserDropdown = this.toggleUserDropdown.bind(this);
    this.toggleDashboardDropdown = this.toggleDashboardDropdown.bind(this);
  }

  toggleUserDropdown(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      showUserDropdown: !this.state.showUserDropdown,
    });
  }

  toggleDashboardDropdown(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      showDashboardDropdown: !this.state.showDashboardDropdown,
    });
  }

  handleBodyClick() {
    this.setState({
      showUserDropdown: false,
      showDashboardDropdown: false,
    });
  }


  render() {
    const greeting = () => {
      return (
        <Link to="#" className={s.link} onClick={this.toggleUserDropdown}>
          Hi, {this.props.user.profile.attributes.name}!
        </Link>
      );
    };

    return (
      <div
        className={cx(s.root, this.props.className, 'col-md-8 col-xs-12')} role="navigation"
      >
        <ul className={`${s.navList} pull-right`}>
          <li className={s.navListItem}>
            <Link className={s.link} to="/message-center">Message Center</Link>
          </li>
          <li className={s.navListItem}>
            <Link className={s.link} to="/partner-support">Partner Support</Link>
          </li>
          <li className={s.navListItem}>
            <Link className={s.link} to="" onClick={this.toggleDashboardDropdown}>Dashboard</Link>
            {this.state.showDashboardDropdown ? <DashboardDropdown /> : null}
          </li>
          <li className={s.navListItem}>
            <span className={s.spacer}> | </span>
          </li>
          <li className={s.navListItem}>
            {this.props.user ? greeting() : <Link className={s.link} to="/login">Log in</Link>}
            {this.state.showUserDropdown ? <UserDropdown /> : null}
          </li>
        </ul>
      </div>
    );
  }
}

Navigation.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
};

export default withStyles(s)(Navigation);
