import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLList as ListType,
  GraphQLFloat as FloatType,
} from 'graphql';
import moment from 'moment';
import createAt from '../common/createAt';

const invoice = new ObjectType({
  name: 'invoice',
  fields: {
    type: { type: StringType },
    id: { type: StringType },
    customer_name: { type: StringType, resolve: res => res.attributes.customer_name },
    customer_id: { type: StringType, resolve: res => res.attributes.customer_id },
    room_name: { type: StringType, resolve: res => res.attributes.room_name },
    room_id: { type: StringType, resolve: res => res.attributes.room_id },
    start_time: { type: StringType, resolve: res => moment(res.attributes.start_time.date).format('MM/DD/YYYY') },
    end_time: { type: StringType, resolve: res => moment(res.attributes.end_time.date).format('MM/DD/YYYY') },
    supplier_total: { type: FloatType, resolve: res => res.attributes.supplier_total },
    bizly_total: { type: FloatType, resolve: res => res.attributes.bizly_total },
    state: { type: StringType, resolve: res => res.attributes.state },
    created_at: { type: StringType, resolve: res => moment(res.attributes.created_at.date).format('MM/DD/YYYY') },
    updated_at: { type: StringType, resolve: res => moment(res.attributes.updated_at.date).format('MM/DD/YYYY') },
  },
});

const GetInvoicesType = new ObjectType({
  name: 'GetInvoicesType',
  fields: {
    data: { type: new ListType(invoice) },
  },
});


export default GetInvoicesType;
