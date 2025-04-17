const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");

const userRouter = express.Router();

const signupBody = z.object({
  firstName: z.string().trim().min(2).max(20),
  lastName: z.string().trim().min(2).max(20).optional(),
  username: z.string().trim().toLowerCase().min(2).max(20),
  password: z.string().trim().min(6).max(20),
  age: z.number().positive(),
});

const signinBody = z.object({
  username: z.string().trim().toLowerCase().min(2).max(20),
  password: z.string().trim().min(6).max(20),
});

const editBody = z.object({
  password: z.string().trim().min(6).max(20).optional(),
  firstName: z.string().trim().min(2).max(20).optional(),
  lastName: z.string().trim().min(2).max(20).optional(),
});

userRouter.post("/signup", async (req, res) => {
  try {
    const body = signupBody.safeParse(req.body);
    if (!body.success) {
      return res.status(400).send({ msg: `Incorrect input` });
    }
    const { firstName, lastName, username, password, age } = body.data;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .send({ msg: `User with this username already exists` });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      age,
    });

    await Account.create({
      user: newUser._id,
      balance: 1 + Math.floor(Math.random() * 1000),
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    return res.status(201).json({ msg: `User created successfully`, token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: `Internal sever error` });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const body = signinBody.safeParse(req.body);
    if (!body.success) {
      return res.status(400).json({ msg: `Incorrect input` });
    }
    const { username, password } = body.data;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      if (bcrypt.compare(password, existingUser.password)) {
        const token = jwt.sign(
          { id: existingUser._id },
          process.env.JWT_SECRET
        );
        return res
          .status(200)
          .json({ msg: `User logged in successfully`, token });
      }
      return res.status(201).json({ msg: `Incorrect password` });
    }
    return res.status(400).json({ msg: `User doesn't exist, Please sign up` });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: `Internal server error` });
  }
});

userRouter.use(authMiddleware);

userRouter.put("/", async (req, res) => {
  try {
    const { success, data } = editBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({ msg: `Invalid input` });
    }
    if (data.password) {
      req.body.password = await bcrypt.hash(data.password, 12);
    }
    await User.findOneAndUpdate({ _id: req.id }, req.body);
    return res.status(200).json({ msg: `User details updated successfully` });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ msg: `Internal server error` });
  }
});

userRouter.get("/bulk", async (req, res) => {
  try {
    const { filter } = req.query;
    const matchingUsers = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    }).select({
      username: 1,
      firstName: 1,
      lastName: 1,
    });
    return res.status(200).json({ matchingUsers });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ msg: `Internal server error` });
  }
});

module.exports = {
  userRouter,
};
