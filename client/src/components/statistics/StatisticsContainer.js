import React, { useEffect, useState } from 'react';
import { Row, Container, Col, DropdownButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTransactions } from '../../actions/transactionActions';
import Loading from '../layout/Loading';
import StatisticsContent from './StatisticsContent';

export const StatisticsContainer = (props) => {
    const [isComponentLoading, setIsComponentLoading] = useState(true);

    useEffect(() => {
        setIsComponentLoading(props.transactions.transactionsLoading);
    }, [props.transactions.transactionsLoading]);

    useEffect(() => {
        setIsComponentLoading(true);
        props.getTransactions();
    }, []);

    return (
        <>
            {isComponentLoading ? (
                <Loading loadingwhat="statistics" />
            ) : (
                <Container fluid>
                    <Container>
                        <Row className="mt-3">
                            <h4>Statistics</h4>
                        </Row>
                    </Container>

                    <StatisticsContent />
                </Container>
            )}
        </>
    );
};

StatisticsContainer.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    transactions: state.transactions
});

export default connect(mapStateToProps, {
    getTransactions
})(StatisticsContainer);
