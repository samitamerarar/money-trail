import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Container, Col } from 'react-bootstrap';
import moment from 'moment';
import 'chartjs-adapter-moment';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';

import { getHistoricalData } from '../../../../actions/yahooActions';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, zoomPlugin);

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
        setChartDefinition(createChartDefinition());
    }, [props.yahooFinance.historicalData]);

    const buildDatasets = () => {
        const datasets = [];

        props.yahooFinance.historicalData.forEach((e) => {
            const label = e.symbol;
            const data = [{ x: moment(e.purchaseDate), y: Number(e.purchasePrice) }];
            e.data.forEach((xy, index) => {
                if (index > 0) data.push({ x: moment(xy.date), y: xy.high });
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
                x: {
                    type: 'time',
                    time: {
                        unit: 'week'
                    }
                },
                y: {}
            },
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy'
                    },
                    zoom: {
                        wheel: {
                            enabled: true
                        },
                        enabled: true,
                        mode: 'xy'
                    },
                    limits: {
                        x: { min: new Date('1995-12-17T03:24:00'), max: new Date('2022-12-17T03:24:00') },
                        y: { min: 0, max: 3000 }
                    }
                }
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
