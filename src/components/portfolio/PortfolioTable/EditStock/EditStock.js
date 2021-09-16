import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addInvestment,
  deleteInvestment,
} from "../../../../actions/investmentAction";

import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import EditStockForm from "./EditStockForm";

export const EditStock = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const data = {
    id: props.tableMeta.rowData[0],
    symbol: props.tableMeta.rowData[2],
    name: props.tableMeta.rowData[3],
    shares: parseFloat(props.tableMeta.rowData[37].replace(/,/g, "")),
    price: parseFloat(props.tableMeta.rowData[38].replace(/,/g, "")),
    date: new Date(props.tableMeta.rowData[36]).toISOString().substr(0, 10),
    sector: props.tableMeta.rowData[32],
    //risk: props.tableMetal.rowData,
    //comments : props.tableMetal.rowData
  };

  // edit existing investment in database
  const receiveFormData = (data) => {
    if (data) {
      props.addInvestment(data);
      handleCloseEdit();
    }
  };

  // delete existing investment in database
  const deleteInvestment = () => {
    if (data) {
      props.deleteInvestment(data);
      handleCloseDelete();
    }
  };

  return (
    <>
      <Container style={{ padding: "0px" }}>
        <Row>
          <Col style={{ minWidth: "max-content" }}>
            <Button
              onClick={handleShowEdit}
              style={{ marginRight: "0.9em" }}
              variant="outline-primary"
              size="sm">
              Edit
            </Button>
            <Button
              onClick={handleShowDelete}
              variant="outline-danger"
              size="sm">
              X
            </Button>
          </Col>
        </Row>
      </Container>

      <Modal show={showEdit} onHide={handleCloseEdit}>
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

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {data.symbol}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row
            className="justify-content-center"
            style={{ textAlign: "center" }}>
            <p>
              This will remove <i>{data.name}</i> from your list!
            </p>
          </Row>
          <Row className="justify-content-center">
            <p>
              <b>Are you sure?</b>
            </p>
          </Row>

          <Col
            className="d-flex justify-content-end"
            style={{ paddingRight: "2px" }}>
            <Button onClick={deleteInvestment} variant="danger">
              Delete Asset
            </Button>
          </Col>
        </Modal.Body>
      </Modal>
    </>
  );
};

EditStock.propTypes = {
  auth: PropTypes.object.isRequired,
  investments: PropTypes.object.isRequired,
  addInvestment: PropTypes.func.isRequired,
  deleteInvestment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addInvestment, deleteInvestment })(
  EditStock
);