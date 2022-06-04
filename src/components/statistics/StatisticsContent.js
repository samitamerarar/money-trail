import React, { useEffect, useState } from 'react';
import { Row, Container, Col, Tab, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CashFlow from './CashFlow';
import SpendingCategories from './SpendingCategories';

export const StatisticsContent = (props) => {
    const [isComponentLoading, setIsComponentLoading] = useState(true);

    return (
        <Container className="p-0">
            <Row>
                <Col>
                    <Tab.Container defaultActiveKey="first">
                        <Row className="mt-3 align-items-center">
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Cash Flow</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Spending Categories</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content style={{ height: '100px' }}>
                                    <Tab.Pane eventKey="first">
                                        <CashFlow />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <SpendingCategories />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Col>
            </Row>
        </Container>
    );
};

StatisticsContent.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    transactions: state.transactions
});

export default connect(mapStateToProps, {})(StatisticsContent);
