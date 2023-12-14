import jwt from "jsonwebtoken";
import "dotenv/config";

const fetchUser = (req, res, next) => {
  // get the user from the jwt token and add it to req object
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({ error: "Please Authenticate using a valid token!" });
  }

  try {
    const { userId } = jwt.verify(token, "" + process.env.JWT_SECRET);
    req.userId = userId;
    console.log("fetched user : ", userId);

    next();

    //
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate using a valid token!" });
  }
};

export default fetchUser;
