import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Nav, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';

export const Footer = (props) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Container fluid className="bg-dark">
            <Row>
                <Col></Col>
                <Col md={6}>
                    <Row className="justify-content-center mt-3">
                        <Nav activeKey="/home">
                            <Nav.Link as={Link} to="/investments" className="text-light">
                                Investments
                            </Nav.Link>
                            <Nav.Link as={Link} to="/transactions" className="text-light">
                                Transactions
                            </Nav.Link>
                            <Nav.Link as={Link} to="/statistics" className="text-light">
                                Statistics
                            </Nav.Link>
                        </Nav>
                    </Row>
                    <Row className="justify-content-center text-muted mt-2 mb-3">Money Trail © 2022</Row>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    logoutUser
})(Footer);
