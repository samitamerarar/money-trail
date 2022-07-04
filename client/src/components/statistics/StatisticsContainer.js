import React, { useEffect, useState } from 'react';
import { Row, Container, Col, DropdownButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTransactions } from '../../actions/transactionActions';
import Loading from '../layout/Loading';
import StatisticsContent from './StatisticsContent';

import Background from '../layout/assets/undraw_ordinary_day_re_v5hy.svg';
import UnDraw from '../layout/UnDraw';

const isEmpty = require('is-empty');

export const StatisticsContainer = (props) => {
    const { transactions } = props.transactions;
    const [isComponentLoading, setIsComponentLoading] = useState(true);

    useEffect(() => {
        setIsComponentLoading(props.transactions.transactionsLoading);
    }, [props.transactions.transactionsLoading]);

    useEffect(() => {
        setIsComponentLoading(true);
        props.getTransactions();
    }, []);

    return (
        <Container
            fluid
            className="minimum-height-content"
            style={{
                background: `linear-gradient(rgba(255,255,255,.92), rgba(255,255,255,.92)), url(${Background}) no-repeat bottom center`,
                backgroundSize: 'contain'
            }}>
            <Container>
                <Row className="pt-3">
                    <h4>Statistics</h4>
                </Row>
            </Container>

            {!isEmpty(props.errors) ? (
                <UnDraw
                    image={'undraw_bug_fixing_oc-7-a'}
                    size="45vh"
                    title="There is a problem with the server"
                    subtitle="Try to refresh the page?"
                    refresh={true}
                />
            ) : (
                <>
                    {isComponentLoading ? (
                        <Loading loadingwhat="statistics" />
                    ) : (
                        <>
                            {transactions.length > 0 ? (
                                <StatisticsContent />
                            ) : (
                                <>
                                    <UnDraw image={'undraw_empty_re_opql'} size="45vh" title="No Statistics yet!" subtitle="Start by adding a Transaction." />
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </Container>
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
