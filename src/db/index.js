import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('MongoDb Connected!');
  } catch (error) {
    console.error('Mongo DB connection error', error);
    process.exit(1);
  }
};
