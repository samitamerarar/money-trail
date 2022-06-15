import React, { useState, useEffect, Fragment } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { AsyncTypeahead, ClearButton } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { searchStock, clearSearchStockState } from '../../../../actions/yahooActions';

export const SearchTicker = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [startLoading, setStartLoading] = useState(false);
    const [results, setResults] = useState([]);

    const { searchData } = props.yahooFinance;
    const { investmentsList } = props.investments;

    const handleSearch = (query) => {
        setResults();
        setStartLoading(!startLoading);
        query.length > 2 && props.searchStock(query);
    };

    /**
     * Retrieve results from the Redux Store
     */
    useEffect(() => {
        if (searchData.length > 0) {
            const { quotes } = searchData[0];
            let resultsList = quotes.filter((i) => i.shortname && i.symbol).map((i) => ({ shortname: i.shortname, symbol: i.symbol }));

            // Remove already added symbols from the results
            resultsList = resultsList.filter((f) => !investmentsList.some((e) => e.symbol === f.symbol));

            // Remove not working ticker
            const reservedChars = [':', '/', '?', '#', '[', ']', '@', '!', '$', '&', '(', ')', '*', '+', ',', ';', '='];
            resultsList = resultsList.filter((f) => reservedChars.every((e) => f.symbol.indexOf(e) === -1));

            setResults(resultsList);
        } else {
            setResults();
        }
    }, [searchData]);

    useEffect(() => {
        setIsLoading(true);
    }, [startLoading]);

    useEffect(() => {
        results && setIsLoading(false);
    }, [results]);

    const sendSelectedToForm = (selected) => {
        props.getSelected(selected);
    };

    // Bypass client-side filtering by returning `true`. Results are already
    // filtered by the search endpoint, so no need to do it again.
    const filterBy = () => true;

    return (
        <Container className="p-0">
            <AsyncTypeahead
                {...props}
                filterBy={filterBy}
                id="async-search"
                labelKey="symbol"
                delay={800}
                minLength={2}
                onSearch={handleSearch}
                options={results ? results : []}
                onChange={sendSelectedToForm}
                placeholder="Search by Ticker or Name..."
                renderMenuItemChildren={(option, props) => (
                    <Fragment>
                        <span>
                            {option.symbol} – {option.shortname}
                        </span>
                    </Fragment>
                )}>
                {({ onClear, selected }) => (
                    <Row className="m-0" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                        {!!selected.length && (
                            <ClearButton
                                onClick={() => {
                                    onClear();
                                    props.clearSearchStockState();
                                }}
                            />
                        )}
                        {isLoading && <Spinner animation="grow" size="sm" />}
                    </Row>
                )}
            </AsyncTypeahead>
        </Container>
    );
};

SearchTicker.propTypes = {
    auth: PropTypes.object.isRequired,
    yahooFinance: PropTypes.object.isRequired,
    clearSearchStockState: PropTypes.func.isRequired,
    searchStock: PropTypes.func.isRequired,
    investments: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    yahooFinance: state.yahooFinance,
    investments: state.investments
});

export default connect(mapStateToProps, { searchStock, clearSearchStockState })(SearchTicker);
