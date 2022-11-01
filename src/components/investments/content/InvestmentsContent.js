import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInvestments, addInvestment } from '../../../actions/investmentAction';
import { getTickerData, getHistoricalData, clearSearchStockState } from '../../../actions/yahooActions';

import AddAssetModal from './AddAsset/AddAsset';

import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import InvestmentsTabs from './InvestmentsTabs';
import Loading from '../../layout/Loading';

export const InvestmentsContent = (props) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [investmentsFetchDone, setInvestmentsFetchDone] = useState(false);
    const [tickerFetchDone, setTickerFetchDone] = useState(false);
    const [loadingTickerFetch, setLoadingTickerFetch] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => {
        props.clearSearchStockState();
        setIsOpenModal(false);
    };

    const [mergedData, setMergedData] = useState([]);
    const [needToMergeData, setNeedToMergeData] = useState(false);

    const { investmentsList, investmentsLoading } = props.investments;
    const { tickerData } = props.yahooFinance;

    // add investment to database
    const handleSubmit = (data) => {
        if (data) {
            props.addInvestment(data);
        }
    };

    /**
     * Get User Investments.
     * run this once.
     */
    useEffect(() => {
        setLoadingTable(true);
        props.getInvestments().then(() => setInvestmentsFetchDone(true));
    }, []); // eslint-disable-line

    /**
     * For each User Investment, fetch its live summary details from the API.
     */
    useEffect(() => {
        if (investmentsFetchDone) {
            if (investmentsList.length > 0) {
                investmentsList.forEach((e, i) => {
                    if (e.justModified) setNeedToMergeData(!needToMergeData);
                    const found = tickerData.some((s) => s.symbol === e.symbol);
                    if (!found) {
                        setLoadingTickerFetch(true);
                        props.getTickerData(e).then(() => setTickerFetchDone(!tickerFetchDone));
                        props.getHistoricalData({ symbol: e.symbol, minDate: e.purchaseDate }).then(() => setTickerFetchDone(!tickerFetchDone));
                    }
                });
            } else {
                setMergedData([]);
                setLoadingTable(false);
            }
        }
    }, [investmentsList, investmentsFetchDone]); // eslint-disable-line

    /**
     * Control UI Loading.
     */
    useEffect(() => {
        setLoadingTickerFetch(false);
        setNeedToMergeData(!needToMergeData);
    }, [tickerFetchDone]); // eslint-disable-line

    /**
     * When we get new tickers new data, Merge tickers data with the user investments data.
     * When needToMergeData is Toggled, Merge live data with the user data.
     */
    useEffect(() => {
        if (tickerData.length > 0) {
            setLoadingTable(true);
            mergeUserInvestmentsWithRealTimeData();
        }
    }, [tickerData, needToMergeData]); // eslint-disable-line

    /**
     * This function is used to merge 2 arrays (Yahoo Tickers Data with User Investments).
     */
    const mergeUserInvestmentsWithRealTimeData = () => {
        if (investmentsList.length > 0) {
            // Merge the 2 arrays on the field 'symbol'
            let mergedArray = investmentsList.map((e1) => {
                if (tickerData.find((e2) => e2.symbol === e1.symbol)) {
                    return {
                        ...e1,
                        ...tickerData.find((e2) => e2.symbol === e1.symbol)
                    };
                }
                return {};
            });

            // remove undefined objects
            mergedArray = mergedArray.filter((e) => e !== undefined);

            if (mergedArray.length > 0) {
                // Calculate additionals fields
                mergedArray.forEach((e) => {
                    e['changeFromPurchasePercent'] = (e.regularMarketPrice - e.priceOfShare) / e.priceOfShare;
                    e['sizeOfPosition'] = e.regularMarketPrice * e.numberOfShares;
                    e['positionProfitOrLoss'] = (e.regularMarketPrice - e.priceOfShare) * e.numberOfShares;
                });

                // sum the size of position
                const sumOfPosition = mergedArray.reduce((n, { sizeOfPosition }) => n + sizeOfPosition, 0);

                mergedArray.forEach((e) => {
                    e['positionExposure'] = e.sizeOfPosition / sumOfPosition;
                });

                convertElementsInArray(mergedArray);
                setMergedData([...mergedArray]);
            }
        }

        setLoadingTable(false);
    };

    const convertElementsInArray = (array) => {
        array.forEach((e, i) => {
            Object.keys(e).forEach((key, j) => {
                if (
                    key &&
                    (key === 'priceOfShare' ||
                        key === 'sizeOfPosition' ||
                        key === 'positionProfitOrLoss' ||
                        key === 'marketCap' ||
                        key === 'regularMarketPrice' ||
                        key === 'regularMarketChange' ||
                        key === 'regularMarketDayHigh' ||
                        key === 'regularMarketDayLow' ||
                        key === 'regularMarketOpen' ||
                        key === 'regularMarketPreviousClose' ||
                        key === 'fiftyTwoWeekHigh' ||
                        key === 'fiftyTwoWeekLowChange' ||
                        key === 'fiftyTwoWeekHighChange' ||
                        key === 'bookValue' ||
                        key === 'numberOfShares' ||
                        key === 'regularMarketVolume' ||
                        key === 'averageDailyVolume3Month' ||
                        key === 'sharesOutstanding' ||
                        key === 'forwardPE' ||
                        key === 'priceToBook' ||
                        key === 'trailingPE' ||
                        key === 'priceToSalesTrailing12Months' ||
                        key === 'beta' ||
                        key === 'trailingAnnualDividendRate')
                ) {
                    array[i][key] = e[key].toLocaleString('en-US', {
                        maximumFractionDigits: 2
                    });
                }

                if (
                    key &&
                    (key === 'changeFromPurchasePercent' ||
                        key === 'positionExposure' ||
                        key === 'trailingAnnualDividendYield' ||
                        key === 'fiftyTwoWeekLowChangePercent' ||
                        key === 'fiftyTwoWeekHighChangePercent')
                ) {
                    if (typeof e[key] === 'string') e[key] = parseFloat(e[key].replaceAll(',', ''));

                    e[key] =
                        (e[key] * 100).toLocaleString('en-US', {
                            maximumFractionDigits: 2
                        }) + '%';
                }

                if (key && key === 'regularMarketChangePercent') {
                    if (typeof e[key] === 'string') e[key] = parseFloat(e[key].replaceAll(',', ''));

                    e[key] =
                        e[key].toLocaleString('en-US', {
                            maximumFractionDigits: 2
                        }) + '%';
                }

                if (key && (key === 'dividendDate' || key === 'purchaseDate')) {
                    let theDate = new Date(e[key]);
                    e[key] = new Date(theDate.getTime() - theDate.getTimezoneOffset() * -60000).toDateString();
                }
            });
        });

        return array;
    };

    return (
        <Container fluid>
            {investmentsLoading || loadingTickerFetch || loadingTable ? (
                <Loading loadingwhat="assets" />
            ) : (
                <Row>
                    <Col className="p-0">
                        <Container>
                            <Row className="mt-3">
                                <Col className="pl-1">
                                    <p className="grey-text text-darken-1">
                                        You have <b>{mergedData.length}</b> assets.
                                    </p>
                                </Col>
                                <Col className="d-flex justify-content-end pr-1">
                                    <Button variant="primary" onClick={(e) => openModal()}>
                                        + Asset
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                        <>
                            {mergedData.length > 0 ? (
                                <Container className="p-0">
                                    <InvestmentsTabs tableData={mergedData} />
                                </Container>
                            ) : (
                                <Container className="mt-5">
                                    <Row className="justify-content-center text-center m-3">
                                        You don't have any Assets.
                                        <br />
                                        Time to invest!
                                    </Row>
                                    <Row className="justify-content-center">
                                        <ClimbingBoxLoader color={'black'} speedMultiplier={0.33} />
                                    </Row>
                                </Container>
                            )}
                        </>
                    </Col>
                </Row>
            )}

            <AddAssetModal show={isOpenModal} onHide={() => closeModal()} handleSubmit={(e) => handleSubmit(e)} />
        </Container>
    );
};

InvestmentsContent.propTypes = {
    auth: PropTypes.object.isRequired,
    investments: PropTypes.object.isRequired,
    yahooFinance: PropTypes.object.isRequired,
    clearSearchStockState: PropTypes.func.isRequired,
    getTickerData: PropTypes.func.isRequired,
    getHistoricalData: PropTypes.func.isRequired,
    addInvestment: PropTypes.func.isRequired,
    getInvestments: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    investments: state.investments,
    yahooFinance: state.yahooFinance
});

export default connect(mapStateToProps, {
    getTickerData,
    getHistoricalData,
    getInvestments,
    addInvestment,
    clearSearchStockState
})(InvestmentsContent);
