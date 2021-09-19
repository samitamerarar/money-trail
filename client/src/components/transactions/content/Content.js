import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getInvestments,
  addInvestment,
} from "../../../actions/investmentAction";

// import AddAssetModal from "./AddAsset/AddAsset";

import ScaleLoader from "react-spinners/ScaleLoader";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import TransactionsTable from "./TransactionsTable/TransactionsTable";

export const Content = (props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isComponentLoading, setIsComponentLoading] = useState(false);
  const [APIFetchDone, setAPIFetchDone] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const tableData = [
    {
      merchant: "This is along but very longgggg merchant name",
      category: "Transactions for Fun",
      amount: "500$",
      date: Date.now(),
    },
    {
      merchant: "marchant5",
      category: "clothes",
      amount: "2",
      date: Date.now(),
    },
  ];

  // add investment to database
  const handleSubmit = (data) => {
    if (data) {
      // props.addInvestment(data);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Container>
            <Row className="mt-3">
              <Col style={{ paddingLeft: "2px" }}>
                <p className="grey-text text-darken-1">
                  You have <b>{tableData.length}</b> assets.
                </p>
              </Col>
              <Col
                className="d-flex justify-content-end"
                style={{ paddingRight: "2px" }}>
                {/* <Button variant="primary" onClick={(e) => openModal()}>
                  Add Asset
                </Button> */}
              </Col>
            </Row>
          </Container>

          <Container style={{ padding: "0px" }} fluid>
            <TransactionsTable tableData={tableData} />
          </Container>
        </Col>
      </Row>
      {/* <AddAssetModal
        show={isOpenModal}
        onHide={() => closeModal()}
        handleSubmit={(e) => handleSubmit(e)}
      /> */}
    </Container>
  );
};

Content.propTypes = {
  auth: PropTypes.object.isRequired,
  investments: PropTypes.object.isRequired,
  addInvestment: PropTypes.func.isRequired,
  getInvestments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  investments: state.investments,
});

export default connect(mapStateToProps, {
  getInvestments,
  addInvestment,
})(Content);
