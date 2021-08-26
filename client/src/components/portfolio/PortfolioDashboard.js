import React, { Component } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTickerData } from "../../actions/yahooActions";

class PortfolioDashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTickerData({ symbol: "TSLA" });
  }

  render() {
    console.log(this.props.yahooFinance);
    return <Container>Portfolio</Container>;
  }
}

PortfolioDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  yahooFinance: PropTypes.object.isRequired,
  getTickerData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  yahooFinance: state.yahooFinance,
});

export default connect(mapStateToProps, { getTickerData })(PortfolioDashboard);
