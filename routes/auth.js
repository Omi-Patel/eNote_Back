import express from "express";
const router = express.Router();
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import fetchUser from "../middleware/fetchUser.js";

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please Fill the Data..!" });
    }

    // Email validation
    if (!email.includes("@")) {
      return res
        .status(400)
        .json({ error: "Please Enter Valid Credentials..!" });
    }

    // Find unique user with email
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User Already Exists!" });
    }

    // Generate sale
    const salt = await bcrypt.genSalt(10);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save data into database
    const newUser = await User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log(newUser);

    res.status(200).json({ success: "Signup Successfully..!" });
    //
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error!");
  }
});

router.post("/login", async (req, res) => {
  // data from body- frontend
  const { email, password } = req.body;

  try {
    // validation
    if (!email || !password) {
      return res.status(400).json({ error: "Please Fill the Data!" });
    }

    // email validation
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Invalid Credential..!" });
    }

    // Find unique user with email
    const user = await User.findOne({ email });
    console.log(user);

    // if user not found
    if (!user) {
      return res.status(400).json({ error: "User Not Found!" });
    }

    // matching user password to hash password with bcrypt.compare()
    const doMatch = await bcrypt.compare(password, user.password);
    console.log(doMatch);

    // if password mathched then generate token
    if (doMatch) {
      const token = jwt.sign({ userId: user.id }, "" + process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(201).json({ token, success: "Login Successfull!" });
    } else {
      res.status(400).json({ error: "Email and Password Not Found!" });
    }

    //
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error!");
  }
});

router.get("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.userId;
    console.log("getuser Id : ", userId);
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error!");
  }
});

export default router;
