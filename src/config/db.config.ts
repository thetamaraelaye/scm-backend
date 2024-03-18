import mongoose,  { ConnectOptions, Error } from "mongoose";

// Set strict query mode for enhanced type safety
mongoose.set('strictQuery', true);

export async function startDB(): Promise<void> { 
  try {
    // Handle potential undefined environment variable gracefully
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:4000/scm-backend'; 
    await mongoose.connect(mongoUri, {
      
    });
    console.log("Database is connected");
  } catch (error) {
    console.error("Unable to connect to db cluster:", error.message); // Use console.error for errors
  }
}

// // Export the function for use elsewhere
// module.exports = startDB;
