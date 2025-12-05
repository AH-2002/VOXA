import "server-only";
import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error("Can't connect to the database");
}

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB(dbName: string) {
  try {
    await client.connect();
    return client.db(dbName);
  } catch (error) {
    throw error;
  }
}

export async function getCollection(collectionName: string) {
  const db = await connectDB("myNextDB");
  if (db) return db.collection(collectionName);
  return null;
}
