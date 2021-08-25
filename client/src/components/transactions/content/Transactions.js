import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUserTransaction } from "../../../actions/transactionActions";
import EditTxnModal from "./EditTxnModal";

import MUIDataTable, { ExpandButton } from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

class Transactions extends Component {
  constructor() {
    super();
    this.state = { isOpenModal: false, selectedTxn: {} };
  }

  componentDidMount() {}

  editCategory = (data) => {
    this.openModal();
    this.setState({ selectedTxn: data });
  };

  openModal = () => this.setState({ isOpenModal: true });
  closeModal = () => this.setState({ isOpenModal: false });

  handleSubmit = (newCategory) => {
    if (this.state.selectedTxn && newCategory) {
      this.props.addUserTransaction({
        id: this.state.selectedTxn.id,
        name: this.state.selectedTxn.name,
        amount: this.state.selectedTxn.amount,
        category: newCategory,
        date: this.state.selectedTxn.date,
      });
    }
  };

  render() {
    const { transactions } = this.props;

    // Setting up data table
    const transactionsColumns = [
      {
        label: "Date",
        name: "date",
        type: "date",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        label: "Name",
        name: "name",
      },
      {
        label: "Amount",
        name: "amount",
      },
      {
        label: "Category",
        name: "category",
      },
    ];

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "stacked",
      selectableRows: "none",
      expandableRows: true,
      expandableRowsHeader: false,
      expandableRowsOnClick: true,
      rowsExpanded: [0],
      renderExpandableRow: (rowData) => {
        const colSpan = rowData.length + 1;
        return (
          <TableRow>
            <TableCell colSpan={colSpan}>
              <MUIDataTable
                title={"Data"}
                data={transactions}
                columns={transactionsColumns}
                options={{
                  elevation: 0,
                  print: false,
                  filter: false,
                  viewColumns: false,
                  search: false,
                  display: false,
                  download: false,
                  selectableRows: "none",
                  pagination: false,
                }}
              />
            </TableCell>
          </TableRow>
        );
      },
      onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) => {
        console.log(curExpanded, allExpanded, rowsExpanded);
      },
      elevation: 1,
      print: false,
      download: false,
    };

    const theme = createMuiTheme({
      overrides: {
        MUIDataTableSelectCell: {
          expandDisabled: {
            // Soft hide the button.
            visibility: "hidden",
          },
        },
      },
    });

    const components = {
      ExpandButton: function (props) {
        return <ExpandButton {...props} />;
      },
    };

    return (
      <Row>
        <Col>
          <Row className="mt-3">
            <h5>Transactions</h5>
          </Row>

          <Row className="mt-3">
            <>
              <p className="grey-text text-darken-1">
                You have <b>{transactions.length}</b> transactions
              </p>
              <Container style={{ padding: "0px" }}>
                <MuiThemeProvider theme={theme}>
                  <MUIDataTable
                    title={"List"}
                    data={transactions}
                    columns={transactionsColumns}
                    options={options}
                    components={components}
                  />
                </MuiThemeProvider>
              </Container>
            </>
          </Row>
        </Col>
        <EditTxnModal
          show={this.state.isOpenModal}
          onHide={() => this.closeModal()}
          handleSubmit={(e) => this.handleSubmit(e)}
        />
      </Row>
    );
  }
}

Transactions.propTypes = {
  addUserTransaction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userTransactions: state.userTransactions,
});

export default connect(mapStateToProps, { addUserTransaction })(Transactions);
