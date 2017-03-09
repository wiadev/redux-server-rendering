import React, { Component, PropTypes } from 'react';
import history from '../../core/history';
import isActiveRoute, { isActiveRouteDeep } from '../../core/isActiveRoute';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    history.push(this.props.to);
  }

  render() {
    const { to, activeClassName, activeParentClassName, children, ...props } = this.props;
    const className = activeClassName || activeParentClassName;
    if ((activeClassName || activeParentClassName) && history.location) {
      if (
        (activeClassName && isActiveRoute(to)) ||
        (activeParentClassName && isActiveRouteDeep(to))) {
        if (props.className) {
          props.className += ` ${className}`;
        } else {
          props.className = activeClassName;
        }
      }
    }

    return <a href={to} {...props} onClick={this.handleClick}>{children}</a>;
  }

}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
  activeClassName: PropTypes.string,
  activeParentClassName: PropTypes.string,
};

export default Link;
