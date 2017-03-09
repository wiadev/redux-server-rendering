import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import s from './PromoCodes.css';

function PromoCodes({ title }) {
  return (
    <Layout>
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <p>...</p>
        </div>
      </div>
    </Layout>
  );
}

PromoCodes.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(s)(PromoCodes);
