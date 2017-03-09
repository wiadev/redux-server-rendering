import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const documentObject = new ObjectType({
  name: 'documentObject',
  fields: {
    id: { type: IntType },
    name: { type: StringType },
    slug: { type: StringType },
    description: { type: StringType },
    wifi_details: { type: StringType },
    property_id: { type: IntType },
    room_type_id: { type: IntType },
    status: { type: IntType },
    created_at: { type: StringType },
    updated_at: { type: StringType },
    moderated_at: { type: StringType },
    moderated_by: { type: IntType },
  },
});

const UploadDocument = new ObjectType({
  name: 'UploadDocument',
  fields: {
    type: { type: StringType },
    id: { type: StringType },
    name: { type: StringType, resolve: res => res.attributes.name },
    description: { type: StringType, resolve: res => res.attributes.description },
    document_type_id: { type: IntType, resolve: res => res.attributes.document_type_id },
    image_url: { type: StringType, resolve: res => res.attributes.image_url },
    status: { type: IntType, resolve: res => res.attributes.status },
    object_type: { type: StringType, resolve: res => res.attributes.object_type },
    object_id: { type: IntType, resolve: res => res.attributes.object_id },
    object: { type: documentObject, resolve: res => res.attributes.object },
  },
});

export default UploadDocument;


/**

{
  "data": {
    "type": "document",
    "id": "3",
    "attributes": {
      "name": "This is the name",
      "description": "This is the description",
      "document_type_id": 1,
      "type": null,
      "image_url": "https://res.cloudinary.com/hdd626jg7/image/upload/v1480687139/documents/phpayQbMj_zjgujt.png",
      "status": 1,
      "object_type": "App\\Models\\Room",
      "object_id": "41",
      "object": {
        "id": 41,
        "name": "The Boardroom",
        "slug": "the-boardroom",
        "description": "<ul><li>Room seats 22</li><li>700 square&nbsp;feet</li><li>Walnut table</li><li>Built-in blackboard</li><li>Complimentary Wi-Fi</li><li>Additional AV may require fee</li><li>Room located on basement level</li></ul>",
        "wifi_details": "acenewyork/AceBoardRoom",
        "property_id": 2581,
        "room_type_id": 1,
        "status": 1,
        "created_at": "2015-06-04 20:43:34",
        "updated_at": "2015-06-04 20:43:34",
        "moderated_at": "2015-06-04 20:43:34",
        "moderated_by": 71
      },
      "links": [
        {
          "rel": "self",
          "uri": "/api/v2/document/3"
        }
      ]
    }
  }
}

*/



/**
{
  "data": [
    {
      "type": "documenttype",
      "id": "1",
      "attributes": {
        "name": "Catering Menu",
        "description": "",
        "icon_url": "",
        "links": [
          {
            "rel": "self",
            "uri": "/api/v2/documenttype/1"
          }
        ]
      }
    },
    {
      "type": "documenttype",
      "id": "2",
      "attributes": {
        "name": "Events Brochure",
        "description": "",
        "icon_url": "",
        "links": [
          {
            "rel": "self",
            "uri": "/api/v2/documenttype/2"
          }
        ]
      }
    },
    {
      "type": "documenttype",
      "id": "3",
      "attributes": {
        "name": "Floorplan",
        "description": "",
        "icon_url": "",
        "links": [
          {
            "rel": "self",
            "uri": "/api/v2/documenttype/3"
          }
        ]
      }
    }
  ]
}

*/
