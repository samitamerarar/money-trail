import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Container, Col, Tab, Nav } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

export const CashFlow = (props) => {
    const [isComponentLoading, setIsComponentLoading] = useState(true);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart'
            }
        }
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'July', 'July', 'July', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Expenses',
                data: [1, 2, 6, 8],
                backgroundColor: 'rgba(219, 68, 55, 1)'
            },
            {
                label: 'Income',
                data: [44, 2, 62, 8],
                backgroundColor: 'rgba(61, 194, 105, 1)'
            }
        ]
    };

    return (
        <Container>
            <Bar options={options} data={data} />
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
