import React, { useEffect, useState } from "react";
import { Row, Container, Col, Button, DropdownButton } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TransactionsContent from "./content/TransactionsContent";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import {
  addTransaction,
  getTransactions,
} from "../../actions/transactionActions";

export const TransactionsContainer = (props) => {
  const [yearFilter, setYearFilter] = useState();
  const [yearsAvailable, setYearsAvailable] = useState([]);

  useEffect(() => {
    if (yearsAvailable.length > 0) setYearFilter(yearsAvailable[0]);
  }, [yearsAvailable]);

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
    <Container fluid>
      <Container>
        <Row className="mt-3">
          <h4>Transactions</h4>
          <Col
            className="d-flex justify-content-end"
            style={{ paddingRight: "2px" }}>
            <DropdownButton
              size="sm"
              variant="secondary"
              id="dropdown-item-button"
              title={yearFilter}>
              {renderDropdownYears()}
            </DropdownButton>
          </Col>
        </Row>
      </Container>

      <TransactionsContent
        selectedYear={yearFilter}
        setYears={(e) => setYears(e)}
        state={props}
      />
    </Container>
  );
};

TransactionsContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  transactions: state.transactions,
});

export default connect(mapStateToProps, {
  getTransactions,
  addTransaction,
})(TransactionsContainer);
