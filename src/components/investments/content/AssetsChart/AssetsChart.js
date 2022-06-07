import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Container, Col } from 'react-bootstrap';
import { Scatter } from 'react-chartjs-2';
import { getHistoricalData } from '../../../../actions/yahooActions';

export const AssetsChart = (props) => {
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
    }, [props.yahooFinance.historicalData]);

    const buildDatasets = () => {
        const datasets = [];

        props.yahooFinance.historicalData.forEach((e) => {
            const data = [];
            const label = e.symbol;
            e.data.forEach((xy) => {
                data.push({ x: xy.date, y: xy.high });
            });
            const showLine = true;
            const fill = true;
            const borderColor = 'rgba(0, 200, 0, 1)';

            datasets.push({ label, data, showLine, fill, borderColor });
        });
        console.log(datasets);
        return datasets;
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
                    // beginAtZero: true
                },
                xAxes: [
                    {
                        type: 'time',
                        time: {
                            unit: 'day',
                            unitStepSize: 1,
                            displayFormats: {
                                day: 'MMM DD',
                                week: 'MMM DD'
                            }
                        }
                    }
                ]
            }
        };

        const data = {
            datasets: buildDatasets()
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
