import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import AddStockForm from "./AddStockForm";

class AddStockModal extends Component {
  constructor() {
    super();
    this.state = { stockSymbol: null };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {}

  handleInputChange(e) {
    e.preventDefault();
    this.setState({ stockSymbol: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.stockSymbol) {
      this.props.handleSubmit(this.state.stockSymbol);
    }
    this.props.onHide();
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
                  centered>
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Add Asset
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <AddStockForm />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={this.onSubmit}>
                      Submit
                    </Button>
                    <Button variant="secondary" onClick={this.props.onHide}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AddStockModal;
