import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Container, Col } from 'react-bootstrap';
import { Scatter } from 'react-chartjs-2';
import { getHistoricalData } from '../../../../actions/yahooActions';

export const AssetsChart = (props, { chartData }) => {
    const [isComponentLoading, setIsComponentLoading] = useState(true);
    const [chartDefinition, setChartDefinition] = useState({});

    useEffect(() => {
        // const queryOptions = { period1: '2021-02-01' /* ... */ };
        // props.yahooFinance.tickerData.forEach((e) => {
        //     const symbol = 'TSLA';
        //     props.getHistoricalData({ symbol, queryOptions });
        // });
    }, []);

    useEffect(() => {
        console.log(props);
        setChartDefinition(createChartDefinition());
    }, [chartData]);

    const getExpenseData = () => {
        const monthExpenses = [];

        return monthExpenses;
    };

    const createChartDefinition = () => {
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        const data = {
            datasets: [
                {
                    label: 'Chart 1',
                    data: [
                        { x: 1, y: 2 },
                        { x: 2, y: 4 },
                        { x: 3, y: 8 },
                        { x: 4, y: 16 }
                    ],
                    showLine: true,
                    fill: false,
                    borderColor: 'rgba(0, 200, 0, 1)'
                },
                {
                    label: 'Chart 2',
                    data: [
                        { x: 9, y: 3 },
                        { x: 3, y: 4 },
                        { x: 4, y: 6 },
                        { x: 6, y: 9 }
                    ],
                    showLine: true,
                    fill: false,
                    borderColor: 'rgba(200, 0, 0, 1)'
                }
            ]
        };

        return { options, data };
    };

    return (
        <Container className="p-0 mt-3">
            <Row className="m-0">
                <Col>{chartDefinition.data && chartDefinition.options && <Scatter data={chartDefinition.data} options={chartDefinition.options} />}</Col>
            </Row>

            <Row className="m-0 mt-4"></Row>
        </Container>
    );
};

AssetsChart.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    yahooFinance: PropTypes.object.isRequired,
    getHistoricalData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    yahooFinance: state.yahooFinance
});

export default connect(mapStateToProps, { getHistoricalData })(AssetsChart);
