import React, { Component } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ContentSelector from "./ContentSelector";

class TransactionsDashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    let dashboard;
    dashboard = <ContentSelector></ContentSelector>;

    return <Container>{dashboard}</Container>;
  }
}

TransactionsDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(TransactionsDashboard);
