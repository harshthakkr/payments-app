const express = require("express");
const mongoose = require("mongoose");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { z } = require("zod");

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
    console.error(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

accountRouter.post("/transfer", async (req, res) => {
  try {
    const body = transferBody.safeParse(req.body);
    if (!body.success) {
      return res.status(411).json({ msg: "Invalid inputs" });
    }
    const { to, amount } = body.data;
    const sender = await Account.findOne({ user: req.id });
    if (sender.balance < amount) {
      return res.status(411).json({ msg: "Insufficient balance" });
    }
    await Account.findOneAndUpdate(
      { user: to },
      { $inc: { balance: +amount } }
    );
    await Account.findOneAndUpdate(
      { user: req.id },
      {
        $inc: {
          balance: -amount,
        },
      }
    );
    return res.status(200).json({ msg: "Transaction successfull" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = { accountRouter };
