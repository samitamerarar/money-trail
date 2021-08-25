const express = require("express");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");

// Load Transaction model
const Transaction = require("../../models/Transaction");

// @route GET api/transactions
// @desc Get all transactions linked to a specific user
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Transaction.find({ userId: req.user.id })
      .then((txns) => res.json(txns))
      .catch((err) => console.log(err));
  }
);

// @route POST api/transactions/add
// @desc Add or Update transaction
// @access Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Transaction.findOne({
      userId: req.user.id,
      id: req.body.id,
    })
      .then((txn) => {
        if (txn) {
          txn.userId = req.user.id;
          txn.id = req.body.id;
          txn.name = req.body.name;
          txn.amount = req.body.amount;
          txn.category = req.body.category;
          txn.date = req.body.date;
          txn.save().then((txn) => res.json(txn));
        } else {
          const newTxn = new Transaction({
            userId: req.user.id,
            id: req.body.id,
            name: req.body.name,
            amount: req.body.amount,
            category: req.body.category,
            date: req.body.date,
          });
          newTxn.save().then((txn) => res.json(txn));
        }
      })
      .catch((err) => console.log(err)); // Mongo Error
  }
);

// @route DELETE api/transactions/:id
// @desc Delete transaction with given id
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Transaction.findById(req.params.id).then((txn) => {
      // Delete Transaction
      txn.remove().then(() => res.json({ success: true }));
    });
  }
);

module.exports = router;
