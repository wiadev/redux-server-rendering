import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLList as ListType,
} from 'graphql';

import createAt from '../common/createAt';
import userRole from '../common/userRole';

const staffObj = new ObjectType({
  name: 'staffObj',
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
    referral_code: { type: StringType, resolve: res => res.attributes.referral_code },
    created_at: { type: createAt, resolve: res => res.attributes.created_at },
    updated_at: { type: createAt, resolve: res => res.attributes.updated_at },
    roles: { type: userRole, resolve: res => res.attributes.roles },
  },
});

const PropertiesStaffType = new ObjectType({
  name: 'PropertiesStaffType',
  fields: {
    data: { type: new ListType(staffObj) },
  },
});


export default PropertiesStaffType;
