import React from 'react';
import AdminProperties from './Properties';
import AddNewProperty from '../../components/Properties/AddNew/AddNewProperty';

const title = 'Bizly Admin Properties';

export default {

  path: '/admin-properties',
  action: () => {
    return {
      title,
      component: <AdminProperties title={title} />,
    };
  },

};
