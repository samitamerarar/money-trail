export const columnsDesktop = [
  {
    label: "Symbol",
    name: "symbol",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Name",
    name: "displayName",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Purchase Price ($)",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Change from Purchase Price (%)",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Purchase Date",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Shares Owned",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Size of Position ($)",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "Last price * shares owned.",
    },
  },
  {
    label: "Position Profit or Loss ($)",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Position Exposure (%)",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "We often don't want too much exposure to 1 investment (risky). This is why we diversify by owning multiple investments.",
    },
  },
  {
    label: "Stock Market Sector",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Sector Exposure (%)",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Sector Driver",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint:
        "Sector Name:	Sector Drivers \n" +
        "Consumer Discretionary	Healthy GDP Growth\n" +
        "Consumer Staples	N/A (Defensive Sector)\n" +
        "Energy	Rising Oil Prices\n" +
        "Financials	Low Unemployment\n" +
        "Health Care	Favorable Government Policy\n" +
        "Industrials	Healthy GDP Growth\n" +
        "Information Technology	Product Cycle\n" +
        "Materials	Rising Commodity Prices\n" +
        "Real Estate	Low Interest Rates\n" +
        "Telecommunications Services	Healthy GDP Growth\n" +
        "Utilities	N/A (Defensive Sector)",
    },
  },
  {
    label: "Market Capitalization ($)",
    name: "marketCap",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "The size of the company = Outstanding Shares * Price.",
    },
  },
  {
    label: "Price ($)",
    name: "ask",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Price Change (%)",
    name: "regularMarketChangePercent",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Price Change ($)",
    name: "regularMarketChange",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Day's High ($)",
    name: "regularMarketDayHigh",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Day's Low ($)",
    name: "regularMarketDayLow",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Open Price ($)",
    name: "regularMarketOpen",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Previous Close ($)",
    name: "regularMarketPreviousClose",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Volume",
    name: "regularMarketVolume",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "The number of shares that have traded today or yesterday if the market is closed.",
    },
  },
  {
    label: "Average Daily Volume",
    name: "averageDailyVolume3Month",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "Don't buy if it's too low or you become a \"stuckholder\" and can't sell it easily.",
    },
  },
  {
    label: "52-week Low ($)",
    name: "fiftyTwoWeekLow",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "52-week High ($)",
    name: "fiftyTwoWeekHigh",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "52-week Low Change ($)",
    name: "fiftyTwoWeekLowChange",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "52-week High Change ($)",
    name: "fiftyTwoWeekHighChange",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Float Shares",
    name: "sharesOutstanding",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "The number of shares that are outstanding and available to trade.",
    },
  },
  {
    label: "52-week Low Change (%)",
    name: "fiftyTwoWeekLowChangePercent",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "52-week High Change (%)",
    name: "fiftyTwoWeekHighChangePercent",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Book Value ($)",
    name: "bookValue",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "The book value describes what the company is worth if all of its ownings are sold like their buildings, machines etc MINUS all debt paid back.",
    },
  },
  {
    label: "Dividend Pay Date",
    name: "dividendDate",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "Sometimes if a company issues a very large dividend, then the stock drops immediately after the dividend has been paid.",
    },
  },
  {
    label: "Dividend Yield (%)",
    name: "trailingAnnualDividendYield",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is the percent return on a divided and it is calculated as the dividend / stock price.",
    },
  },
  {
    label: "Dividend/Share ($)",
    name: "trailingAnnualDividendRate",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is the value of the divided in dollar terms per share.",
    },
  },
  {
    label: "Forward P/E Ratio",
    name: "forwardPE",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is the Price Earnings Ratio based on what investors are expecting in earnings next year. Lower = better.",
    },
  },
  {
    label: "PEG Ratio",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is the P/E ratio divided by the earnings growth rate. Well under 2 is preferred by most investors.",
    },
  },
  {
    label: "Price/Book",
    name: "priceToBook",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is how much more expensive the company is versus it's book value. Value investors like Buffett love when this is under 1x or closer to 1x.",
    },
  },
  {
    label: "Trailing P/E Ratio",
    name: "trailingPE",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is the Price Earnings ratio based on the most recent year's historical earnings.",
    },
  },
  {
    label: "Price/Sales",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "If a company doesn't have earnings, then investors look at Price / Sales instead of Price / Earnings. Note that Sales and Revenue is the same thing.",
    },
  },
  {
    label: "Beta",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "Beta measures how volatile a stock is relative to the index it is on. A value of 1 means not volatile.",
    },
  },
];

