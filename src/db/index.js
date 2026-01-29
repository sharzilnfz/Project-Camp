import 'dotenv/config';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_DB_URL);

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log('MongoDb Connected!');
  } catch (error) {
    console.error('Mongo DB connection error', error);
    process.exit(1);
  }
};
