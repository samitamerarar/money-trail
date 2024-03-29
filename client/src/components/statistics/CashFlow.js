import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Container, Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import CustomMonthPicker from './CustomMonthPicker.js';

import { getExpenseOfMonth, getIncomeOfMonth, getCashFlowOfMonth, monthNames } from './helper.js';
import { isMobile } from 'react-device-detect';

export const CashFlow = ({ transactions, currentDate, prevDate, redraw }) => {
    const [chartDefinition, setChartDefinition] = useState({});
    const [firstChartDate, setFirstChartDate] = useState({ year: currentDate.year, month: currentDate.month });
    const [secondChartDate, setSecondChartDate] = useState({ year: prevDate.year, month: prevDate.month });
    const [datePickerRange, setDatePickerRange] = useState({ min: { year: 2000, month: 1 }, max: { year: currentDate.year, month: currentDate.month } }); // eslint-disable-line

    useEffect(() => {
        setChartDefinition(createChartDefinition());
    }, [firstChartDate, secondChartDate, redraw]); // eslint-disable-line

    const setFirstChartDateFromDatePicker = ({ year, month }) => {
        setFirstChartDate({ year, month });
    };

    const setSecondChartDateFromDatePicker = ({ year, month }) => {
        setSecondChartDate({ year, month });
    };

    const getExpenseData = () => {
        const currentMonthExpenseTotal = getExpenseOfMonth(firstChartDate.month, firstChartDate.year, transactions.transactions);
        const prevMonthExpenseTotal = getExpenseOfMonth(secondChartDate.month, secondChartDate.year, transactions.transactions);

        return [currentMonthExpenseTotal, prevMonthExpenseTotal];
    };

    const getIncomeData = () => {
        const currentMonthIncomeTotal = getIncomeOfMonth(firstChartDate.month, firstChartDate.year, transactions.transactions);
        const prevMonthIncomeTotal = getIncomeOfMonth(secondChartDate.month, secondChartDate.year, transactions.transactions);

        return [currentMonthIncomeTotal, prevMonthIncomeTotal];
    };

    const createChartDefinition = () => {
        const options = {
            aspectRatio: 1,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: false,
                    text: 'Title'
                },
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                },
                datalabels: {
                    display: true,
                    color: 'rgb(102,102,102)',
                    anchor: 'end',
                    clip: true
                }
            },
            borderRadius: 8,
            barPercentage: 1.25,
            scales: {
                xAxis: {
                    display: false
                },
                yAxis: {
                    display: false,
                    grace: '40%'
                }
            }
        };

        const data = {
            labels: ['Current Month', 'Previous Month'],
            datasets: [
                {
                    label: 'Expense',
                    data: getExpenseData(),
                    backgroundColor: '#A33327',
                    datalabels: {
                        // align: 'right',
                        // offset: '-150',
                        labels: {
                            title: {
                                font: { size: '14', lineHeight: '1.4' },
                                formatter: (value, context) => {
                                    return ['Spent', '', '', ''];
                                }
                            },
                            value: {
                                font: { weight: 'bold', size: '15' },
                                formatter: (value, context) => {
                                    return ['', Number(value).toLocaleString('en-US') + '$', '', ''];
                                }
                            }
                        }
                    }
                },
                {
                    label: 'Income',
                    data: getIncomeData(),
                    backgroundColor: '#689775',
                    datalabels: {
                        // align: 'left',
                        // offset: '-150',
                        labels: {
                            title: {
                                font: { size: '14', lineHeight: '1.4' },
                                formatter: (value, context) => {
                                    return ['Earned', '', '', ''];
                                }
                            },
                            value: {
                                font: { weight: 'bold', size: '15' },
                                formatter: (value, context) => {
                                    return ['', Number(value).toLocaleString('en-US') + '$', '', ''];
                                }
                            }
                        }
                    }
                }
            ]
        };

        return { options, data };
    };

    return (
        <Container className="p-0 mt-3">
            <Row className="m-0" style={{ color: 'rgb(102,102,102)' }}>
                <Col className="text-left pl-4">
                    <h5>{monthNames[firstChartDate.month - 1]} cash</h5>
                    <h4 style={{ lineHeight: '50%' }} className="font-weight-bold">
                        {Number(getCashFlowOfMonth(firstChartDate.month, firstChartDate.year, transactions.transactions)).toLocaleString('en-US') + '$'}
                    </h4>
                </Col>
                <Col className="text-right pr-4">
                    <h5>{monthNames[secondChartDate.month - 1]} cash</h5>
                    <h4 style={{ lineHeight: '50%' }} className="font-weight-bold">
                        {Number(getCashFlowOfMonth(secondChartDate.month, secondChartDate.year, transactions.transactions)).toLocaleString('en-US') + '$'}
                    </h4>
                </Col>
            </Row>
            <Container className="p-0 shadow-light">
                {chartDefinition.data && chartDefinition.options && (
                    <Bar
                        style={{ height: isMobile ? '35vh' : '50vh' }}
                        plugins={[ChartDataLabels]}
                        options={chartDefinition.options}
                        data={chartDefinition.data}
                        redraw={true}
                    />
                )}
            </Container>

            <Row className="m-0 mt-4">
                <Col className="p-0">
                    <CustomMonthPicker range={datePickerRange} setChartDate={(e) => setFirstChartDateFromDatePicker(e)} defaultDate={firstChartDate} />
                </Col>
                <Col className="p-0">
                    <CustomMonthPicker range={datePickerRange} setChartDate={(e) => setSecondChartDateFromDatePicker(e)} defaultDate={secondChartDate} />
                </Col>
            </Row>
        </Container>
    );
};

CashFlow.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    transactions: state.transactions
});

export default connect(mapStateToProps, {})(CashFlow);
