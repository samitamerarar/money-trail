import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import UnDraw from './UnDraw';
import Background from '../layout/assets/undraw_under_construction_-46-pa.svg';

class Landing extends Component {
    render() {
        return (
            <Container
                className="minimum-height-content"
                style={{
                    background: `linear-gradient(rgba(255,255,255,.90), rgba(255,255,255,.90)), url(${Background}) no-repeat bottom center`,
                    backgroundSize: 'contain'
                }}>
                <Row>
                    <Col>
                        <UnDraw image={'undraw_make_it_rain_iwk4'} size="22vh" title="Track your money" subtitle="Your assets and expenses." />
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col className="text-center p-2">
                        <Link to="/login">
                            <Button variant="primary">Login</Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center p-2">
                        <Link to="/register">
                            <Button variant="primary">Register</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Landing;
