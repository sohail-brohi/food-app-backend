const menuScheme = {
  $jsonSchema: {
    bsonType: "object",
    title: "Menu document validation",
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
      category: {
        bsonType: "objectId",
      },
      image_url: {
        bsonType: "string",
      },
      price: {
        bsonType: "int",
      },
      isAvailable: {
        bsonType: "bool",
      },
      rating: {
        bsonType: "int",
      },
      calories: {
        bsonType: "int",
      },
      protein: {
        bsonType: "number",
      },
      createdAt: {
        bsonType: "date",
      },
    },
    additionalProperties: true,
  },
};

module.exports = menuScheme;
