const { MongoClient } = require("mongodb");

async function connectMongo() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);
  await client.connect();
  const dbName = process.env.MONGO_DATABASE || "daniel";
  return { client, db: client.db(dbName) };
}

module.exports = { connectMongo };
