import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

class Landing extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title className="p-1">Track your expenses</Card.Title>
                                <Card.Text className="p-1">Secure login below (with passport and JWTs).</Card.Text>
                                <Row className="p-1">
                                    <Col md={{ span: 6, offset: 3 }}>
                                        <Link to="/login">
                                            <Button variant="primary">Login</Button>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row className="p-1">
                                    <Col md={{ span: 6, offset: 3 }}>
                                        <Link to="/register">
                                            <Button variant="primary">Register</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Landing;
