import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not defined");

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Prevent multiple connections in dev
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any)._mongoClientPromise = client.connect();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
