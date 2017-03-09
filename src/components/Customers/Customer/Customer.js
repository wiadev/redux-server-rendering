import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import moment from 'moment';
import history from '../../../core/history';
import s from './Customer.css';

function Customer({ item, viewCustomerDetails }) {
  return (
    <tr className={`${s.propertyItem}`} onClick={() => viewCustomerDetails(item.id)}>
      <td className={`${s.imageCell} ${s.dataCell} `}>
        <img
          className={`img-circle ${s.profileImg}`}
          src={item.profile_img_url || 'https://1x.com/images/profile/-square.jpg'}
          alt={item.name}
        />
      </td>
      <td className={`${s.nameCell} ${s.dataCell}`}>
        <h3 className={s.name}>{item.name}</h3>
        <p className={s.memberDate}>Member Since {item.created_at}</p>
      </td>
      <td className={`${s.companyCell} ${s.dataCell}`}>
        <p className={s.customerText}>{item.company}</p>
      </td>
      <td className={`${s.emailCell} ${s.dataCell}`}>
        <p className={s.customerText}>{item.email}</p>
      </td>
      <td className={`${s.infoCell} ${s.dataCell}`}>
        <span className={`${s.userInfo} ${s.profileIcon}`}></span>
        <span className={`${s.userInfo} ${s.messageIcon}`}></span>
        <span className={`${s.userInfo} ${s.emailIcon}`}></span>
      </td>
    </tr>
  );
}

Customer.propTypes = {
  item: PropTypes.object,
  rooms: PropTypes.array,
};

export default withStyles(s)(Customer);
