import express from "express";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post("/register", body("email").isEmail(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: "Invaild details" });
    }
    const { email, password, name } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "", err: "user already exist" });
    } else {
      const newUser = await userModel.create({ email, password, name });
      if (newUser) {
        const userDetails = {
          name: newUser.name,
          email: newUser.email,
          id: newUser._id,
        };
        const token = jwt.sign(userDetails, process.env.JWT_SECRET);
        res.status(200).json({ msg: "Logged In", token: token });
      } else {
        res.status(400).json({ msg: "", err: "Invaild details" });
      }
    }
  } catch (err) {
    res.status(500).json({ msg: "", err: "Internal Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user && user.password === password) {
      const userDetails = { name: user.name, email: user.email, id: user._id };
      const token = jwt.sign(userDetails, process.env.JWT_SECRET);
      res.status(200).json({ msg: "Logged In", token: token });
    } else {
      res.status(400).json({ msg: "", err: "Invaild Credentials" });
    }
  } catch (err) {
    res.status(500).json({ msg: "", err: "Internal Server error" });
  }
});

export default router;
