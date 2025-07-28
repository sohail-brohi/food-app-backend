const userSchema = {
  $jsonSchema: {
    bsonType: "object",
    title: "User document validation",
    required: ["fullName", "email", "password"],
    properties: {
      _id: {
        bsonType: "objectId",
      },
      fullName: {
        bsonType: "string",
      },
      email: {
        bsonType: "string",
      },
      password: {
        bsonType: "string",
      },
      role: {
        enum: ["user", "admin"],
        description: "Must be one of the enum values",
      },
      createdAt: {
        bsonType: "date",
      },
    },
    additionalProperties: true,
  },
};

module.exports = userSchema;
