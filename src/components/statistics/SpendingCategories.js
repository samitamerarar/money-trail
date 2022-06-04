import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Container, Col, Tab, Nav } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

export const SpendingCategories = (props) => {
    const [isComponentLoading, setIsComponentLoading] = useState(true);

    const data = {
        labels: ['Automobile', 'Clothing', 'Food', 'Fun', 'Electronics', 'Amenities', 'Personal', 'Medial', 'Other'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3, 4, 6, 6],
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

    return (
        <Container>
            <Doughnut data={data} />
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
