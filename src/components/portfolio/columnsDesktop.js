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
    name: "name",
    options: {
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Price⠀($)",
    name: "ask",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Price Change⠀(%)",
    name: "regularMarketChangePercent",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      customBodyRender: (value, tableMeta, updateValue) => {
        if (value && parseFloat(value.replaceAll("value", "")) >= 0) {
          return (
            <div
              value={value}
              style={{
                /*backgroundColor: "rgba(55, 180, 0, 0.32)"*/ color: "green",
              }}>
              {value}
            </div>
          );
        } else {
          return (
            <div
              value={value}
              style={{
                /*backgroundColor: "rgba(243, 23, 0, 0.32)"*/ color: "darkred",
              }}>
              {value}
            </div>
          );
        }
      },
    },
  },
  {
    label: "Price Change⠀($)",
    name: "regularMarketChange",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      customBodyRender: (value, tableMeta, updateValue) => {
        if (value && parseFloat(value.replaceAll("value", "")) >= 0) {
          return (
            <div
              value={value}
              style={{
                /*backgroundColor: "rgba(55, 180, 0, 0.32)"*/ color: "green",
              }}>
              {value}
            </div>
          );
        } else {
          return (
            <div
              value={value}
              style={{
                /*backgroundColor: "rgba(243, 23, 0, 0.32)"*/ color: "darkred",
              }}>
              {value}
            </div>
          );
        }
      },
    },
  },
  {
    label: "Purchase Price⠀Change",
    name: "changeFromPurchasePercent",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      customBodyRender: (value, tableMeta, updateValue) => {
        if (value && parseFloat(value.replaceAll("%", "")) >= 0) {
          return (
            <div
              value={value}
              style={{
                /*backgroundColor: "rgba(55, 180, 0, 0.32)"*/ color: "green",
              }}>
              {value}
            </div>
          );
        } else {
          return (
            <div
              value={value}
              style={{
                /*backgroundColor: "rgba(243, 23, 0, 0.32)"*/ color: "darkred",
              }}>
              {value}
            </div>
          );
        }
      },
    },
  },
  {
    label: "Day's High ($)",
    name: "regularMarketDayHigh",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Day's Low ($)",
    name: "regularMarketDayLow",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Open Price ($)",
    name: "regularMarketOpen",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Previous Close ($)",
    name: "regularMarketPreviousClose",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Volume",
    name: "regularMarketVolume",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      hint: "The number of shares that have traded today or yesterday if the market is closed.",
    },
  },
  {
    label: "Average⠀Daily Volume",
    name: "averageDailyVolume3Month",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      hint: "Don't buy if it's too low or you become a \"stuckholder\" and can't sell it easily.",
    },
  },
  {
    label: "Market Capitalization⠀($)",
    name: "marketCap",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      hint: "The size of the company = Outstanding Shares * Price.",
    },
  },
  {
    label: "52⠀week Low⠀($)",
    name: "fiftyTwoWeekLow",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "52⠀week High⠀($)",
    name: "fiftyTwoWeekHigh",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "52⠀week Low⠀Change⠀($)",
    name: "fiftyTwoWeekLowChange",
    options: {
      display: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "52⠀week High⠀Change⠀($)",
    name: "fiftyTwoWeekHighChange",
    options: {
      display: false,
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Float Shares",
    name: "sharesOutstanding",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      hint: "The number of shares that are outstanding and available to trade.",
    },
  },
  {
    label: "52⠀week Low⠀Change⠀(%)",
    name: "fiftyTwoWeekLowChangePercent",
    options: {
      display: false,
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "52⠀week High⠀Change⠀(%)",
    name: "fiftyTwoWeekHighChangePercent",
    options: {
      display: false,
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Book Value⠀($)",
    name: "bookValue",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      hint: "The book value describes what the company is worth if all of its ownings are sold like their buildings, machines etc MINUS all debt paid back.",
    },
  },
  {
    label: "Dividend-Pay Date",
    name: "dividendDate",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      hint: "Sometimes if a company issues a very large dividend, then the stock drops immediately after the dividend has been paid.",
      customBodyRender: (value, tableMeta, updateValue) => {
        if (value) {
          return <div value={value}>{value}</div>;
        } else {
          return (
            <div value={value} style={{ color: "#C3C3C3" }}>
              no divid.
            </div>
          );
        }
      },
    },
  },
  {
    label: "Dividend Yield (%)",
    name: "trailingAnnualDividendYield",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is the percent return on a divided and it is calculated as the dividend / stock price.",
      customBodyRender: (value, tableMeta, updateValue) => {
        if (value) {
          return <div value={value}>{value}</div>;
        } else {
          return (
            <div value={value} style={{ color: "#C3C3C3" }}>
              no divid.
            </div>
          );
        }
      },
    },
  },
  {
    label: "Dividend/Share ($)",
    name: "trailingAnnualDividendRate",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is the value of the divided in dollar terms per share.",
      customBodyRender: (value, tableMeta, updateValue) => {
        if (value) {
          return <div value={value}>{value}</div>;
        } else {
          return (
            <div value={value} style={{ color: "#C3C3C3" }}>
              no divid.
            </div>
          );
        }
      },
    },
  },
  {
    label: "Forward⠀P/E Ratio",
    name: "forwardPE",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is the Price Earnings Ratio based on what investors are expecting in earnings next year. Lower = better.",
    },
  },
  {
    label: "Trailing⠀P/E Ratio",
    name: "trailingPE",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is the Price Earnings ratio based on the most recent year's historical earnings.",
    },
  },
  {
    label: "PEG Ratio",
    name: "pegRatio",
    options: {
      sort: false,
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
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      hint: "This is how much more expensive the company is versus it's book value. Value investors like Buffett love when this is under 1x or closer to 1x.",
    },
  },
  {
    label: "Price/Sales",
    name: "priceToSalesTrailing12Months",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      hint: "If a company doesn't have earnings, then investors look at Price / Sales instead of Price / Earnings. Note that Sales and Revenue is the same thing.",
    },
  },
  {
    label: "Beta",
    name: "beta",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      hint: "Beta measures how volatile a stock is relative to the index it is on. A value of 1 means not volatile.",
    },
  },
  {
    label: "Stock Market Sector",
    name: "sector",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Purchase Date",
    name: "purchaseDate",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Purchase Price ($)",
    name: "priceOfShare",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Shares Owned",
    name: "numberOfShares",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Position Size⠀($)",
    name: "sizeOfPosition",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      hint: "Last price * shares owned.",
    },
  },
  {
    label: "Position Exposure⠀(%)",
    name: "positionExposure",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      hint: "We often don't want too much exposure to 100 investment (risky). This is why we diversify by owning multiple investments.",
    },
  },
  {
    label: "Sector Exposure (%)",
    name: "null",
    options: {
      sort: false,
      display: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Sector Driver",
    name: "null",
    options: {
      sort: false,
      display: false,
      setCellProps: () => ({
        align: "right",
      }),
    },
  },
  {
    label: "Position Profit⠀or⠀Loss⠀($)",
    name: "positionProfitOrLoss",
    options: {
      sort: false,
      setCellProps: () => ({
        align: "right",
      }),
      customBodyRender: (value, tableMeta, updateValue) => {
        if (value && parseFloat(value.replaceAll("$", "")) >= 0) {
          return (
            <div
              value={value}
              style={{
                /*backgroundColor: "rgba(55, 180, 0, 0.32)"*/ color: "green",
              }}>
              {value}
            </div>
          );
        } else {
          return (
            <div
              value={value}
              style={{
                /*backgroundColor: "rgba(243, 23, 0, 0.32)"*/ color: "darkred",
              }}>
              {value}
            </div>
          );
        }
      },
    },
  },
];
