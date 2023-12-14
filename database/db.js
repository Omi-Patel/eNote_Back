// mongodb+srv://omipatel7113:<password>@merndatabase.6u2jzyu.mongodb.net/
// "mongodb+srv://omipatel7113:<password>@merndatabase.6u2jzyu.mongodb.net/merndatabase",

import { connect } from "mongoose";

// const dns = require('dns');
// import dns from "dns";
// Set default result order for DNS resolution
// dns.setDefaultResultOrder("ipv4first");

const connectToMongo = async () => {
  try {
    await connect(
      "mongodb+srv://omipatel7113:omipatel7113@merndatabase.6u2jzyu.mongodb.net/eNotebook"
    );
    console.log("Connection Successfull!!");
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongo;
