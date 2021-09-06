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
      .then((tickerData) => {
        yahooFinance
          .quoteSummary(req.query.symbol, {
            modules: ["summaryDetail", "defaultKeyStatistics"],
          })
          .then((tickerDataStats) => {
            tickerData["pegRatio"] =
              tickerDataStats.defaultKeyStatistics.pegRatio;

            tickerData["beta"] = tickerDataStats.summaryDetail.beta;

            tickerData["priceToSalesTrailing12Months"] =
              tickerDataStats.summaryDetail.priceToSalesTrailing12Months;

            res.json(tickerData);
          });
      })
      .catch((err) => console.log(err));
  }
);

// @route GET api/yahoo-finance/search
// @desc Get a ticker symbol data
// @access Private
router.get(
  "/search",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    yahooFinance
      .search(req.query.symbol)
      .then((tickerData) => res.json(tickerData))
      .catch((err) => console.log(err));
  }
);

module.exports = router;
