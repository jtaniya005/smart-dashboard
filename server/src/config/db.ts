import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      console.error("MONGO_URI is not set in environment. Set MONGO_URI to your MongoDB connection string.");
      console.error("Example: MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority");
      process.exit(1);
    }

    console.log("Connecting to MongoDB...");

    await mongoose.connect(uri);

    console.log("MongoDB connected");
  } catch (error) {
    // Provide better guidance for common errors
    console.error("MongoDB connection error:", error instanceof Error ? error.message : error);

    if ((error as any)?.message?.includes("bad auth") || (error as any)?.name === "MongoServerError") {
      console.error("Authentication failed. Check that the username, password and database in MONGO_URI are correct.");
      console.error("Also ensure your IP is whitelisted in MongoDB Atlas or network access allows connections.");
    }

    process.exit(1);
  }
};