import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './user';
import userRegister from './userRegister';
import userProperties from './userProperties';
import createProperty from './createProperty';
import singleProperty from './getSingleProperty';
import getRoom from './getRoom';
import addRoom from './addRoom';
import getStaff from './getStaff';
import getPropertyEvents from './getPropertyEvents';
import propertyAmenity from './propertyAmenity';
import runtime from './runtime';
import getAddresses from './getAddresses';
import getEventDetails from './getEventDetails';
import getTags from './getAllTags';
import getPropertyDocuments from './getPropertyDocuments';
import customers from './getCustomers';
import invoices from './getInvoices';

export default combineReducers({
  user,
  userRegister,
  userProperties,
  createProperty,
  singleProperty,
  room: getRoom,
  staff: getStaff,
  propertyEvents: getPropertyEvents,
  propertyAmenity,
  addRoom,
  runtime,
  getAddresses,
  getEventDetails,
  form: formReducer,
  tags: getTags,
  propertyDocuments: getPropertyDocuments,
  customers,
  invoices,
});
