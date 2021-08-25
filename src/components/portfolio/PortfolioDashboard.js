import React, { Component } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class PortfolioDashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <Container>Portfolio</Container>;
  }
}

PortfolioDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PortfolioDashboard);
