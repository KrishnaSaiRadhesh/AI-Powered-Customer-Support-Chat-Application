const mongoose = require('mongoose')

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected')
    } catch (error) {
        console.error("Error Ocurred", error)
    }
}

module.exports = connectdb;