import React from "react";
import { Row, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Content } from "./content/Content";

export const TransactionsContainer = (props) => {
  return (
    <Container fluid>
      <Container>
        <Row className="mt-3">
          <h4>Transactions</h4>
        </Row>
      </Container>

      <Content />
    </Container>
  );
};

TransactionsContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {})(TransactionsContainer);
