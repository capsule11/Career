import { MongoClient, MongoClientOptions } from 'mongodb';
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// MongoDB Client for NextAuth
if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Mongoose connection for schema-based operations
let isConnected = false;

export const connectToMongoDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(uri, {
      bufferCommands: false,
    });
    isConnected = true;
    console.log('Connected to MongoDB with Mongoose');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

// Export the MongoClient promise for NextAuth
export default clientPromise;

// Alias for backward compatibility
export const connectDB = connectToMongoDB;
