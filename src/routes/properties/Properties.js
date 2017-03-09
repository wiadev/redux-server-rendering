import React, { Children, PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import s from './Properties.css';

class Properties extends React.Component {

  render() {
    return (
      <Layout>
        <div>
          <div className={s.root}>
            <div className={s.container}>
              {this.props.children}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

Properties.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(s)(Properties);
