import "server-only";
import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error("Missing DB_URI environment variable");
}

// Use globalThis to cache the client across serverless invocations
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(process.env.DB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  globalThis._mongoClientPromise = client.connect();
}

clientPromise = globalThis._mongoClientPromise;

export async function connectDB(dbName: string) {
  try {
    const client = await clientPromise;
    return client.db(dbName);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw new Error("Can't connect to the database");
  }
}

export async function getCollection(collectionName: string) {
  const db = await connectDB("myNextDB");
  return db.collection(collectionName);
}
