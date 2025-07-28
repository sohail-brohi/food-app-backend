const menu_customizationScheme = {
  $jsonSchema: {
    bsonType: "object",
    title: "menu_customization document validation",
    properties: {
      _id: {
        bsonType: "objectId",
      },
      menu: {
        bsonType: "objectId",
      },
      customization: {
        bsonType: "objectId",
      },
      createdAt: {
        bsonType: "date",
      },
    },
    additionalProperties: true,
  },
};

module.exports = menu_customizationScheme;
