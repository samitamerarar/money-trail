import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Container, Col, Tab, Nav } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { getExpenseOfMonth, getIncomeOfMonth, getCashFlowOfMonth, monthNames } from './helper.js';

const currentMonth = new Date().getMonth() + 1;
const currentMonthName = monthNames[new Date().getMonth()];
const currentYear = new Date().getFullYear();

const previousMonthDate = new Date();
previousMonthDate.setMonth(new Date().getMonth() - 1);
const previousMonth = previousMonthDate.getMonth() + 1;
const previousMonthName = monthNames[previousMonthDate.getMonth()];
const previousYear = previousMonthDate.getFullYear();

export const CashFlow = (props) => {
    const [isComponentLoading, setIsComponentLoading] = useState(true);

    const getExpenseData = () => {
        const currentMonthExpenseTotal = getExpenseOfMonth(currentMonth, currentYear, props.transactions.transactions);
        const prevMonthExpenseTotal = getExpenseOfMonth(previousMonth, previousYear, props.transactions.transactions);

        return [currentMonthExpenseTotal, prevMonthExpenseTotal];
    };

    const getIncomeData = () => {
        const currentMonthIncomeTotal = getIncomeOfMonth(currentMonth, currentYear, props.transactions.transactions);
        const prevMonthIncomeTotal = getIncomeOfMonth(previousMonth, previousYear, props.transactions.transactions);

        return [currentMonthIncomeTotal, prevMonthIncomeTotal];
    };

    const options = {
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
                grace: '20%'
            }
        }
    };

    const labels = [currentMonthName, previousMonthName];

    const data = {
        labels,
        datasets: [
            {
                label: 'Expense',
                data: getExpenseData(),
                backgroundColor: '#df584d',
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
                backgroundColor: '#50c878',
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

    return (
        <Container className="p-0 mt-3">
            <Row className="m-0" style={{ color: 'rgb(102,102,102)' }}>
                <Col className="text-left pl-4">
                    <h5>{currentMonthName} cash flow</h5>
                    <h4 style={{ lineHeight: '50%' }} className="font-weight-bold">
                        {Number(getCashFlowOfMonth(currentMonth, currentYear, props.transactions.transactions)).toLocaleString('en-US') + '$'}
                    </h4>
                </Col>
                <Col className="text-right pr-4">
                    <h5>{previousMonthName} cash flow</h5>
                    <h4 style={{ lineHeight: '50%' }} className="font-weight-bold">
                        {Number(getCashFlowOfMonth(previousMonth, previousYear, props.transactions.transactions)).toLocaleString('en-US') + '$'}
                    </h4>
                </Col>
            </Row>
            <Container className="p-0">
                <Bar style={{ height: '50vh' }} plugins={[ChartDataLabels]} options={options} data={data} />
            </Container>
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
