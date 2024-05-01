

import { connect } from "mongoose";
import "dotenv/config";


const connectToMongo = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("Connection Successfull!!");
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongo;
