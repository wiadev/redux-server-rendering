import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PropertySubheader.css';
import Link from '../Link';

function PropertySubheader({ property }) {

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className="col-md-2">
          <img
            className={s.propertyImage}
            width="170" src={property.data.attributes.image_url}
            alt=""
          />
        </div>
        <h3 className={`${s.title} col-md-3`}>
          {property.data.attributes.display_name}
        </h3>
        <div className={`${s.buttons} col-md-5 pull-right`}>
          <div className="col-md-6">
            <Link to={'#'} className={`${s.preview} btn`}>Preview Listing</Link>
          </div>
          <div className="col-md-6">
            <button className={`${s.save} btn`}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(s)(PropertySubheader);
