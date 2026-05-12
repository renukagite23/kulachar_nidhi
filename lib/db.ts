import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  );
}

// Narrowing for TypeScript
const uri: string = MONGODB_URI;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('Connecting to MongoDB...');
    // Mask password in logs
    const maskedUri = uri.replace(/:([^@]+)@/, ':****@');
    console.log(`Using URI: ${maskedUri}`);

    cached.promise = mongoose
      .connect(uri, opts)
      .then((mongoose) => {
        console.log('MongoDB Connected Successfully');
        return mongoose;
      })
      .catch((err) => {
        console.error('MongoDB Connection Error:', err);
        throw err;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

export default dbConnect;