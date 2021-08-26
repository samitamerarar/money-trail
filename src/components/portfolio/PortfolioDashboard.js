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
    let symbols = [{ symbol: "TSLA" }, { symbol: "AAPL" }];

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

    // Setting up data table
    const transactionsColumns = [
      {
        label: "Symbol",
        name: "symbol",
      },
      {
        label: "Size of the company",
        name: "name",
      },
      {
        label: "Last Price",
        name: "name",
      },
      {
        label: "% Change",
        name: "name",
      },
      {
        label: "$ Change",
        name: "name",
      },
      {
        label: "Highest today",
        name: "name",
      },
      {
        label: "Lowest today",
        name: "name",
      },
      {
        label: "First price",
        name: "name",
      },
      {
        label: "Closed price",
        name: "name",
      },
      {
        label: "Number of shares traded today",
        name: "name",
      },
      {
        label: "Average of shares traded (3 months)",
        name: "name",
      },
      {
        label: "52 weeks lowest",
        name: "name",
      },
      {
        label: "52 weeks highest",
        name: "name",
      },
      {
        label: "52 weeks high $ change",
        name: "name",
      },
      {
        label: "52 weeks low $ change",
        name: "name",
      },
      {
        label: "Low and High today",
        name: "name",
      },
      {
        label: "Outstanding shares",
        name: "name",
      },
      {
        label: "52 weeks high % change",
        name: "name",
      },
      {
        label: "52 weeks low 5 change",
        name: "name",
      },
      {
        label: "Book Value",
        name: "name",
      },
      {
        label: "Dividend paid date",
        name: "name",
        type: "date",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        label: "Dividend return %",
        name: "name",
      },
      {
        label: "Dividend return $",
        name: "name",
      },
      {
        label: "Forward P/E Ratio",
        name: "name",
      },
      {
        label: "PEG Ratio",
        name: "name",
      },
      {
        label: "Price/Book",
        name: "name",
      },
      {
        label: "Trailing P/E Ratio",
        name: "name",
      },
      {
        label: "Price/Sales",
        name: "name",
      },
      {
        label: "Beta",
        name: "name",
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
                      data={yahooFinance.tickerData}
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
