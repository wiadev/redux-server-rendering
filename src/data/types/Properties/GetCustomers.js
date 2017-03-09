import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLList as ListType,
} from 'graphql';
import moment from 'moment';
import createAt from '../common/createAt';

const customer = new ObjectType({
  name: 'customer',
  fields: {
    type: { type: StringType },
    id: { type: StringType },
    name: { type: StringType, resolve: res => res.attributes.name },
    email: { type: StringType, resolve: res => res.attributes.email },
    first_name: { type: StringType, resolve: res => res.attributes.first_name },
    last_name: { type: StringType, resolve: res => res.attributes.last_name },
    last_login: { type: StringType, resolve: res => res.attributes.last_login },
    company: { type: StringType, resolve: res => res.attributes.company },
    profile_img_url: { type: StringType, resolve: res => res.attributes.profile_img_url },
    phone: { type: StringType, resolve: res => res.attributes.phone },
    phone2: { type: StringType, resolve: res => res.attributes.phone2 },
    created_at: { type: StringType, resolve: res => moment(res.attributes.created_at.date).format('DD/YYYY') },
    updated_at: { type: createAt, resolve: res => res.attributes.updated_at },
  },
});

const GetCustomersType = new ObjectType({
  name: 'GetCustomersType',
  fields: {
    data: { type: new ListType(customer) },
  },
});


export default GetCustomersType;
