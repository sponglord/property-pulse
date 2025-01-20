import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // If the db is alreadty connected, don't try to connect again
  if (connected) {
    console.log("MongoDB is already connected...");
    return;
  }

  // Connect ot mongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB connected...");
  } catch (e) {
    console.log("MongoDB connection error, e=", e);
  }
};

export default connectDB;
