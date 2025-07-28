const customizationScheme = {
  $jsonSchema: {
    bsonType: "object",
    title: "customization document validation",
    properties: {
      _id: {
        bsonType: "objectId",
      },
      name: {
        bsonType: "string",
      },
      price: {
        bsonType: "number",
      },
      type: {
        enum: [
          "topping",
          "sauce",
          "side",
          "size",
          "crust",
          "bread",
          "spice",
          "base",
          "other",
        ],
        description: "Must be one of the enum values",
      },

      createdAt: {
        bsonType: "date",
      },
    },
    additionalProperties: true,
  },
};

module.exports = customizationScheme;
