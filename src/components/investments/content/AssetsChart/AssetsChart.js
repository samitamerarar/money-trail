import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Container, Col, Checkbox, FormCheck, Form } from 'react-bootstrap';
import moment from 'moment';
import 'chartjs-adapter-moment';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';

import { getHistoricalData } from '../../../../actions/yahooActions';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, zoomPlugin);

export const AssetsChart = (props) => {
    const [chartDefinition, setChartDefinition] = useState({});
    const [ignoreUserAssetsCount, setIgnoreUserAssetsCount] = useState(false);
    const [stackAssets, setStackAssets] = useState(false);
    const chartRef = useRef(null);

    useEffect(() => {
        setChartDefinition(createChartDefinition());
    }, [props.yahooFinance.historicalData, props.investments.investmentsList, ignoreUserAssetsCount, stackAssets, props.redraw]);

    const buildDatasets = () => {
        const datasets = [];

        if (!stackAssets) {
            props.yahooFinance.historicalData.forEach((e) => {
                const userAssetDetails = props.investments.investmentsList.find((f) => f.symbol === e.symbol);
                if (userAssetDetails) {
                    const label = e.symbol;
                    const data = buildData(userAssetDetails, e.data);
                    const showLine = true;
                    const fill = true;
                    const ticker = label.concat('ÿÿÿ').substring(0, 3);
                    const borderColor =
                        '#' + Number(ticker.charCodeAt(0)).toString(16) + Number(ticker.charCodeAt(1)).toString(16) + Number(ticker.charCodeAt(2)).toString(16);

                    datasets.push({ label, data, showLine, fill, borderColor });
                }
            });
        } else {
            const label = 'All Assets';
            const showLine = true;
            const fill = true;
            const borderColor = '#323232';
            let data = [];
            props.yahooFinance.historicalData.forEach((e) => {
                const userAssetDetails = props.investments.investmentsList.find((f) => f.symbol === e.symbol);
                if (userAssetDetails) {
                    const oneAssetData = buildData(userAssetDetails, e.data);
                    data = [...data, ...oneAssetData];
                }
            });

            const sortedArray = data.sort((a, b) => new moment(a.x) - new moment(b.x));
            const arrayNoWeekend = sortedArray.filter((f) => !isWeekend(f.x));

            // sum up when values are on the same day
            const arrayWithSummedValues = Object.values(
                arrayNoWeekend.reduce((r, { x, y }) => {
                    r[x] ??= { x, ytotal: 0 };
                    r[x].ytotal += y;
                    return r;
                }, {})
            );
            arrayWithSummedValues.map((j) => {
                j['y'] = j['ytotal'];
                delete j['ytotal'];
            });

            datasets.push({ label, data: arrayWithSummedValues, showLine, fill, borderColor });
        }

        return datasets;
    };

    const isWeekend = (momentObject) => {
        return momentObject.toDate().getDay() === 6 || momentObject.toDate().getDay() === 0;
    };

    const buildData = (asset, stockHistoricalData) => {
        const sharesBought = ignoreUserAssetsCount ? 1 : asset.numberOfShares;
        const data = [{ x: moment(asset.purchaseDate), y: Number(asset.priceOfShare * sharesBought) }];

        stockHistoricalData.forEach((xy, index) => {
            if (index > 0) data.push({ x: moment(xy.date), y: Number(xy.high * sharesBought) });
        });

        return data;
    };

    const handleIgnoreAssetsQuantity = (e) => {
        setIgnoreUserAssetsCount(e.target.checked);
    };

    const handleTotalWealth = (e) => {
        setStackAssets(e.target.checked);
        setIgnoreUserAssetsCount(false);
    };

    const drawLineOnChartOnHover = (chart) => {
        if (chart.tooltip?._active?.length && stackAssets) {
            let x = chart.tooltip._active[0].element.x;
            let yAxis = chart.scales.y;
            let ctx = chart.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, yAxis.top);
            ctx.lineTo(x, yAxis.bottom);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#F4B400';
            ctx.stroke();
            ctx.restore();
        }
    };

    const createChartDefinition = () => {
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                },
                y: {
                    ticks: {
                        // prevents decimals
                        callback: function (val, index) {
                            return Math.floor(val) === val ? '$' + val : '';
                        }
                    },
                    beginAtZero: true
                }
            },
            interaction: {
                intersect: stackAssets ? false : true,
                mode: stackAssets ? 'index' : 'nearest'
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title: (context) => {
                            return moment(context[0].raw.x).format('MMMM Do, YYYY');
                        },
                        label: function (context) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                },
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
                            enabled: !stackAssets
                        },
                        mode: 'x'
                    },
                    limits: {
                        x: {
                            min: 'original',
                            max: 'original',
                            minRange:
                                // if current scale is bigger than 2 months put it at 2 months, else at current scale minus 1 day
                                chartRef && chartRef.current && chartRef.current.scales
                                    ? chartRef.current.scales.x.max - chartRef.current.scales.x.min > 2628000000 * 2
                                        ? 2628000000 * 2
                                        : chartRef.current.scales.x.max - chartRef.current.scales.x.min - 86400000
                                    : false
                        },
                        y: {
                            min: 'original',
                            max: 'original',
                            // if current scale is bigger than 200$ put it at 200$, else at current scale
                            minRange:
                                chartRef && chartRef.current && chartRef.current.scales
                                    ? chartRef.current.scales.y.max > 200
                                        ? 200
                                        : chartRef.current.scales.y.max
                                    : false
                        }
                    }
                },
                legend: {
                    position: 'top',
                    // overrides default behaviour
                    onClick: (evt, item, legend) => {
                        // reset zoom
                        chartRef.current.resetZoom();
                        if (legend.chart.legend.legendItems.length > 1) {
                            // then call original function
                            ChartJS.defaults.plugins.legend.onClick(evt, item, legend);
                        }
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
                    <Scatter
                        ref={chartRef}
                        style={{ height: '50vh' }}
                        data={chartDefinition.data}
                        options={chartDefinition.options}
                        plugins={[
                            {
                                afterDraw: (chart) => {
                                    // to use with interaction.intersect = false
                                    drawLineOnChartOnHover(chart);
                                }
                            }
                        ]}
                        redraw={true}
                    />
                )}
            </Container>
            <Row className="m-0 mt-4">
                <Col className="text-center">
                    <Form.Check
                        disabled={stackAssets}
                        type="switch"
                        id="assets-quantity"
                        label="Ignore Shares"
                        onChange={handleIgnoreAssetsQuantity}
                        checked={ignoreUserAssetsCount}
                    />
                </Col>
                <Col className="text-center">
                    <Form.Check type="switch" id="total-wealth" label="Total Wealth" onChange={handleTotalWealth} checked={stackAssets} />
                </Col>
            </Row>
        </Container>
    );
};

AssetsChart.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    investments: PropTypes.object.isRequired,
    yahooFinance: PropTypes.object.isRequired,
    getHistoricalData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    investments: state.investments,
    yahooFinance: state.yahooFinance
});

export default connect(mapStateToProps, { getHistoricalData })(AssetsChart);
