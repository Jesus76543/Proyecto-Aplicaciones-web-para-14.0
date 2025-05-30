import mongoose from "mongoose";

const connectDB = async (): Promise<void> =>{
const mongoUri= "mongodb://ramiro:ramiro05@localhost:27017?authSource=user"; // Replace with your MongoDB URI
try{
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
} catch (error) {
    console.log("Error connecting to MongoDB:", error);
}

}
export default connectDB;