import React, { useState } from "react";
import { Fragment } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { searchStock } from "../../actions/yahooActions";

export const SearchTicker = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);

    props.searchStock(query).then(() => {
      if (props.yahooFinance.searchData && props.yahooFinance.searchData[0]) {
        const { quotes } = props.yahooFinance.searchData[0];
        let options = quotes
          .filter((i) => i.shortname && i.symbol)
          .map((i) => ({ shortname: i.shortname, symbol: i.symbol }));

        // Remove already added symbols from the options
        options = options.filter(
          (f) =>
            !props.investments.investmentsList.some(
              (e) => e.symbol === f.symbol
            )
        );

        // Remove not working ticker
        // prettier-ignore
        const reservedChars = [":", "/", "?", "#", "[", "]", "@", "!", "$", "&", "(", ")", "*", "+", ",", ";", "="];

        options = options.filter((f) =>
          reservedChars.every((e) => f.symbol.indexOf(e) === -1)
        );

        setOptions(options);
      }
      setIsLoading(false);
    });
  };

  const sendSelectedToForm = (selected) => {
    props.getSelected(selected);
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <AsyncTypeahead
      {...props}
      filterBy={filterBy}
      id="async-search"
      isLoading={isLoading}
      labelKey="symbol"
      minLength={3}
      onSearch={handleSearch}
      options={options}
      onChange={(e) => sendSelectedToForm(e)}
      placeholder="Search by Ticker or Name..."
      renderMenuItemChildren={(option, props) => (
        <Fragment>
          <span>
            {option.symbol} – {option.shortname}
          </span>
        </Fragment>
      )}
    />
  );
};

SearchTicker.propTypes = {
  auth: PropTypes.object.isRequired,
  yahooFinance: PropTypes.object.isRequired,
  searchStock: PropTypes.func.isRequired,
  investments: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  yahooFinance: state.yahooFinance,
  investments: state.investments,
});

export default connect(mapStateToProps, { searchStock })(SearchTicker);
