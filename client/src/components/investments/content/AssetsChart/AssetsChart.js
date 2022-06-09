import React, { useEffect, useState, useRef } from 'react';
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
    const chartRef = useRef(null);

    useEffect(() => {
        setChartDefinition(createChartDefinition());
    }, [props.yahooFinance.historicalData, props.redraw]);

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
            const ticker = label.concat('ÿÿÿ').substring(0, 3);
            const borderColor =
                '#' + Number(ticker.charCodeAt(0)).toString(16) + Number(ticker.charCodeAt(1)).toString(16) + Number(ticker.charCodeAt(2)).toString(16);

            datasets.push({ label, data, showLine, fill, borderColor });
        });

        return datasets;
    };

    const createChartDefinition = () => {
        const options = {
            responsive: true,
            maintainAspectRatio: false,
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
                y: {
                    ticks: {
                        // prevents decimals
                        callback: function (val, index) {
                            return Math.floor(val) === val ? val : '';
                        }
                    }
                }
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
                        pinch: {
                            enabled: true
                        },
                        mode: 'xy'
                    },
                    limits: {
                        x: { min: 'original', max: 'original', minRange: 2628000000 * 2 }, // 2 months in ms
                        y: { min: 'original', max: 'original', minRange: 200 } // 200$
                    }
                },
                legend: {
                    onClick: (evt, item, legend) => {
                        // overrides default behaviour
                        // call original function
                        ChartJS.defaults.plugins.legend.onClick(evt, item, legend);
                        // then reset zoom
                        chartRef.current.resetZoom();
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
            <Container className="p-0">
                {chartDefinition.data && chartDefinition.options && (
                    <Scatter ref={chartRef} style={{ height: '50vh' }} data={chartDefinition.data} options={chartDefinition.options} redraw={true} />
                )}
            </Container>
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
