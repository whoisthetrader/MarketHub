const mongoose = require('mongoose');
const dotenv=require('dotenv');

dotenv.config();

async function mongoConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database connected successfully');
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

module.exports=mongoConnect