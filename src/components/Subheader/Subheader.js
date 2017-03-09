import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Subheader.css';

// TODO: do not display the last edited by when content is not available

class Subheader extends Component {
  render() {
    const {
      title,
      lastEditedBy,
      lastEditedTime,
      label,
      buttonAction,
    } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h3
            className={s.title}
          >
            { title } <span className={s.titleTag}><i>{ `Last edit was made yesterday at ${lastEditedTime} by ${lastEditedBy}` }</i></span>
          </h3>
          <button className={s.action} onClick={buttonAction}>{label}</button>
        </div>
      </div>
    );
  }
}

Subheader.defaultProps = {
  title: 'Properties',
  lastEditedBy: 'Last edit was made yesterday at 11:30AM by Alexis',
};

Subheader.propTypes = {
  title: PropTypes.string.isRequired,
  lastEditedBy: PropTypes.string,
  lastEditedTime: PropTypes.string,
  label: PropTypes.string,
  buttonAction: PropTypes.func,
};

export default withStyles(s)(Subheader);
