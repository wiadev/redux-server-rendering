import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as ListType,
  GraphQLInt as IntType,
} from 'graphql';

import axios from 'axios';
import { API_KEY } from '../../constants/apiKey';
import { apiHost } from '../../config';
import UserPropertiesType from './Properties/UserProperties';


function fetchProperties(userId) {
  return axios({
    url: `${apiHost}/api/v2/users/${userId}/properties?include=rooms`,
    method: 'get',
    headers: {
      'api-key': API_KEY,
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    },
  })
  .then(response => response.data)
  .catch(error => error);
}

const rolePivot = new ObjectType({
  name: 'rolePivot',
  fields: {
    user_id: { type: IntType },
    role_id: { type: IntType },
    created_at: { type: StringType },
    updated_at: { type: StringType },
    object_type: { type: StringType },
    object_id: { type: IntType },
  },
});

const userRoles = new ObjectType({
  name: 'userRoles',
  fields: {
    id: { type: new NonNull(IntType) },
    name: { type: StringType },
    slug: { type: StringType },
    description: { type: StringType },
    level: { type: IntType },
    created_at: { type: StringType },
    updated_at: { type: StringType },
    pivot: { type: rolePivot },
  },
});

const attributes = new ObjectType({
  name: 'attributes',
  fields: {
    email: { type: new NonNull(StringType) },
    name: { type: StringType },
    first_name: { type: StringType },
    last_name: { type: StringType },
    last_login: { type: StringType },
    stripe_customer_id: { type: StringType },
    company: { type: StringType },
    profile_img_url: { type: StringType },
    phone: { type: StringType },
    phone2: { type: StringType },
    referral_code: { type: StringType },
    roles: { type: new ListType(userRoles) },
  },
});

const UserAuthType = new ObjectType({
  name: 'UserAuth',
  fields: {
    type: { type: new NonNull(StringType) },
    id: { type: new NonNull(StringType) },
    attributes: { type: attributes }, // research filed aliases to rename it to profile
    token: { type: StringType, resolve: res => res.attributes.token },
  },
});


export default UserAuthType;
