import mongoose from "mongoose"

// to check whether the mongoose is connected or not 
let isConnected = false

export const connectToDB = async () => {
    // to prevent unknown field queries
    mongoose.set('strictQuery', true)

    // specific mongoDb Url to connect with 
    if (!process.env.MONGODB_URL) return console.log("MongoDB URL NOT FOUND")
    if (isConnected) return console.log("Already connected to MongoDB")

    try {
        await mongoose.connect(process.env.MONGODB_URL)

        isConnected = true
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }


}