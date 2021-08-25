import React, { Component } from "react";
import { Row, Col, Container, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllShops } from "../../actions/shopActions";
import { getUserTransactions } from "../../actions/transactionActions";
import Transactions from "./content/Transactions";
import Expenses from "./content/Expenses";
import {
  getAllShopsNamesForCategory,
  categorizeTransactions,
  getAveragePerMonth,
  getThisMonthExp,
  getPastMonthExp,
} from "./utils";
import moment from "moment";

class ContentSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { key: "transactions" };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    // get user transactions
    this.props.getUserTransactions();

    // get shops names
    this.props.getAllShops();
  }

  componentDidUpdate(prevProps) {
    const loading = this.props.userTransactions.transactionsLoading;
    if (
      JSON.stringify(prevProps.userTransactions.transactions) !==
        JSON.stringify(this.props.userTransactions.transactions) &&
      !loading
    ) {
      this.props.getUserTransactions();
    }
  }

  // Tabs handling
  handleSelect(key) {
    this.setState({ key: key });
  }

  render() {
    const { userTransactions } = this.props;
    const userTransactionsLoading = userTransactions.transactionsLoading;
    const { shopsAll } = this.props.shops;

    let userTransactionsData = [];
    if (userTransactions.transactions) {
      userTransactions.transactions.forEach(function (transaction) {
        userTransactionsData.push({
          id: transaction.id,
          date: transaction.date,
          category: transaction.category,
          name: transaction.name,
          amount: transaction.amount,
        });
      });
    }

    let transactionsData = [];

    const foodShops = getAllShopsNamesForCategory("Food", shopsAll);
    const psShops = getAllShopsNamesForCategory("Personal Spending", shopsAll);
    const entShops = getAllShopsNamesForCategory("Entertainment", shopsAll);
    const transpShops = getAllShopsNamesForCategory("Transportation", shopsAll);
    const healthcareShops = getAllShopsNamesForCategory("Healthcare", shopsAll);

    let categorizedTransactions = categorizeTransactions(
      transactionsData,
      foodShops,
      psShops,
      entShops,
      transpShops,
      healthcareShops
    );

    categorizedTransactions = Object.values(
      [].concat(categorizedTransactions, userTransactionsData)
      //.reduce((r, c) => ((r[c.id] = Object.assign(r[c.id] || {}, c)), r), {})
    );

    const thisMonthExpenses = getThisMonthExp(categorizedTransactions);
    const pastMonthExpenses = getPastMonthExp(categorizedTransactions);
    const averagePerMonth = getAveragePerMonth(categorizedTransactions);

    const expensesData = {
      thisMonth: thisMonthExpenses,
      pastMonth: pastMonthExpenses,
      averagePerMonth: averagePerMonth,
    };

    /* *************** */
    /* FRONT END BELOW */
    /* *************** */
    let dashboardContent;
    switch (this.state.key) {
      case "transactions":
        dashboardContent = (
          <Transactions transactions={categorizedTransactions} />
        );
        break;
      case "expenses":
        dashboardContent = (
          <Expenses transactions={transactionsData} expenses={expensesData} />
        );
        break;
      default:
        dashboardContent = (
          <Transactions transactions={categorizedTransactions} />
        );
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
  getUserTransactions: PropTypes.func.isRequired,
  getAllShops: PropTypes.func.isRequired,
  shops: PropTypes.object.isRequired,
  userTransactions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  shops: state.shops,
  userTransactions: state.userTransactions,
});

export default connect(mapStateToProps, {
  getUserTransactions,
  getAllShops,
})(ContentSelector);
