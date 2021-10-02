import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Image, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getInvestments,
  addInvestment,
} from "../../../actions/investmentAction";

import moment from "moment";
// import AddAssetModal from "./AddAsset/AddAsset";

import CategoryImage from "./CategoryImage";
import { TableContainer } from "./TableContainer";

const tableData = [
  {
    merchant: "This is along but very longgggg merchant name",
    category: "fun",
    amount: "500$",
    date: moment().subtract(7, "months").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "clothing",
    amount: "2",
    date: moment().subtract(24, "months").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "personal",
    amount: "2",
    date: moment().subtract(1, "months").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "clothing",
    amount: "2",
    date: moment().subtract(3, "months").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "amenities",
    amount: "2",
    date: moment().subtract(2, "months").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "other",
    amount: "2",
    date: moment().add(1, "months").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "other",
    amount: "2",
    date: moment().subtract(1, "months").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "other",
    amount: "2",
    date: moment().subtract(1, "months").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "other",
    amount: "2",
    date: moment().subtract(1, "months").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "other",
    amount: "2",
    date: moment().subtract(1, "months").format("DD/MM/YYYY"),
  },
  {
    merchant: "marchant5",
    category: "other",
    amount: "2",
    date: moment().subtract(1, "months").format("DD/MM/YYYY"),
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
      // props.addInvestment(data);
    }
  };

  // Tabs handling
  const handleSelect = (category) => {
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

          <Container style={{ padding: "0px" }}>
            <Row>
              <Col md="3">
                <Row>
                  <CategoryImage image={category} />
                </Row>
                <Row>
                  <Nav
                    variant="pills"
                    defaultActiveKey="all"
                    onSelect={handleSelect}
                    className="mt-3 ">
                    <Nav.Item>
                      <Nav.Link eventKey="all">All</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="automobile">Automobile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="clothing">Clothing</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="food">Food</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fun">Fun</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="electronics">Electronics</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="amenities">Amenities</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="personal">Personal</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="medical">Medical</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="other">Other</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Row>
              </Col>
              <Col md="9" style={{ padding: "0px" }}>
                <TableContainer tableData={dataTable} category={category} />
              </Col>
            </Row>
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
