import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Image, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CategoryImage from "./CategoryImage";
import Tables from "./Tables";
import AddTransaction from "./AddTransaction/AddTransaction";
import {
  addTransaction,
  getTransactions,
} from "../../../actions/transactionActions";

export const Content = (props) => {
  const [category, setCategory] = useState("all");
  const [dataTable, setDataTable] = useState([]);
  const [netWorth, setNetWorth] = useState();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isComponentLoading, setIsComponentLoading] = useState(false);
  const [APIFetchDone, setAPIFetchDone] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  // add transaction to database
  const handleSubmit = (data) => {
    if (data) {
      props.addTransaction(data);
    }
  };

  // set Category from child component
  const setSelectedCategory = (category) => {
    setCategory(category);
  };

  // filter data by Category
  useEffect(() => {
    const { transactions } = props.transactions;
    if (transactions.length > 0) {
      setNetWorth(
        Number(
          transactions
            .filter((e) => e.type === "income")
            .reduce((prev, cur) => cur.amount + prev, 0) +
            transactions
              .filter((e) => e.type === "expense")
              .reduce((prev, cur) => prev - cur.amount, 0)
        ).toLocaleString("en-US", {
          maximumFractionDigits: 0,
        })
      );

      if (category !== "all")
        setDataTable(transactions.filter((e) => e.category === category));
      else setDataTable(transactions);
    } else setDataTable(transactions);
  }, [props.transactions, category]);

  return (
    <Container fluid>
      <Row>
        <Col style={{ padding: "0px" }}>
          <Container>
            <Row className="mt-3">
              <Col style={{ paddingLeft: "2px" }}>
                <p className="grey-text text-darken-1">
                  Net worth: {netWorth ? <>{netWorth}</> : <>0</>}$
                </p>
              </Col>
              <Col
                className="d-flex justify-content-end"
                style={{ paddingRight: "2px" }}>
                <Button variant="primary" onClick={(e) => openModal()}>
                  + Transaction
                </Button>
              </Col>
            </Row>
          </Container>

          <Container style={{ padding: "5px" }}>
            <Row className="mt-3">
              <Col md="3">
                <Row className="justify-content-center">
                  <CategoryImage image={category} />
                </Row>
              </Col>
              <Col md="9" style={{ padding: "0px" }}>
                <Tables
                  tableData={dataTable}
                  category={category}
                  year={props.selectedYear}
                  setYears={(e) => props.setYears(e)}
                  setCategory={setSelectedCategory}
                />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      <AddTransaction
        show={isOpenModal}
        onHide={() => closeModal()}
        handleSubmit={(e) => handleSubmit(e)}
      />
    </Container>
  );
};

Content.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  transactions: state.transactions,
});

export default connect(mapStateToProps, {
  getTransactions,
  addTransaction,
})(Content);
