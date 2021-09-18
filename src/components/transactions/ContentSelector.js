import React, { Component } from "react";
import { Row, Col, Container, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllShops } from "../../actions/shopActions";
import { getTransactions } from "../../actions/transactionActions";

class ContentSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { key: "transactions" };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    // get user transactions
    this.props.getTransactions();

    // get shops names
    this.props.getAllShops();
  }

  // Tabs handling
  handleSelect(key) {
    this.setState({ key: key });
  }

  render() {
    let dashboardContent;
    switch (this.state.key) {
      case "transactions":
        dashboardContent = <>Transactions</>;
        break;
      case "expenses":
        dashboardContent = <>Expense</>;
        break;
      default:
        dashboardContent = <>Transactions</>;
    }

    let dashboardTabs = (
      <Nav
        fill
        variant="tabs"
        defaultActiveKey="transactions"
        onSelect={this.handleSelect}
        className="mt-3">
        <Nav.Item>
          <Nav.Link eventKey="transactions">Transactions</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="expenses">Expenses</Nav.Link>
        </Nav.Item>
      </Nav>
    );

    let dashboard = (
      <Container>
        {dashboardTabs}
        {dashboardContent}
      </Container>
    );

    return <>{dashboard}</>;
  }
}

ContentSelector.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  getAllShops: PropTypes.func.isRequired,
  shops: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  shops: state.shops,
  transactions: state.transactions,
});

export default connect(mapStateToProps, {
  getTransactions,
  getAllShops,
})(ContentSelector);
