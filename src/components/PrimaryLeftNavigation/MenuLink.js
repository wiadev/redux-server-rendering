import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';
import s from './MenuLink.css';
import Link from '../Link';
import { isActiveRouteDeep } from '../../core/isActiveRoute';

class MenuLink extends Component {
  render() {
    const { children, text, className, index } = this.props;

    return (
      <li className={s.rootAction}>
        <a
          className={`${s.primaryLink} ${className}`}
          onClick={() => this.props.toggle(index)}
        >
          {text}
        </a>

        <div className={`childClasses ${s.children}`}>
          {children}
        </div>
      </li>
    );
  }
}

MenuLink.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.any,
};

export default withStyles(s)(MenuLink);
