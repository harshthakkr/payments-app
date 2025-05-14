const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { z } = require("zod");
const { default: mongoose } = require("mongoose");

const accountRouter = express.Router();
accountRouter.use(authMiddleware);

const transferBody = z.object({
  to: z.string(),
  amount: z.number().positive(),
});

accountRouter.get("/balance", async (req, res) => {
  try {
    const { balance, user } = await Account.findOne({ user: req.id });
    return res.status(200).json({ balance, user });
  } catch (e) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

accountRouter.post("/transfer", async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const body = transferBody.safeParse(req.body);
    if (!body.success) {
      session.abortTransaction();
      return res.status(411).json({ msg: "Invalid inputs" });
    }
    const { to, amount } = body.data;
    const sender = await Account.findOne({ user: req.id }).session(session);
    if (sender.balance < amount) {
      session.abortTransaction();
      return res.status(411).json({ msg: "Insufficient balance" });
    }
    const receiver = await Account.findOne({ user: to }).session(session);
    if (!receiver) {
      session.abortTransaction();
      return res.status(400).json({ msg: "Account not found" });
    }
    await Account.updateOne(
      { user: to },
      { $inc: { balance: +amount } }
    ).session(session);
    await Account.updateOne(
      { user: req.id },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);
    await session.commitTransaction();
    return res.status(200).json({ msg: "Transaction successful" });
  } catch (e) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = { accountRouter };