/*
export const columnsDesktopExpandRow = [
  {
    label: "Symbol",
    name: "symbol",
    options: {
      display: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Name",
    name: "displayName",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Purchase Price ($)",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Change from Purchase Price (%)",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Purchase Date",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Shares Owned",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Size of Position ($)",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "Last price * shares owned.",
    },
  },
  {
    label: "Position Profit or Loss ($)",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Position Exposure (%)",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "We often don't want too much exposure to 1 investment (risky). This is why we diversify by owning multiple investments.",
    },
  },
  {
    label: "Stock Market Sector",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Sector Exposure (%)",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Sector Driver",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint:
        "Sector Name:	Sector Drivers \n" +
        "Consumer Discretionary	Healthy GDP Growth\n" +
        "Consumer Staples	N/A (Defensive Sector)\n" +
        "Energy	Rising Oil Prices\n" +
        "Financials	Low Unemployment\n" +
        "Health Care	Favorable Government Policy\n" +
        "Industrials	Healthy GDP Growth\n" +
        "Information Technology	Product Cycle\n" +
        "Materials	Rising Commodity Prices\n" +
        "Real Estate	Low Interest Rates\n" +
        "Telecommunications Services	Healthy GDP Growth\n" +
        "Utilities	N/A (Defensive Sector)",
    },
  },
  {
    label: "Market Capitalization ($)",
    name: "marketCap",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "The size of the company = Outstanding Shares * Price.",
    },
  },
  {
    label: "Price ($)",
    name: "ask",
    options: {
      display: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Price Change (%)",
    name: "regularMarketChangePercent",
    options: {
      display: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Price Change ($)",
    name: "regularMarketChange",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Day's High ($)",
    name: "regularMarketDayHigh",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Day's Low ($)",
    name: "regularMarketDayLow",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Open Price ($)",
    name: "regularMarketOpen",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Previous Close ($)",
    name: "regularMarketPreviousClose",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Volume",
    name: "regularMarketVolume",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "The number of shares that have traded today or yesterday if the market is closed.",
    },
  },
  {
    label: "Average Daily Volume",
    name: "averageDailyVolume3Month",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "Don't buy if it's too low or you become a \"stuckholder\" and can't sell it easily.",
    },
  },
  {
    label: "52-week Low ($)",
    name: "fiftyTwoWeekLow",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "52-week High ($)",
    name: "fiftyTwoWeekHigh",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "52-week Low Change ($)",
    name: "fiftyTwoWeekLowChange",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "52-week High Change ($)",
    name: "fiftyTwoWeekHighChange",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Float Shares",
    name: "sharesOutstanding",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "The number of shares that are outstanding and available to trade.",
    },
  },
  {
    label: "52-week Low Change (%)",
    name: "fiftyTwoWeekLowChangePercent",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "52-week High Change (%)",
    name: "fiftyTwoWeekHighChangePercent",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Book Value ($)",
    name: "bookValue",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "The book value describes what the company is worth if all of its ownings are sold like their buildings, machines etc MINUS all debt paid back.",
    },
  },
  {
    label: "Dividend Pay Date",
    name: "dividendDate",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "Sometimes if a company issues a very large dividend, then the stock drops immediately after the dividend has been paid.",
    },
  },
  {
    label: "Dividend Yield (%)",
    name: "trailingAnnualDividendYield",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is the percent return on a divided and it is calculated as the dividend / stock price.",
    },
  },
  {
    label: "Dividend/Share ($)",
    name: "trailingAnnualDividendRate",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is the value of the divided in dollar terms per share.",
    },
  },
  {
    label: "Forward P/E Ratio",
    name: "forwardPE",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is the Price Earnings Ratio based on what investors are expecting in earnings next year. Lower = better.",
    },
  },
  {
    label: "PEG Ratio",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is the P/E ratio divided by the earnings growth rate. Well under 2 is preferred by most investors.",
    },
  },
  {
    label: "Price/Book",
    name: "priceToBook",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is how much more expensive the company is versus it's book value. Value investors like Buffett love when this is under 1x or closer to 1x.",
    },
  },
  {
    label: "Trailing P/E Ratio",
    name: "trailingPE",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is the Price Earnings ratio based on the most recent year's historical earnings.",
    },
  },
  {
    label: "Price/Sales",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "If a company doesn't have earnings, then investors look at Price / Sales instead of Price / Earnings. Note that Sales and Revenue is the same thing.",
    },
  },
  {
    label: "Beta",
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
      hint: "Beta measures how volatile a stock is relative to the index it is on. A value of 1 means not volatile.",
    },
  },
];
*/
