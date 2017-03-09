import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
  GraphQLList as ListType,
} from 'graphql';

import { PropertyAttributes } from '../common/propertyAttributes';

const propertyObjFields = new ObjectType({
  name: 'propertyObjFields',
  fields: {
    type: { type: StringType },
    id: { type: new NonNull(StringType) },
    attributes: { type: PropertyAttributes },
  },
});

const NewPropertyType = new ObjectType({
  name: 'NewPropertyType',
  fields: {
    type: { type: StringType },
    id: { type: new NonNull(StringType) },
    attributes: { type: PropertyAttributes },
  },
});


export default NewPropertyType;
