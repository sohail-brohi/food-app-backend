const { MongoClient, ServerApiVersion } = require("mongodb");
const userSchema = require("./models/user.model");
const categorySchema = require("./models/categories.modal");
const menuScheme = require("./models/menu.modal");
const customizationScheme = require("./models/customizations.modal");
const menu_customizationScheme = require("./models/menu_customization.modal");

const dbCollections = [
  {
    collectionName: "users",
    schema: userSchema,
  },
  {
    collectionName: "category",
    schema: categorySchema,
  },
  {
    collectionName: "menu",
    schema: menuScheme,
  },
  {
    collectionName: "customization",
    schema: customizationScheme,
  },
  {
    collectionName: "menu_customization",
    schema: menu_customizationScheme,
  },
];

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;
const client = new MongoClient(uri, {
  connectTimeoutMS: 3600000, // 60 minutes
  serverSelectionTimeoutMS: 3600000, // 60 minutes
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectToDB = async () => {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!", dbName);
    //Collections instantiation
    console.log("Instantiating database collections...");
    const collections = await client.db(dbName).listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);
    for (let collection of dbCollections) {
      if (!collectionNames.includes(collection.collectionName))
        await client.db(dbName).createCollection(collection.collectionName);
      await client.db(dbName).command({
        collMod: collection.collectionName,
        validator: collection.schema,
      });
    }
    console.log("Collections instantiated!");
  } catch (e) {
    console.error(e);
  }
};

const getCollection = (collectionName) => {
  return client.db(dbName).collection(collectionName);
};

module.exports = {
  connectToDB,
  getCollection,
};
