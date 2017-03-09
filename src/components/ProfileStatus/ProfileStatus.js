import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CircularProgressBar from 'react-circular-progressbar';
import Link from '../Link';
import s from './ProfileStatus.css';
import CONTENT from './content';

class ProfileStatus extends Component {
  render() {
    const { status } = this.props;
    const { message, footer } = CONTENT[status];

    return (
      <div className={s.container}>

        <div className={`${s.header} clearfix`}>

          <div className="col-md-4 nopadding">
            <CircularProgressBar percentage={80} />
          </div>

          <div className={`${s.message} col-md-8 nopadding`}>
            <h3 className={s.messageTitle}>{ message.messageTitle }</h3>
            <p className={s.messageSubtitle}>{ message.messageSubtitle }</p>
            {
              message.showTips ?
                <Link to="#">Show Help Tips</Link> : null
            }
          </div>

        </div>

        <div className={s.footer}>
          <h4 className={s.footerTitle}>{ footer.title }</h4>
          {
            footer.showSubmit ?
              <a
                className={s.footerAction}
                href="/submit-for-approval"
              >
                  Submit for approval
              </a>
            :
              <p className={s.footerSubtitle}><em>{ footer.subTitle }</em></p>
          }

        </div>
      </div>
    );
  }
}

ProfileStatus.defaultProps = {
  status: 'PENDING',
};

ProfileStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

export default withStyles(s)(ProfileStatus);
