const express = require("express");
const router = express.Router();
const passport = require("passport");
const yahooFinance = require("yahoo-finance2").default;

// @route GET api/yahoo-finance
// @desc Get a ticker symbol data
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    yahooFinance
      .quote(req.query.symbol, {
        fields: [
          "symbol",
          "displayName",
          "marketCap",
          "ask",
          "regularMarketChangePercent",
          "regularMarketChange",
          "regularMarketDayHigh",
          "regularMarketDayLow",
          "regularMarketOpen",
          "regularMarketPreviousClose",
          "regularMarketVolume",
          "averageDailyVolume3Month",
          "fiftyTwoWeekLow",
          "fiftyTwoWeekHigh",
          "fiftyTwoWeekLowChange",
          "fiftyTwoWeekHighChange",
          "sharesOutstanding",
          "fiftyTwoWeekLowChangePercent",
          "fiftyTwoWeekHighChangePercent",
          "bookValue",
          "dividendDate",
          "trailingAnnualDividendRate",
          "trailingAnnualDividendYield",
          "forwardPE",
          "priceToBook",
          "trailingPE",
        ],
      })
      .then((tickerData) => res.json(tickerData))
      .catch((err) => console.log(err));
  }
);

module.exports = router;
