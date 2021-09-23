import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Image, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getInvestments,
  addInvestment,
} from "../../../actions/investmentAction";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

// import AddAssetModal from "./AddAsset/AddAsset";

import TransactionsTable from "./TransactionsTable/TransactionsTable";
import all from "../assets/all.png";
import amenities from "../assets/amenities.png";
import automobile from "../assets/automobile.png";
import clothing from "../assets/clothing.png";
import electronics from "../assets/electronics.png";
import food from "../assets/food.png";
import fun from "../assets/fun.png";
import medical from "../assets/medical.png";
import other from "../assets/other.png";
import personalcare from "../assets/personalcare.png";

export const Content = (props) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

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
    {
      merchant: "marchant5",
      category: "clothes",
      amount: "2",
      date: Date.now(),
    },
    {
      merchant: "marchant5",
      category: "clothes",
      amount: "2",
      date: Date.now(),
    },
    {
      merchant: "marchant5",
      category: "clothes",
      amount: "2",
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

          <Container style={{ padding: "0px" }}>
            <Row>
              <Col md="3">
                <Row>
                  <Image
                    style={{ opacity: "0.75" }}
                    src={amenities}
                    rounded
                    fluid
                    className="p-5"
                  />
                </Row>
                <Row>
                  <Nav
                    variant="pills"
                    defaultActiveKey="All"
                    //onSelect={this.handleSelect}
                    className="mt-3 ">
                    <Nav.Item>
                      <Nav.Link eventKey="All">All</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Amenities">Amenities</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Automobile">Automobile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Electronics">Electronics</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Food">Food</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Fun">Fun</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Medical">Medical</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Personal">Personal</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Other">Other</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Row>
              </Col>
              <Col md="9" style={{ padding: "0px" }}>
                <div ref={sliderRef} className="keen-slider">
                  <div className="keen-slider__slide number-slide1">
                    <TransactionsTable tableData={tableData} />
                  </div>
                  <div className="keen-slider__slide number-slide2">
                    <TransactionsTable tableData={tableData} />
                  </div>
                </div>

                {slider && (
                  <div className="dots">
                    {[...Array(slider.details().size).keys()].map((idx) => {
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            slider.moveToSlideRelative(idx);
                          }}
                          className={
                            "dot" + (currentSlide === idx ? " active" : "")
                          }
                        />
                      );
                    })}
                  </div>
                )}
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
