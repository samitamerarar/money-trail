import React, { useEffect, useState } from 'react';
import { Row, Container, Col, Tab, Nav, Tabs } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CashFlow from './CashFlow';
import SpendingCategories from './SpendingCategories';

import { isMobile } from 'react-device-detect';

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const prevMonthDate = new Date();
prevMonthDate.setMonth(new Date().getMonth() - 1);
const prevMonth = prevMonthDate.getMonth() + 1;
const prevYear = prevMonthDate.getFullYear();

export const StatisticsContent = (props) => {
    const [isComponentLoading, setIsComponentLoading] = useState(true);
    const [chartSize, setChartSize] = useState(isMobile ? '35vh' : '50vh');
    const [refreshChart, setRefreshChart] = useState(true);

    return (
        <Container className="p-0 mt-3">
            <Row>
                <Col className="p-0">
                    <Tabs defaultActiveKey="first" onSelect={() => setRefreshChart(!refreshChart)}>
                        <Tab eventKey="first" title="Cash Flow">
                            <CashFlow
                                currentDate={{ month: currentMonth, year: currentYear }}
                                prevDate={{ month: prevMonth, year: prevYear }}
                                redraw={refreshChart}
                                size={chartSize}
                            />
                        </Tab>
                        <Tab eventKey="second" title="Spending Categories">
                            <SpendingCategories currentDate={{ month: currentMonth, year: currentYear }} redraw={refreshChart} size={chartSize} />
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
