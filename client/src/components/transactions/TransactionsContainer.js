import React, { useEffect, useState } from 'react';
import { Row, Container, Col, Button, DropdownButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Content from './content/Content';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { addTransaction, getTransactions } from '../../actions/transactionActions';

import ScaleLoader from 'react-spinners/ScaleLoader';

export const TransactionsContainer = (props) => {
    const [yearFilter, setYearFilter] = useState();
    const [yearsAvailable, setYearsAvailable] = useState([]);

    const [isComponentLoading, setIsComponentLoading] = useState(false);
    const [APIFetchDone, setAPIFetchDone] = useState(false);

    /**
     * Control UI Loading.
     */
    useEffect(() => {
        setIsComponentLoading(false);
    }, [APIFetchDone]);

    useEffect(() => {
        if (yearsAvailable.length > 0) setYearFilter(yearsAvailable[0]);
    }, [yearsAvailable]);

    useEffect(() => {
        setIsComponentLoading(true);
        props.getTransactions().then(() => setAPIFetchDone(!APIFetchDone));
    }, []);

    const renderDropdownYears = () => {
        let items = [];
        yearsAvailable.forEach((year) => {
            items.push(
                <DropdownItem
                    title={year}
                    onClick={(e) => {
                        e.preventDefault();
                        onDropdownSelected(e);
                    }}>
                    {year}
                </DropdownItem>
            );
        });

        return items;
    };

    const onDropdownSelected = (e) => {
        setYearFilter(e.target.title);
    };

    const setYears = (e) => setYearsAvailable(e);

    return (
        <>
            {isComponentLoading ? (
                <Container className="mt-5">
                    <Row className="justify-content-center m-3">Loading transactions...</Row>
                    <Row className="justify-content-center">
                        <ScaleLoader color={'#007bff'} speedMultiplier={1} />
                    </Row>
                </Container>
            ) : (
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

                    <Content selectedYear={yearFilter} setYears={(e) => setYears(e)} state={props} />
                </Container>
            )}
        </>
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
