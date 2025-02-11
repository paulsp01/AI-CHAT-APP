import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

function connectDB() {
    // Database connection
    mongoose.connect(process.env.MONGO_CONNECTION_URL)
    .then(() => {
        console.log('Database connected.');
    })
    .catch(err => {
        console.log('Connection failed.', err);
    });
}

export default connectDB;