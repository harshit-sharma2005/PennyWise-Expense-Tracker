const mongoose = require("mongoose")

/**
 * Connect to MongoDB with retries and exponential backoff.
 * Keeps the process alive and retries instead of exiting immediately.
 */
const connectDB = async (retries = 5, delay = 5000) => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // recommended options can be added here
        })
        console.log("connected to database")
    } catch (err) {
        console.error("error in connecting to database", err.message || err)

        if (retries > 0) {
            console.log(`Retrying to connect in ${delay / 1000}s... (${retries} attempts left)`)
            setTimeout(() => connectDB(retries - 1, Math.min(delay * 1.5, 60000)), delay)
        } else {
            console.error("Could not connect to database after multiple attempts. Will keep trying in background.")
            // Optionally: notify a monitoring service here
            // Do not call process.exit so the hosting platform (Render) won't mark it as a permanent failure
            setTimeout(() => connectDB(5, 5000), 60000) // schedule another round of retries later
        }
    }
}

module.exports = connectDB