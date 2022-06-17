const express = require('express');
const router = express.Router();
const passport = require('passport');
const yahooFinance = require('yahoo-finance2').default;

// @route GET api/yahoo-finance
// @desc Get a ticker symbol data
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    yahooFinance
        .quote(
            req.query.symbol,
            {
                fields: [
                    // "symbol",
                    // "displayName",
                    // "marketCap",
                    // "regularMarketPrice",
                    // "regularMarketChangePercent",
                    // "regularMarketChange",
                    // "regularMarketDayHigh",
                    // "regularMarketDayLow",
                    // "regularMarketOpen",
                    // "regularMarketPreviousClose",
                    // "regularMarketVolume",
                    // "averageDailyVolume3Month",
                    // "fiftyTwoWeekLow",
                    // "fiftyTwoWeekHigh",
                    // "fiftyTwoWeekLowChange",
                    // "fiftyTwoWeekHighChange",
                    // "sharesOutstanding",
                    // "fiftyTwoWeekLowChangePercent",
                    // "fiftyTwoWeekHighChangePercent",
                    // "bookValue",
                    // "dividendDate",
                    // "trailingAnnualDividendRate",
                    // "trailingAnnualDividendYield",
                    // "forwardPE",
                    // "priceToBook",
                    // "trailingPE",
                ]
            },
            { validateResult: false }
        )
        .then((tickerData) => {
            yahooFinance
                .quoteSummary(req.query.symbol, {
                    modules: ['summaryDetail', 'defaultKeyStatistics']
                })
                .then((tickerDataStats) => {
                    if (tickerData && tickerDataStats) {
                        if (tickerDataStats.defaultKeyStatistics?.pegRatio) tickerData['pegRatio'] = tickerDataStats.defaultKeyStatistics.pegRatio;
                        if (tickerDataStats.summaryDetail?.beta) tickerData['beta'] = tickerDataStats.summaryDetail.beta;
                        if (tickerDataStats.summaryDetail?.priceToSalesTrailing12Months)
                            tickerData['priceToSalesTrailing12Months'] = tickerDataStats.summaryDetail.priceToSalesTrailing12Months;
                    }

                    res.json(tickerData);
                })
                .catch((err) => {
                    console.log(err);
                    res.json(tickerData);
                });
        })
        .catch((err) => console.log(err));
});

// @route GET api/yahoo-finance/search
// @desc Get a ticker symbol data
// @access Private
router.get('/search', passport.authenticate('jwt', { session: false }), (req, res) => {
    yahooFinance
        .search(req.query.symbol, {}, { validateResult: false })
        .then((tickerData) => res.json(tickerData))
        .catch((err) => console.log(err));
});

// @route GET api/yahoo-finance/historical
// @desc Get a ticker symbol data
// @access Private
router.get('/historical', passport.authenticate('jwt', { session: false }), (req, res) => {
    const queryOptions = JSON.parse(req.query.queryOptions);
    yahooFinance
        .historical(req.query.symbol, queryOptions, { validateResult: false })
        .then((historicalData) => res.json({ symbol: req.query.symbol, data: historicalData }))
        .catch((err) => console.log(err));
});

module.exports = router;
