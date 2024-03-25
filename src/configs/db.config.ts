import mongoose from "mongoose";

// Set strict query mode for enhanced type safety
mongoose.set('strictQuery', true);

export default async function startDB(): Promise<void> { 
  try {
    // Handle potential undefined environment variable gracefully
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:4000/scm-backend'; 
    await mongoose.connect(mongoUri, {
      
    });
    console.log("Database is connected");
  } catch (error: any) {
    console.error(`Error connecting to database server: ${error.message}`)// Use console.error for errors
  }
}

//Export the function for use elsewhere
module.exports = startDB;
