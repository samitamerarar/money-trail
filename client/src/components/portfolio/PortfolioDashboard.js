import React, { Component } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTickerData } from "../../actions/yahooActions";

import MUIDataTable, { ExpandButton } from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

class PortfolioDashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let symbols = [{ symbol: "ACN" }, { symbol: "AAPL" }];

    symbols.forEach((e) =>
      this.props.yahooFinance.tickerData.some((s) => {
        return s.symbol === e.symbol;
      })
        ? null
        : this.props.getTickerData(e)
    );
  }

  render() {
    const { yahooFinance } = this.props;
    console.log(yahooFinance);

    const data = JSON.parse(JSON.stringify(yahooFinance.tickerData));

    yahooFinance.tickerData.forEach((e, i) => {
      if (e.dividendDate) {
        let date = new Date(e.dividendDate);
        data[i].dividendDate =
          date.getDate() +
          " " +
          date.toLocaleString("en-us", { month: "short" }) +
          " " +
          date.getFullYear().toString().substring(2);
      }

      Object.keys(e).forEach(function (key, j) {
        if (
          key &&
          key !== "symbol" &&
          key !== "displayName" &&
          key !== "dividendDate" &&
          key !== "trailingAnnualDividendYield" &&
          key !== "fiftyTwoWeekLowChangePercent" &&
          key !== "fiftyTwoWeekHighChangePercent"
        ) {
          data[i][key] = e[key].toLocaleString("en-US", {
            maximumFractionDigits: 2,
          });
        }
        switch (key) {
          case "trailingAnnualDividendYield":
          case "fiftyTwoWeekLowChangePercent":
          case "fiftyTwoWeekHighChangePercent":
            data[i][key] = (e[key] * 100).toLocaleString("en-US", {
              maximumFractionDigits: 2,
            });
            break;
          default:
          // code block
        }
      });
    });

    // Setting up data table
    const transactionsColumns = [
      {
        label: "Symbol",
        name: "symbol",
      },
      {
        label: "Name",
        name: "displayName",
      },
      {
        label: "Market Capitalization ($)",
        name: "marketCap",
        options: {
          setCellProps: () => ({
            align: "right",
          }),
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
        },
      },
      {
        label: "Average Daily Volume",
        name: "averageDailyVolume3Month",
        options: {
          setCellProps: () => ({
            align: "right",
          }),
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
        label: "Outstanding shares",
        name: "sharesOutstanding",
        options: {
          setCellProps: () => ({
            align: "right",
          }),
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
        },
      },
      {
        label: "Dividend Pay Date",
        name: "dividendDate",
      },
      {
        label: "Dividend Yield (%)",
        name: "trailingAnnualDividendYield",
        options: {
          setCellProps: () => ({
            align: "right",
          }),
        },
      },
      {
        label: "Dividend/Share ($)",
        name: "trailingAnnualDividendRate",
        options: {
          setCellProps: () => ({
            align: "right",
          }),
        },
      },
      {
        label: "Forward P/E Ratio",
        name: "forwardPE",
        options: {
          setCellProps: () => ({
            align: "right",
          }),
        },
      },
      {
        label: "PEG Ratio",
        name: "name",
        options: {
          setCellProps: () => ({
            align: "right",
          }),
        },
      },
      {
        label: "Price/Book",
        name: "priceToBook",
        options: {
          setCellProps: () => ({
            align: "right",
          }),
        },
      },
      {
        label: "Trailing P/E Ratio",
        name: "trailingPE",
        options: {
          setCellProps: () => ({
            align: "right",
          }),
        },
      },
      {
        label: "Price/Sales",
        name: "name",
        options: {
          setCellProps: () => ({
            align: "right",
          }),
        },
      },
      {
        label: "Beta",
        name: "name",
        options: {
          setCellProps: () => ({
            align: "right",
          }),
        },
      },
    ];

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "standard",
      selectableRows: "none",
      expandableRows: true,
      expandableRowsHeader: false,
      expandableRowsOnClick: true,
      rowsExpanded: [],
      renderExpandableRow: (rowData) => {
        const colSpan = rowData.length + 1;
        return (
          <TableRow>
            <TableCell colSpan={colSpan}>
              <Container></Container>
              <Row>
                <Col>hi</Col>
                <Col>hi</Col>
              </Row>
            </TableCell>
          </TableRow>
        );
      },
      onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) => {
        console.log(curExpanded, allExpanded, rowsExpanded);
      },
      elevation: 1,
      print: false,
      download: false,
    };

    const theme = createMuiTheme({
      overrides: {
        MUIDataTableSelectCell: {
          expandDisabled: {
            // Soft hide the button.
            visibility: "hidden",
          },
        },
      },
    });

    const components = {
      ExpandButton: function (props) {
        return <ExpandButton {...props} />;
      },
    };

    return (
      <Container>
        <Row>
          <Col>
            <Row className="mt-3">
              <h5>Transactions</h5>
            </Row>

            <Row className="mt-3">
              <>
                <p className="grey-text text-darken-1">
                  You have <b>{}</b> transactions
                </p>
                <Container style={{ padding: "0px" }}>
                  <MuiThemeProvider theme={theme}>
                    <MUIDataTable
                      title={"List"}
                      data={data}
                      columns={transactionsColumns}
                      options={options}
                      components={components}
                    />
                  </MuiThemeProvider>
                </Container>
              </>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

PortfolioDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  yahooFinance: PropTypes.object.isRequired,
  getTickerData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  yahooFinance: state.yahooFinance,
});

export default connect(mapStateToProps, { getTickerData })(PortfolioDashboard);
