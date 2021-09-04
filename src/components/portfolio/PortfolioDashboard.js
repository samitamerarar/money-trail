import React, { Component } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInvestments, addInvestment } from "../../actions/investmentAction";
import { getTickerData, searchStock } from "../../actions/yahooActions";

import PortfolioTable from "./PortfolioTable";
import AddStockModal from "./AddStockModal";

class PortfolioDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpenModal: false };
  }

  openModal = () => this.setState({ isOpenModal: true });
  closeModal = () => this.setState({ isOpenModal: false });

  // add investment to database
  handleSubmit = (data) => {
    if (data) {
      console.log(data);
      this.props.addInvestment(data);
    }
  };

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

    // Copy array to another array
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

    return (
      <Container fluid>
        <Row>
          <Col>
            <Container>
              <Row className="mt-3">
                <h5>Investments</h5>
              </Row>
              <Row className="mt-3">
                <Col>
                  <p className="grey-text text-darken-1">
                    You have <b>{data.length}</b> assets.
                  </p>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button variant="primary" onClick={(e) => this.openModal()}>
                    Add Asset
                  </Button>
                </Col>
              </Row>
            </Container>

            <Container style={{ padding: "0px" }} fluid>
              <PortfolioTable tableData={data} />
            </Container>
          </Col>
        </Row>
        <AddStockModal
          show={this.state.isOpenModal}
          onHide={() => this.closeModal()}
          handleSubmit={(e) => this.handleSubmit(e)}
        />
      </Container>
    );
  }
}

PortfolioDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  investments: PropTypes.object.isRequired,
  yahooFinance: PropTypes.object.isRequired,
  getTickerData: PropTypes.func.isRequired,
  searchStock: PropTypes.func.isRequired,
  addInvestment: PropTypes.func.isRequired,
  getInvestments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  investments: state.investments,
  yahooFinance: state.yahooFinance,
});

export default connect(mapStateToProps, {
  getTickerData,
  searchStock,
  getInvestments,
  addInvestment,
})(PortfolioDashboard);
