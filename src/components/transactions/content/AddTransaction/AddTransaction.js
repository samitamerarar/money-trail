import React, { Component } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import AddTransactionForm from './AddTransactionForm';

class AddTransaction extends Component {
    constructor() {
        super();
        this.state = { transaction: null };
    }

    receiveFormData = (data) => {
        this.setState(
            {
                transaction: data
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

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Row className="mt-3">
                            <Col>
                                <Modal
                                    {...this.props}
                                    aria-labelledby="contained-modal-title-vcenter"
                                    //centered
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title-vcenter">Add Transaction</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <AddTransactionForm sendFormData={(e) => this.receiveFormData(e)} />
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

export default AddTransaction;
