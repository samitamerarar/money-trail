import React, { useEffect, useState } from 'react';
import { Row, Container, Col, Tab, Nav, Tabs } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CashFlow from './CashFlow';
import SpendingCategories from './SpendingCategories';

export const StatisticsContent = (props) => {
    const [isComponentLoading, setIsComponentLoading] = useState(true);

    return (
        <Container className="p-0 mt-3">
            <Row>
                <Col className="p-0">
                    <Tabs defaultActiveKey="first">
                        <Tab eventKey="first" title="Cash Flow">
                            <CashFlow />
                        </Tab>
                        <Tab eventKey="second" title="Spending Categories">
                            <SpendingCategories />
                        </Tab>
                    </Tabs>
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
