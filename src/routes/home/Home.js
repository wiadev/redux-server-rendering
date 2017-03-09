import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import s from './Home.css';

function Home() {
  return (
    <Layout>
      <div className={s.root}>
        <div className={s.container}>

        </div>
      </div>
    </Layout>
  );
}

Home.propTypes = { };

export default withStyles(s)(Home);
