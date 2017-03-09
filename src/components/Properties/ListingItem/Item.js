import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import moment from 'moment';
import history from '../../../core/history';
import s from './ListingItem.css';

function ListingItem({ item, rooms }) {
  return (
    <tr className={s.propertyItem} onClick={() => history.push(`/properties/${item.id}/edit`, { state: 'EditProperty' })}>
      <td className={`${s.propNameCell} ${s.dataCell}`}>
        <img
          className={s.image}
          src={item.attributes.image_url}
          alt={item.attributes.display_name}
        />
        <div className="col-md-7">
          <h4 className={s.hotelTitle}>{item.attributes.display_name}</h4>
          <p className={s.rooms}><em>Rooms: </em>{rooms.join(', ')}</p>
        </div>
      </td>
      <td className={`${s.propLocationCell} ${s.dataCell}`}>
        <p>{`${item.attributes.city} ${item.attributes.state}`}</p>
      </td>
      <td className={`${s.propIdCell} ${s.dataCell}`}>
        <p>#{item.id}</p>
      </td>
      <td className={`${s.propPriceCell} ${s.dataCell}`}>
        <p>${item.attributes.starting_at}+</p>
      </td>
      <td className={`${s.propDateCell} ${s.dataCell}`}>
        <p>{item.attributes.details ? moment(item.attributes.details.updated_at).format('MMM DD, YYYY') : null }</p>
      </td>
      <td className={`${s.propStatusCell} ${s.dataCell}`}>
        <span className={s.status}>{item.attributes.details && item.attributes.details.status === '1' ? 'LIVE' : 'N/A'}</span>
      </td>
    </tr>
  );
}

ListingItem.propTypes = {
  item: PropTypes.object,
  rooms: PropTypes.array,
};

export default withStyles(s)(ListingItem);
