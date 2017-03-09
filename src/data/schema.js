import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import content from './queries/content';
import news from './queries/news';
import userAuth from './queries/userAuth';
import getCurrentUser from './queries/getCurrentUser';
import getUserProperties from './queries/getUserProperties';
import createProperty from './queries/Properties/CreateProperty';
import getSingleProperty from './queries/Properties/GetSingleProperty';
import updateSingleProperty from './queries/Properties/UpdateSingleProperty';
import room from './queries/room';
import addRoom from './queries/Rooms/AddRoom';
import updateRoom from './queries/Rooms/UpdateRoom';
import getStaff from './queries/Properties/GetStaff';
import getPropertyEvents from './queries/Events/getPropertyEvents';
import getRoom from './queries/Rooms/GetRoom';
import updatePolicy from './queries/Properties/UpdatePolicy';
import uploadDocument from './queries/Uploads/UploadDocument';
import updateAmenity from './queries/Properties/UpdateAmenity';
import createAmenity from './queries/Properties/CreateAmenity';
import getAddresses from './queries/Properties/GetAddresses';
import createPropertyEvent from './queries/Events/createPropertyEvent';
import getEventDetails from './queries/Events/getEventDetails';
import getAllTags from './queries/GetAllTags';
import getPropertyDocuments from './queries/Uploads/GetPropertyDocuments';
import getCustomers from './queries/Properties/GetCustomers';
import getInvoices from './queries/Properties/getInvoices';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      userAuth,
      getCurrentUser,
      getUserProperties,
      createProperty,
      getSingleProperty,
      updateSingleProperty,
      getStaff,
      getPropertyEvents,
      me,
      content,
      news,
      room,
      addRoom,
      getRoom,
      updateRoom,
      updatePolicy,
      uploadDocument,
      getPropertyDocuments,
      updateAmenity,
      createAmenity,
      getAddresses,
      createPropertyEvent,
      getEventDetails,
      getAllTags,
      getCustomers,
      getInvoices,
    },
  }),
});

export default schema;
