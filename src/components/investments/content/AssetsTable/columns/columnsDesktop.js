import EditStock from '../EditStock/EditStock';

export const columnsDesktop = [
    {
        label: 'id',
        name: '_id',
        options: { display: 'excluded' }
    },
    {
        label: 'Modify Asset',
        name: 'actions',
        options: {
            display: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                return <EditStock value={value} tableMeta={tableMeta} updateValue={updateValue} />;
            }
        }
    },
    {
        label: 'Symbol',
        name: 'symbol',
        options: {
            display: true,
            viewColumns: false,
            sort: true,
            setCellProps: () => ({
                align: 'left'
            })
        }
    },
    {
        label: 'Name',
        name: 'name',
        options: {
            display: true,
            viewColumns: false,
            sort: true,
            setCellProps: () => ({
                align: 'left'
            })
        }
    },
    {
        label: 'Currency',
        name: 'currency',
        options: {
            display: true,
            viewColumns: false,
            sort: true,
            setCellProps: () => ({
                align: 'right'
            })
        }
    },
    {
        label: 'Price',
        name: 'regularMarketPrice',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            })
        }
    },
    {
        label: 'Price Change',
        name: 'regularMarketChange',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            }),
            customBodyRender: (value, tableMeta, updateValue) => {
                let val = String(value);
                if (val && parseFloat(val.replaceAll('%', '')) >= 0) {
                    return (
                        <div value={val} style={{ color: 'green' }}>
                            {val}
                        </div>
                    );
                } else {
                    return (
                        <div value={val} style={{ color: 'darkred' }}>
                            {val}
                        </div>
                    );
                }
            }
        }
    },
    {
        label: 'Price Change',
        name: 'regularMarketChangePercent',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            }),
            customBodyRender: (value, tableMeta, updateValue) => {
                let val = String(value);
                if (val && parseFloat(val.replaceAll('%', '')) >= 0) {
                    return (
                        <div value={val} style={{ color: 'green' }}>
                            {val}
                        </div>
                    );
                } else {
                    return (
                        <div value={val} style={{ color: 'darkred' }}>
                            {val}
                        </div>
                    );
                }
            }
        }
    },
    {
        label: "Day's High",
        name: 'regularMarketDayHigh',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            })
        }
    },
    {
        label: "Day's Low",
        name: 'regularMarketDayLow',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            })
        }
    },
    {
        label: 'Open Price',
        name: 'regularMarketOpen',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            })
        }
    },
    {
        label: 'Prev. Close',
        name: 'regularMarketPreviousClose',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            })
        }
    },
    {
        label: 'Volume',
        name: 'regularMarketVolume',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            }),
            hint: 'The number of shares that have traded today or yesterday if the market is closed.'
        }
    },
    {
        label: 'Avg. Vol.',
        name: 'averageDailyVolume3Month',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            }),
            hint: "Average Volume (3 Months). Don't buy if it's too low or you become a \"stuckholder\" and can't sell it easily."
        }
    },
    {
        label: 'Market Cap',
        name: 'marketCap',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            }),
            hint: 'The size of the company = Outstanding Shares * Price.'
        }
    },
    {
        label: '52w - Low',
        name: 'fiftyTwoWeekLow',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            })
        }
    },
    {
        label: '52w - High',
        name: 'fiftyTwoWeekHigh',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            })
        }
    },
    {
        label: '52⠀week Low⠀Change',
        name: 'fiftyTwoWeekLowChange',
        options: {
            display: 'excluded',
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            })
        }
    },
    {
        label: '52⠀week High⠀Change',
        name: 'fiftyTwoWeekHighChange',
        options: {
            display: 'excluded',
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            })
        }
    },
    {
        label: 'Float Shares',
        name: 'sharesOutstanding',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            }),
            hint: 'The number of shares that are outstanding and available to trade.'
        }
    },
    {
        label: '52⠀week Low⠀Change',
        name: 'fiftyTwoWeekLowChangePercent',
        options: {
            display: 'excluded',
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            })
        }
    },
    {
        label: '52⠀week High⠀Change',
        name: 'fiftyTwoWeekHighChangePercent',
        options: {
            display: 'excluded',
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right'
            })
        }
    },
    {
        label: 'Dividend',
        name: 'trailingAnnualDividendRate',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#fbfffb',
                    borderLeft: '1px double black'
                }
            }),
            hint: 'This is the value of the divided in dollar terms per share.',
            customBodyRender: (value, tableMeta, updateValue) => {
                if (value) {
                    return <div value={value}>{value}</div>;
                } else {
                    return (
                        <div value={value} style={{ color: '#C3C3C3' }}>
                            no divid.
                        </div>
                    );
                }
            }
        }
    },
    {
        label: 'Dividend Yield',
        name: 'trailingAnnualDividendYield',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#fbfffb'
                }
            }),
            hint: 'This is the percent return on a divided and it is calculated as the dividend / stock price.',
            customBodyRender: (value, tableMeta, updateValue) => {
                if (value) {
                    return <div value={value}>{value}</div>;
                } else {
                    return (
                        <div value={value} style={{ color: '#C3C3C3' }}>
                            no divid.
                        </div>
                    );
                }
            }
        }
    },
    {
        label: 'Dividend Date',
        name: 'dividendDate',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'center',
                style: {
                    backgroundColor: '#fbfffb'
                }
            }),
            hint: 'Sometimes if a company issues a very large dividend, then the stock drops immediately after the dividend has been paid.',
            customBodyRender: (value, tableMeta, updateValue) => {
                if (value) {
                    return <div value={value}>{value}</div>;
                } else {
                    return (
                        <div value={value} style={{ color: '#C3C3C3' }}>
                            no divid.
                        </div>
                    );
                }
            }
        }
    },
    {
        label: 'Book Value',
        name: 'bookValue',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#f8fcff',
                    borderLeft: '1px double black'
                }
            }),
            hint: 'The book value describes what the company is worth if all of its ownings are sold like their buildings, machines etc MINUS all debt paid back.'
        }
    },
    {
        label: 'Forward P/E',
        name: 'forwardPE',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#f8fcff'
                }
            }),
            hint: 'This is the Price Earnings Ratio based on what investors are expecting in earnings next year. Lower = better.'
        }
    },
    {
        label: 'Trailing P/E',
        name: 'trailingPE',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#f8fcff'
                }
            }),
            hint: "This is the Price Earnings ratio based on the most recent year's historical earnings."
        }
    },
    {
        label: 'PEG Ratio',
        name: 'pegRatio',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#f8fcff'
                }
            }),
            hint: 'This is the P/E ratio divided by the earnings growth rate. Well under 2 is preferred by most investors.'
        }
    },
    {
        label: 'Price/Book',
        name: 'priceToBook',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#f8fcff'
                }
            }),
            hint: "This is how much more expensive the company is versus it's book value. Value investors like Buffett love when this is under 1x or closer to 1x."
        }
    },
    {
        label: 'Price/Sales',
        name: 'priceToSalesTrailing12Months',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#f8fcff'
                }
            }),
            hint: "If a company doesn't have earnings, then investors look at Price / Sales instead of Price / Earnings. Note that Sales and Revenue is the same thing."
        }
    },
    {
        label: 'Beta',
        name: 'beta',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#f8fcff'
                }
            }),
            hint: 'Beta measures how volatile a stock is relative to the index it is on. A value of 1 means not volatile.'
        }
    },
    {
        label: 'Stock Market Sector',
        name: 'sector',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'center',
                style: {
                    backgroundColor: '#fffffa',
                    borderLeft: '2px solid black'
                }
            })
        }
    },
    {
        label: 'Sector Exposure',
        name: 'null',
        options: {
            display: 'excluded',
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#fffffa'
                }
            })
        }
    },
    {
        label: 'Sector Driver',
        name: 'null',
        options: {
            display: 'excluded',
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#fffffa'
                }
            })
        }
    },
    {
        label: 'Investment Risk',
        name: 'risk',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'center',
                style: {
                    backgroundColor: '#fffffa'
                }
            })
        }
    },
    {
        label: 'Position Exposure',
        name: 'positionExposure',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#fffffa'
                }
            }),
            hint: "We often don't want too much exposure to 100% investment (risky). This is why we diversify by owning multiple investments."
        }
    },
    {
        label: 'Purchase Date',
        name: 'purchaseDate',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'center',
                style: {
                    backgroundColor: '#fffffa'
                }
            })
        }
    },
    {
        label: 'Shares Owned',
        name: 'numberOfShares',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#fffffa'
                }
            })
        }
    },
    {
        label: 'Purchase Price / share',
        name: 'priceOfShare',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#fffffa'
                }
            })
        }
    },
    {
        label: 'Position Size',
        name: 'sizeOfPosition',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#fffffa'
                }
            }),
            hint: 'Last price * shares owned.'
        }
    },
    {
        label: 'Position Change',
        name: 'positionProfitOrLoss',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#fffffa'
                }
            }),
            customBodyRender: (value, tableMeta, updateValue) => {
                let val = String(value);
                if (val && parseFloat(val.replaceAll('$', '')) >= 0) {
                    return (
                        <div value={val} style={{ color: 'green' }}>
                            {val}
                        </div>
                    );
                } else {
                    return (
                        <div value={val} style={{ color: 'darkred' }}>
                            {val}
                        </div>
                    );
                }
            }
        }
    },
    {
        label: 'Position Change',
        name: 'changeFromPurchasePercent',
        options: {
            display: true,
            viewColumns: false,
            sort: false,
            setCellProps: () => ({
                align: 'right',
                style: {
                    backgroundColor: '#fffffa'
                }
            }),
            customBodyRender: (value, tableMeta, updateValue) => {
                let val = String(value);
                if (val && parseFloat(val.replaceAll('%', '')) >= 0) {
                    return (
                        <div value={val} style={{ color: 'green' }}>
                            {val}
                        </div>
                    );
                } else {
                    return (
                        <div value={val} style={{ color: 'darkred' }}>
                            {val}
                        </div>
                    );
                }
            }
        }
    },
    {
        label: 'Comments',
        name: 'comments',
        options: {
            display: true,
            viewColumns: true,
            sort: true,
            setCellProps: () => ({
                align: 'left'
            })
        }
    }
];
