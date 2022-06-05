import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Container, Col, Tab, Nav } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const CashFlow = (props) => {
    const [isComponentLoading, setIsComponentLoading] = useState(true);

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
                grace: '5%'
            }
        }
    };

    const labels = ['January', 'prev month'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Expenses',
                data: [3, 4],
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
                                return ['', value + '0,000$', '', ''];
                            }
                        }
                    }
                }
            },
            {
                label: 'Income',
                data: [5, 2],
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
                                return ['', value + '0,000$', '', ''];
                            }
                        }
                    }
                }
            }
        ]
    };

    return (
        <Container className="p-0 mt-3">
            <Row style={{ color: 'rgb(102,102,102)' }}>
                <Col className="text-left pl-4">
                    <h5>December cash flow</h5>
                    <h4 style={{ lineHeight: '50%' }} className="font-weight-bold">
                        20,000$
                    </h4>
                </Col>
                <Col className="text-right pr-4">
                    <h5>November cash flow</h5>
                    <h4 style={{ lineHeight: '50%' }} className="font-weight-bold">
                        20,000$
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
