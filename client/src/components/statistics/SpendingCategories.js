import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Container, Col } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import DoughnutLabel from 'chartjs-plugin-doughnutlabel-rebourne';
import MonthPicker from './MonthPicker.js';

import { getExpenseOfMonthCategory, getExpenseOfMonth, monthNames } from './helper.js';
import { isMobile } from 'react-device-detect';

export const SpendingCategories = ({ transactions, currentDate, redraw }) => {
    const [isComponentLoading, setIsComponentLoading] = useState(true);
    const [chartDefinition, setChartDefinition] = useState({});
    const [monthExpense, setMonthExpense] = useState(0);
    const [chartDate, setChartDate] = useState({ year: currentDate.year, month: currentDate.month });
    const [datePickerRange, setDatePickerRange] = useState({ min: { year: 2000, month: 1 }, max: { year: currentDate.year, month: currentDate.month } });

    useEffect(() => {
        setMonthExpense(getExpenseOfMonth(chartDate.month, chartDate.year, transactions.transactions));
    }, [chartDate]);

    useEffect(() => {
        setChartDefinition(createChartDefinition());
    }, [monthExpense, redraw]);

    const setChartDateFromDatePicker = ({ year, month }) => {
        setChartDate({ year, month });
    };

    const getExpenseData = () => {
        const categories = ['automobile', 'clothing', 'food', 'fun', 'electronics', 'amenities', 'personal', 'medical', 'other'];
        const monthExpenses = [];
        categories.forEach((cat) => monthExpenses.push(getExpenseOfMonthCategory(chartDate.month, chartDate.year, cat, transactions.transactions)));

        return monthExpenses;
    };

    const createChartDefinition = () => {
        const options = {
            aspectRatio: 1,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                    position: 'bottom'
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function (tooltipItem) {
                            const category = tooltipItem.label;
                            const percent = Math.round((tooltipItem.raw / monthExpense) * 100);
                            return ` ${tooltipItem.formattedValue}$ (${percent}%) ${category}`;
                        }
                    }
                },
                datalabels: {
                    textAlign: 'center',
                    color: 'white',
                    formatter: (value, context) => {
                        const category = context.chart.data.labels[context.dataIndex];
                        const percent = Math.round((value / monthExpense) * 100);
                        return percent > 5 ? `${value}$ (${percent}%)\n ${category}` : '';
                    }
                },
                doughnutlabel: {
                    labels: [
                        {
                            text: `Total ${monthNames[chartDate.month - 1]} Spending`,
                            font: {
                                size: 14
                            }
                        },
                        {
                            text: `${monthExpense}$`,
                            font: {
                                size: 16,
                                weight: 'bold'
                            }
                        }
                    ]
                }
            }
        };

        const data = {
            labels: ['Automobile', 'Clothing', 'Food', 'Fun', 'Electronics', 'Amenities', 'Personal', 'Medical', 'Other'],
            datasets: [
                {
                    label: 'Title',
                    data: getExpenseData(),
                    backgroundColor: [
                        'rgba(236, 112, 99, 1)',
                        'rgba(175, 122, 197, 1)',
                        'rgba(93, 173, 226, 1)',
                        'rgba(84, 153, 199, 1)',
                        'rgba(72, 201, 176, 1)',
                        'rgba(82, 190, 128, 1)',
                        'rgba(244, 208, 63, 1)',
                        'rgba(245, 176, 65, 1)',
                        'rgba(170, 183, 184, 1)'
                    ],
                    borderColor: [
                        'rgba(231, 76, 60, 1)',
                        'rgba(155, 89, 182, 1)',
                        'rgba(52, 152, 219, 1)',
                        'rgba(41, 128, 185, 1)',
                        'rgba(26, 188, 156, 1)',
                        'rgba(39, 174, 96, 1)',
                        'rgba(241, 196, 15, 1)',
                        'rgba(243, 156, 18, 1)',
                        'rgba(149, 165, 166, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        };

        return { options, data };
    };

    return (
        <Container className="p-0 mt-3">
            <Row className="m-0 shadow-medium">
                <Col>
                    {chartDefinition.data && chartDefinition.options && (
                        <Doughnut
                            style={{ height: isMobile ? '45vh' : '50vh' }}
                            plugins={[ChartDataLabels, DoughnutLabel]}
                            data={chartDefinition.data}
                            options={chartDefinition.options}
                            redraw={true}
                        />
                    )}
                </Col>
            </Row>

            <Row className="m-0 mt-4">
                <Col className="text-center p-0">
                    <MonthPicker range={datePickerRange} setChartDate={(e) => setChartDateFromDatePicker(e)} defaultDate={chartDate} />
                </Col>
            </Row>
        </Container>
    );
};

SpendingCategories.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    transactions: state.transactions
});

export default connect(mapStateToProps, {})(SpendingCategories);
