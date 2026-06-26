import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB is Connected");
    } catch (error) {
        console.error(`MongoDb connection Failed with error : ${error}`);
    }
}


export default connectDB;