import React, { useState, useEffect, useReducer } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getInvestments,
  addInvestment,
  mergeWithYahoo,
} from "../../actions/investmentAction";
import { getTickerData, searchStock } from "../../actions/yahooActions";

import PortfolioTable from "./PortfolioTable";
import AddStockModal from "./AddStockModal";

export const PortfolioDashboard = (props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mergedData, setMergedData] = useState([]);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  // add investment to database
  const handleSubmit = (data) => {
    if (data) {
      props.addInvestment(data);
    }
  };

  useEffect(() => {
    props.getInvestments();
  }, []); // run this once

  useEffect(() => {
    props.investments.investmentsList.forEach((e, i) => {
      const found = props.yahooFinance.tickerData.some(
        (s) => s.symbol === e.symbol
      );
      if (!found) props.getTickerData(e);
    });
  }, [props.investments.investmentsList]); // run when investmentsList change

  useEffect(() => {
    // Merge the 2 arrays on the field 'symbol'
    const mergedArray = props.investments.investmentsList.map((e1) => ({
      ...e1,
      ...props.yahooFinance.tickerData.find((e2) => e2.symbol === e1.symbol),
    }));
    setMergedData([...mergedArray]);

    // Calculate additionals fields
    mergedArray.forEach((e) => {
      e["changeFromPurchasePercent"] =
        (e.ask - e.priceOfShare) / e.priceOfShare;
      e["sizeOfPosition"] = e.ask * e.numberOfShares;
      e["positionProfitOrLoss"] = (e.ask - e.priceOfShare) * e.numberOfShares;
    });

    // sum the size of position
    const sumOfPosition = mergedArray.reduce(
      (n, { sizeOfPosition }) => n + sizeOfPosition,
      0
    );

    mergedArray.forEach((e) => {
      e["positionExposure"] = e.sizeOfPosition / sumOfPosition;
    });
  }, [props.yahooFinance.tickerData]); // run when tickerData change

  //Copy array to another array
  // const data = JSON.parse(JSON.stringify(mergedData));

  mergedData.forEach((e, i) => {
    Object.keys(e).forEach((key, j) => {
      if (
        key &&
        (key === "priceOfShare" ||
          key === "sizeOfPosition" ||
          key === "positionProfitOrLoss" ||
          key === "marketCap" ||
          key === "ask" ||
          key === "regularMarketChange" ||
          key === "regularMarketDayHigh" ||
          key === "regularMarketDayLow" ||
          key === "regularMarketOpen" ||
          key === "regularMarketPreviousClose" ||
          key === "fiftyTwoWeekHigh" ||
          key === "fiftyTwoWeekLowChange" ||
          key === "fiftyTwoWeekHighChange" ||
          key === "bookValue" ||
          key === "numberOfShares" ||
          key === "regularMarketVolume" ||
          key === "averageDailyVolume3Month" ||
          key === "sharesOutstanding" ||
          key === "forwardPE" ||
          key === "priceToBook" ||
          key === "trailingPE" ||
          key === "priceToSalesTrailing12Months" ||
          key === "beta" ||
          key === "trailingAnnualDividendRate")
      ) {
        mergedData[i][key] = e[key].toLocaleString("en-US", {
          maximumFractionDigits: 2,
        });
      }

      if (
        key &&
        (key === "changeFromPurchasePercent" ||
          key === "positionExposure" ||
          key === "trailingAnnualDividendYield" ||
          key === "fiftyTwoWeekLowChangePercent" ||
          key === "fiftyTwoWeekHighChangePercent")
      ) {
        e[key] =
          (e[key] * 100).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          }) + "%";
      }

      if (key && key === "regularMarketChangePercent") {
        e[key] =
          e[key].toLocaleString("en-US", {
            maximumFractionDigits: 2,
          }) + "%";
      }

      if (key && (key === "dividendDate" || key === "purchaseDate")) {
        e[key] = new Date(e[key]).toDateString();
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
                  You have <b>{mergedData.length}</b> assets.
                </p>
              </Col>
              <Col className="d-flex justify-content-end">
                <Button variant="primary" onClick={(e) => openModal()}>
                  Add Asset
                </Button>
              </Col>
            </Row>
          </Container>

          <Container style={{ padding: "0px" }} fluid>
            <PortfolioTable tableData={mergedData} />
          </Container>
        </Col>
      </Row>
      <AddStockModal
        show={isOpenModal}
        onHide={() => closeModal()}
        handleSubmit={(e) => handleSubmit(e)}
      />
    </Container>
  );
};

PortfolioDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  investments: PropTypes.object.isRequired,
  yahooFinance: PropTypes.object.isRequired,
  getTickerData: PropTypes.func.isRequired,
  searchStock: PropTypes.func.isRequired,
  addInvestment: PropTypes.func.isRequired,
  getInvestments: PropTypes.func.isRequired,
  mergeWithYahoo: PropTypes.func.isRequired,
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
  mergeWithYahoo,
})(PortfolioDashboard);
