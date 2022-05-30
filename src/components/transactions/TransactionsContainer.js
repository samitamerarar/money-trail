import React, { useEffect, useState } from 'react';
import { Row, Container, Col, DropdownButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Content from './content/Content';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { addTransaction, getTransactions } from '../../actions/transactionActions';
import Loading from '../layout/Loading';

export const TransactionsContainer = (props) => {
    const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
    const [yearsAvailable, setYearsAvailable] = useState([]);

    const [isComponentLoading, setIsComponentLoading] = useState(true);

    useEffect(() => {
        setIsComponentLoading(props.transactions.transactionsLoading);
    }, [props.transactions.transactionsLoading]);

    useEffect(() => {
        setIsComponentLoading(true);
        props.getTransactions();
    }, []);

    useEffect(() => {
        if (yearsAvailable.length > 0) setYearFilter(yearsAvailable[0]);
    }, [yearsAvailable]);

    const renderDropdownYears = () => {
        let items = [];
        yearsAvailable.forEach((year) => {
            items.push(
                <DropdownItem
                    key={year}
                    title={year}
                    onClick={(e) => {
                        e.preventDefault();
                        onYearDropdownSelect(e);
                    }}>
                    {year}
                </DropdownItem>
            );
        });

        return items;
    };

    const onYearDropdownSelect = (e) => {
        setYearFilter(e.target.title);
    };

    const setYears = (e) => {
        setYearsAvailable(e);
    };

    return (
        <Container fluid>
            <Container>
                <Row className="mt-3">
                    <h4>Transactions</h4>
                    {yearsAvailable.length > 0 && (
                        <Col className="d-flex justify-content-end" style={{ paddingRight: '2px' }}>
                            <DropdownButton size="sm" variant="secondary" id="dropdown-item-button" title={yearFilter}>
                                {renderDropdownYears()}
                            </DropdownButton>
                        </Col>
                    )}
                </Row>
            </Container>

            {isComponentLoading ? <Loading loadingwhat="transactions" /> : <Content selectedYear={yearFilter} setYears={(e) => setYears(e)} state={props} />}
        </Container>
    );
};

TransactionsContainer.propTypes = {
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
    getTransactions,
    addTransaction
})(TransactionsContainer);
