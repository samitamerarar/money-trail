const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load investment model
const Investment = require("../../models/investment");

// @route POST api/investments/add
// @desc Add or Update investment
// @access Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    Investment.findOne({
      userId: req.user.id,
      symbol: req.body.symbolNameObj.symbol,
    })
      .then((investment) => {
        if (investment) {
          investment.name = req.body.symbolNameObj.shortname;
          investment.priceOfShare = req.body.price;
          investment.numberOfShares = req.body.shares;
          investment.sector = req.body.sector;
          investment.risk = req.body.risk;
          investment.purchaseDate = req.body.date;
          investment.comments = req.body.comments;
          //investment.investmentType = req.body.investmentType;
          investment.save().then((investment) => res.json(investment));
        } else {
          const newInvestment = new Investment({
            userId: req.user.id,
            symbol: req.body.symbolNameObj.symbol,
            name: req.body.symbolNameObj.shortname,
            priceOfShare: req.body.price,
            numberOfShares: req.body.shares,
            sector: req.body.sector,
            risk: req.body.risk,
            purchaseDate: req.body.date,
            comments: req.body.comments,
            //investmentType: req.body.category,
          });
          newInvestment.save().then((investment) => res.json(investment));
        }
      })
      .catch((err) => console.log(err)); // Mongo Error
  }
);

// @route GET api/investments
// @desc Get all investments for a specific user
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Investment.find({ userId: req.user.id })
      .then((investments) => res.json(investments))
      .catch((err) => console.log(err));
  }
);

module.exports = router;
