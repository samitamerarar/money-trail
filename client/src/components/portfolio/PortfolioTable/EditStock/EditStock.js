import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addInvestment } from "../../../../actions/investmentAction";

import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import EditStockForm from "./EditStockForm";

export const EditStock = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const data = {
    symbol: props.tableMeta.rowData[1],
    shares: props.tableMeta.rowData[37],
    price: props.tableMeta.rowData[36],
    date: new Date(props.tableMeta.rowData[35]).toISOString().substr(0, 10),
    sector: props.tableMeta.rowData[31],
    //risk: props.tableMetal.rowData,
    //comments : props.tableMetal.rowData
  };

  // edit existing investment in database
  const receiveFormData = (data) => {
    if (data) {
      props.addInvestment(data);
      handleClose();
    }
  };

  return (
    <>
      <Container style={{ padding: "0px" }}>
        <Row>
          <Col style={{ minWidth: "max-content" }}>
            <Button
              onClick={handleShow}
              style={{ marginRight: "0.9em" }}
              variant="outline-primary"
              size="sm"
              //onClick={() => console.log(value, tableMeta)}
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              //onClick={() => console.log(value, tableMeta)}
            >
              X
            </Button>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {data.symbol}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This will override existing data!</p>
          <EditStockForm
            previousData={data}
            sendFormData={(e) => receiveFormData(e)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

EditStock.propTypes = {
  auth: PropTypes.object.isRequired,
  investments: PropTypes.object.isRequired,
  addInvestment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addInvestment })(EditStock);
