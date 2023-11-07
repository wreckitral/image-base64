const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const connect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, { dbName: "testingDb" });
  console.log(`MongoDB is connected to ${mongoUri}`); 
};

module.exports = connect;
