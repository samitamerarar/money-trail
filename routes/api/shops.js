const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Shop model
const Shop = require('../../models/Shop');

// @route POST api/shops/add
// @desc Add shops
// @access Private
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    let array = [];
    for (const shop of req.body.shops) {
        array.push(
            new Shop({
                userId: req.user.id,
                name: shop,
                category: req.body.category
            })
        );
    }
    Shop.insertMany(array)
        .then((shops) => {
            res.json(shops);
        })
        .catch((err) => console.log(err));
});

// @route DELETE api/shops/:ids
// @desc Delete shops with given array of ids
// @access Private
router.delete('/:ids', passport.authenticate('jwt', { session: false }), (req, res) => {
    var shopsIds = req.params.ids.split(',');
    Shop.find({
        _id: { $in: shopsIds }
    })
        .then((shops) => {
            //Delete shops
            Shop.deleteMany({ _id: { $in: shops } }).then(() => res.json({ success: true }));
        })
        .catch((err) => console.log(err));
});

// @route GET api/shops
// @desc Get all shops for a specific category
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Shop.find({ category: req.query.category, userId: req.user.id })
        .then((shops) => res.json(shops))
        .catch((err) => console.log(err));
});

// @route GET api/shops/all
// @desc Get all shops for all categories
// @access Private
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
    Shop.find({ userId: req.user.id })
        .then((shops) => res.json(shops))
        .catch((err) => console.log(err));
});

module.exports = router;
