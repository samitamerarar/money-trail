import React, { Component } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import EditTransactionForm from "./EditTransactionForm";

class EditTransaction extends Component {
  constructor() {
    super();
    this.state = { transaction: null };
  }

  receiveFormData = (data) => {
    this.setState(
      {
        transaction: data,
      },
      () => {
        this.submit();
      }
    );
  };

  submit = () => {
    if (this.state.transaction) {
      this.props.handleSubmit(this.state.transaction);
    }
    this.props.onHide();
  };

  handleDelete = () => {
    if (window.confirm("Delete the item?")) {
      if (this.props.previousData) {
        this.props.handleDelete(this.props.previousData.id);
        this.props.onHide();
      }
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Row className="mt-3">
              <Col>
                <Modal
                  {...this.props}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  //centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Edit Transaction
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row className="mb-2">
                      <Col className="d-flex ml-3">-</Col>
                      <Col className="d-flex justify-content-end mr-3">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={this.handleDelete}>
                          Delete
                        </Button>
                      </Col>
                    </Row>

                    <EditTransactionForm
                      sendFormData={(e) => this.receiveFormData(e)}
                      previousData={this.props.previousData}
                    />
                  </Modal.Body>
                </Modal>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EditTransaction;
