// import dependencies
const mongoose = require('mongoose')

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('MongoDB connected Successfully')
    } catch (error) {
        console.log('MongoDB Error', error)
    }
}


module.exports = connectToDb