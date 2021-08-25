import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";

class AddShopsModal extends Component {
  constructor() {
    super();
    this.state = { shopsNames: null };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {}

  handleInputChange(e) {
    e.preventDefault();
    this.setState({ shopsNames: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.shopsNames) {
      this.props.handleSubmit(this.state.shopsNames);
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
                      Add Shops
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Label>
                          Input shops names (one per line)
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          onChange={this.handleInputChange}
                        />
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

export default AddShopsModal;
