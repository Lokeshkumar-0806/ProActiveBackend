const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://lokeshkr0806_db_user:admin123@cluster0.oka3vv6.mongodb.net/?appName=Cluster0');
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}
module.exports = connectDB;