import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Image, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getTransactions,
  addTransaction,
} from "../../../actions/transactionActions";

import moment from "moment";

import CategoryImage from "./CategoryImage";
import { TableContainer } from "./TableContainer";
import AddTransactionModal from "./AddTransaction";

const tableData = [
  {
    merchant: "This is along but very longgggg merchant name",
    category: "fun",
    amount: "500$",
    date: moment("10/05/2021").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "clothing",
    amount: "2",
    date: moment("10/02/2021").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "personal",
    amount: "2",
    date: moment("10/31/2021").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "clothing",
    amount: "2",
    date: moment("10/11/2021").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "amenities",
    amount: "2",
    date: moment("09/06/2021").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "other",
    amount: "2",
    date: moment("09/21/2021").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "other",
    amount: "2",
    date: moment("09/15/2021").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "other",
    amount: "2",
    date: moment("12/15/2021").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "other",
    amount: "2",
    date: moment("12/10/2021").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "other",
    amount: "2",
    date: moment("12/21/2021").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "other",
    amount: "2",
    date: moment("12/21/2021").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "other",
    amount: "2",
    date: moment("12/21/2021").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "medical",
    amount: "2",
    date: moment("12/21/2019").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "medical",
    amount: "2",
    date: moment("12/21/2029").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "other",
    amount: "2",
    date: moment("12/21/2021").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "other",
    amount: "2",
    date: moment("12/02/2021").format("DD/MM/YYYY"),
  },
];

export const Content = (props) => {
  const [category, setCategory] = useState("all");
  const [dataTable, setDataTable] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isComponentLoading, setIsComponentLoading] = useState(false);
  const [APIFetchDone, setAPIFetchDone] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  // add investment to database
  const handleSubmit = (data) => {
    if (data) {
      console.log(props);
      //props.addTransaction(data);
    }
  };

  // set Category from child component
  const setSelectedCategory = (category) => {
    setCategory(category);
  };

  // filter data by Category
  useEffect(() => {
    if (category !== "all")
      setDataTable(tableData.filter((e) => e.category === category));
    else setDataTable(tableData);
  }, [category]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Container>
            <Row className="mt-3">
              <Col style={{ paddingLeft: "2px" }}>
                <p className="grey-text text-darken-1">Net worth: 1000$</p>
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

          <Container style={{ padding: "0px" }}>
            <Row className="mt-3">
              <Col md="3">
                <Row className="justify-content-center">
                  <CategoryImage image={category} />
                </Row>
              </Col>
              <Col md="9" style={{ padding: "0px" }}>
                <TableContainer
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
      <AddTransactionModal
        show={isOpenModal}
        onHide={() => closeModal()}
        handleSubmit={(e) => handleSubmit(e)}
      />
    </Container>
  );
};

Content.propTypes = {
  auth: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
  addTransaction: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  transactions: state.transactions,
});

export default connect(mapStateToProps, {
  getTransactions,
  addTransaction,
})(Content);
