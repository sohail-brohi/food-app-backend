const categorySchema = {
  $jsonSchema: {
    bsonType: "object",
    title: "Category document validation",
    properties: {
      _id: {
        bsonType: "objectId",
      },
      name: {
        bsonType: "string",
      },
      description: {
        bsonType: "string",
      },

      createdAt: {
        bsonType: "date",
      },
    },
    additionalProperties: true,
  },
};

module.exports = categorySchema;
