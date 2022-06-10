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
    const [isComponentLoading, setIsComponentLoading] = useState(true);
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
            let data = [];
            props.yahooFinance.historicalData.forEach((e) => {
                const userAssetDetails = props.investments.investmentsList.find((f) => f.symbol === e.symbol);
                if (userAssetDetails) {
                    const oneAssetData = buildData(userAssetDetails, e.data);
                    data = [...data, ...oneAssetData];
                }
            });

            const sortedArray = data.sort((a, b) => new moment(a.x) - new moment(b.x));
            const arrayWithSundaysOnly = sortedArray.map((f) => ({ x: getSunday(f.x), y: f.y }));

            const arrayWithSummedValues = Object.values(
                sortedArray.reduce((r, { x, y }) => {
                    r[x] ??= { x, ytotal: 0 };
                    r[x].ytotal += y;
                    return r;
                }, {})
            );

            arrayWithSummedValues.map((j) => {
                j['y'] = j['ytotal'];
                delete j['ytotal'];
            });

            datasets.push({ label, data: arrayWithSummedValues, showLine, fill });
        }

        return datasets;
    };

    // sunday = 0, monday = 1...
    const getSunday = (momentObject) => {
        const dateObject = momentObject.toDate();
        const day = dateObject.getDay(),
            diff = dateObject.getDate() - day;
        // + (day == 0 ? -6 : 1); // adjust when day is sunday if you want monday
        return moment(dateObject.setDate(diff));
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
                            return Math.floor(val) === val ? '$' + val : '';
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
                    // overrides default behaviour
                    onClick: (evt, item, legend) => {
                        // reset zoom
                        chartRef.current.resetZoom();
                        // then call original function
                        ChartJS.defaults.plugins.legend.onClick(evt, item, legend);
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
            <Row className="m-0 mt-4">
                <Col className="text-center">
                    <Form.Check
                        type="switch"
                        id="assets-quantity"
                        label="Ignore Number of Shares"
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
