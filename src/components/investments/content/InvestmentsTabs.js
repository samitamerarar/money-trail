import React, { useEffect, useState } from 'react';
import { Row, Container, Col, Tab, Nav, Tabs } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AssetsTable from './AssetsTable/AssetsTable';
import AssetsChart from './AssetsChart/AssetsChart';

export const InvestmentsTabs = ({ tableData }) => {
    const [isComponentLoading, setIsComponentLoading] = useState(true);
    const [refreshChart, setRefreshChart] = useState(true);

    return (
        <Container className="p-0 m-0 mt-3">
            <Row className="m-0">
                <Col className="p-0 mb-5">
                    <Tabs defaultActiveKey="first" onSelect={() => setRefreshChart(!refreshChart)}>
                        <Tab eventKey="first" title="Portfolio">
                            <AssetsTable tableData={tableData} />
                        </Tab>
                        <Tab eventKey="second" title="Historical Data">
                            <AssetsChart chartData={tableData} redraw={refreshChart} />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
};

InvestmentsTabs.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {})(InvestmentsTabs);
