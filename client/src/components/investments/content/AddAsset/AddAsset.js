import React, { Component } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import AddAssetForm from './AddAssetForm';

class AddAssetModal extends Component {
    constructor() {
        super();
        this.state = { investment: null };
    }

    receiveFormData = (data) => {
        this.setState(
            {
                investment: data
            },
            () => {
                this.submit();
            }
        );
    };

    submit = () => {
        if (this.state.investment) {
            this.props.handleSubmit(this.state.investment);
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
                                    //centered
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title-vcenter">Add Asset</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <AddAssetForm sendFormData={(e) => this.receiveFormData(e)} />
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

export default AddAssetModal;
