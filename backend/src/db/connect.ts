import mongoose from "mongoose"

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
    } catch (error) {
        console.log(error)
        throw new Error("Cannot Connect to MongoDB")
    }
}

async function disconnectToDatabase() {
    try {
        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
        throw new Error("Cannot Disconnect to MongoDB")
    }
}

export { connectToDatabase, disconnectToDatabase }