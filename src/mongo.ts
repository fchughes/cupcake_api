import { MongoClient } from "mongodb";

const mongo_client: MongoClient = new MongoClient(
  process.env.DATABASE_CONNECTIONSTRING as string
);

export default mongo_client;