import React, { useState, useEffect, useReducer } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInvestments, addInvestment } from "../../actions/investmentAction";
import { getTickerData } from "../../actions/yahooActions";

import PortfolioTable from "./PortfolioTable/PortfolioTable";
import AddStockModal from "./AddStock/AddStockModal";

import ScaleLoader from "react-spinners/ScaleLoader";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export const PortfolioDashboard = (props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mergedData, setMergedData] = useState([]);
  const [isComponentLoading, setIsComponentLoading] = useState(false);
  const [APIFetchDone, setAPIFetchDone] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  // add investment to database
  const handleSubmit = (data) => {
    if (data) {
      props.addInvestment(data);
    }
  };

  useEffect(() => {
    setIsComponentLoading(false);
  }, [APIFetchDone]); // run this once

  useEffect(() => {
    props.getInvestments();
  }, []); // run this once

  useEffect(() => {
    const { investmentsList } = props.investments;

    // Remove deleted elements from UI on runtime
    if (investmentsList.length < mergedData.length && mergedData.length > 0) {
      const notDeletedElements = mergedData.filter((e) =>
        investmentsList.includes(e)
      );
      setMergedData([...notDeletedElements]);
    }

    investmentsList.forEach((e, i) => {
      const found = props.yahooFinance.tickerData.some(
        (s) => s.symbol === e.symbol
      );
      if (!found || e.justModified) {
        setIsComponentLoading(true);
        props.getTickerData(e).then(() => setAPIFetchDone(!APIFetchDone));
      }
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
        (e.regularMarketPrice - e.priceOfShare) / e.priceOfShare;
      e["sizeOfPosition"] = e.regularMarketPrice * e.numberOfShares;
      e["positionProfitOrLoss"] =
        (e.regularMarketPrice - e.priceOfShare) * e.numberOfShares;
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
          key === "regularMarketPrice" ||
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
        if (typeof e[key] === "string")
          e[key] = parseFloat(e[key].replaceAll(",", ""));

        e[key] =
          (e[key] * 10).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          }) + "%";
      }

      if (key && key === "regularMarketChangePercent") {
        if (typeof e[key] === "string")
          e[key] = parseFloat(e[key].replaceAll(",", ""));

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
              <h4>Investments</h4>
            </Row>
            <Row className="mt-3">
              <Col style={{ paddingLeft: "2px" }}>
                <p className="grey-text text-darken-1">
                  You have <b>{mergedData.length}</b> assets.
                </p>
              </Col>
              <Col
                className="d-flex justify-content-end"
                style={{ paddingRight: "2px" }}>
                <Button variant="primary" onClick={(e) => openModal()}>
                  Add Asset
                </Button>
              </Col>
            </Row>
          </Container>

          {props.investments.investmentsLoading || isComponentLoading ? (
            <Container className="mt-5">
              <Row className="justify-content-center m-3">
                Loading assets...
              </Row>
              <Row className="justify-content-center">
                <ScaleLoader color={"#007bff"} speedMultiplier={1} />
              </Row>
            </Container>
          ) : (
            <>
              {mergedData.length > 0 ? (
                <Container style={{ padding: "0px" }} fluid>
                  <PortfolioTable tableData={mergedData} />
                </Container>
              ) : (
                <Container className="mt-5">
                  <Row
                    className="justify-content-center m-3"
                    style={{ textAlign: "center" }}>
                    You don't have any Asset.
                    <br />
                    Time to invest!
                  </Row>
                  <Row className="justify-content-center">
                    <ClimbingBoxLoader color={"black"} speedMultiplier={0.33} />
                  </Row>
                </Container>
              )}
            </>
          )}
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
  getInvestments,
  addInvestment,
})(PortfolioDashboard);
