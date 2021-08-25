import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";

class EditTxnModal extends Component {
  constructor() {
    super();
    this.state = { category: "Food" };
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  componentDidMount() {}

  handleSelectionChange(e) {
    e.preventDefault();
    this.setState({ category: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.category) this.props.handleSubmit(this.state.category);
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
                      Edit Transaction
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Select a new category</Form.Label>
                        <Form.Control
                          as="select"
                          onChange={(e) => this.handleSelectionChange(e)}>
                          <option value="Food">Food</option>
                          <option value="Personal Spending">
                            Personal Spending
                          </option>
                          <option value="Entertainment">Entertainment</option>
                          <option value="Transportation">Transportation</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Other">Other</option>
                        </Form.Control>
                      </Form.Group>
                    </Form>
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

export default EditTxnModal;
