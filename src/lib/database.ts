import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local"
	);
}

interface CachedConnection {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}

interface GlobalWithMongoose {
	mongoose?: CachedConnection;
}

let cached: CachedConnection = (global as GlobalWithMongoose).mongoose || {
	conn: null,
	promise: null,
};

if (!cached) {
	cached = (global as GlobalWithMongoose).mongoose = {
		conn: null,
		promise: null,
	};
}

export async function connectDB() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		cached.promise = mongoose
			.connect(MONGODB_URI, opts)
			.then((mongoose) => {
				return mongoose;
			});
	}

	try {
		cached.conn = await cached.promise;
		console.log("MongoDB connected");
	} catch (e) {
		cached.promise = null;
		console.log("MongoDB connection error:", e);
		throw e;
	}

	return cached.conn;
}
