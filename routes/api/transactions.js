const express = require('express');
const router = express.Router();
const passport = require('passport');
const moment = require('moment');

// Load Transaction model
const Transaction = require('../../models/Transaction');

// @route GET api/transactions
// @desc Get all transactions linked to a specific user
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Transaction.find({ userId: req.user.id })
        .then((txns) => res.json(txns))
        .catch((err) => console.log(err));
});

// @route POST api/transactions/add
// @desc Add transaction
// @access Private
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const newTxn = new Transaction({
        userId: req.user.id,
        merchant: req.body.merchant,
        category: req.body.category,
        amount: req.body.amount,
        date: req.body.date,
        type: req.body.type
    });

    newTxn
        .save()
        .then((txn) => res.json(txn))
        .catch((err) => console.log(err)); // Mongo Error
});

// @route POST api/transactions/edit
// @desc Update or Add transaction
// @access Private
router.post('/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
    Transaction.findOne({
        userId: req.user._id,
        _id: req.body.id
    })
        .then((txn) => {
            if (txn) {
                txn.merchant = req.body.merchant;
                txn.category = req.body.category;
                txn.amount = req.body.amount;
                txn.date = req.body.date;
                txn.type = req.body.type;
                txn.save().then((txn) => res.json(txn));
            } else {
                const newTxn = new Transaction({
                    userId: req.user.id,
                    merchant: req.body.merchant,
                    category: req.body.category,
                    amount: req.body.amount,
                    date: req.body.date,
                    type: req.body.type
                });
                newTxn.save().then((txn) => res.json(txn));
            }
        })
        .catch((err) => console.log(err)); // Mongo Error
});

// @route DELETE api/transactions/:id
// @desc Delete transaction with given id
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Transaction.findById(req.params.id).then((txn) => {
        // Delete Transaction
        txn.remove().then(() => res.json({ success: true }));
    });
});

module.exports = router;
