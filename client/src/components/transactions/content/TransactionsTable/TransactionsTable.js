import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MUIDataTable from "mui-datatables";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import EditTransaction from "./EditTransaction/EditTransaction";

import {
  deleteTransaction,
  editTransaction,
} from "../../../../actions/transactionActions";

export const TransactionsTable = (props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [rowData, setRowDate] = useState();

  const openModal = (data) => {
    setIsOpenModal(true);
    setRowDate(data);
  };
  const closeModal = () => setIsOpenModal(false);

  // add transaction to database
  const handleSubmit = (data) => {
    if (data) {
      props.editTransaction(data);
    }
  };

  // delete transaction in database
  const handleDelete = (data) => {
    if (data) {
      props.deleteTransaction(data);
    }
  };

  const { tableData } = props;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const options = {
    filter: true,
    responsive: "scroll",
    selectableRows: "none",
    expandableRowsHeader: false,
    elevation: 1,
    print: false,
    download: false,
    pagination: false,
    filter: false,
    viewColumns: false,
    search: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [],
    onRowClick: (rowData, rowMeta) => {
      openModal({
        id: rowData[1],
        merchant: rowData[2],
        category: rowData[3],
        amount: rowData[4],
        date: rowData[5],
        type: rowData[6],
      });
    },
  };

  const columnsDesktop = [
    {
      label: "wathever",
      name: "wathever",
      options: {
        customHeadRender: () => null,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Card
                style={{
                  border: "0px",
                  padding: "6px",
                }}>
                <Card
                  className="transaction"
                  style={{ borderRadius: "24px 8px" }}>
                  <Card.Body style={{ padding: "0.85rem" }}>
                    <Row className="mb-1" style={{ fontSize: "1em" }}>
                      <Col>{tableMeta.rowData[2]}</Col>
                      <Col sm={1} className="d-flex justify-content-end">
                        {tableMeta.rowData[6] === "income" ? (
                          <div style={{ color: "green" }}>
                            {tableMeta.rowData[4].toFixed(2)}$
                          </div>
                        ) : (
                          <>-{tableMeta.rowData[4].toFixed(2)}$</>
                        )}
                      </Col>
                    </Row>
                    <Row style={{ fontSize: "0.85em" }}>
                      <Col>
                        <span className="text-muted">
                          {tableMeta.rowData[3]}
                        </span>
                      </Col>
                      <Col className="d-flex justify-content-end">
                        <span className="text-muted">
                          {tableMeta.rowData[5]}
                        </span>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Card>
            </div>
          );
        },
      },
    },
    {
      label: "id",
      name: "_id",
      options: {
        display: "excluded",
      },
    },
    {
      label: "Merchant",
      name: "merchant",
      options: {
        display: "excluded",
      },
    },
    {
      label: "Category",
      name: "category",
      options: {
        display: "excluded",
      },
    },
    {
      label: "Amount",
      name: "amount",
      options: {
        display: "excluded",
      },
    },
    {
      label: "Date",
      name: "date",
      options: {
        display: "excluded",
      },
    },
    {
      label: "type",
      name: "type",
      options: {
        display: "excluded",
      },
    },
  ];

  const theme = createTheme({
    overrides: {
      MuiTypography: {
        h6: {
          fontFamily: "'Source Sans Pro', sans-serif",
        },
      },
      MuiTableCell: {
        root: {
          borderBottom: "none",
          padding: "0px",
        },
        body: {
          fontFamily: "'Merriweather', sans-serif",
        },
      },
    },
  });

  return (
    <Row className="mt-3">
      <Col style={{ padding: "5px" }}>
        <Container style={{ padding: "0px" }}>
          <MuiThemeProvider theme={theme}>
            <MUIDataTable
              title={
                months[parseInt(props.month) - 1] +
                " - " +
                props.category +
                " [total: " +
                Number(
                  tableData
                    .filter((e) => e.type === "income")
                    .reduce((prev, cur) => cur.amount + prev, 0) +
                    tableData
                      .filter((e) => e.type === "expense")
                      .reduce((prev, cur) => prev - cur.amount, 0)
                ).toFixed(2) +
                "$]"
              }
              data={tableData}
              columns={columnsDesktop}
              options={options}
            />
          </MuiThemeProvider>
        </Container>
      </Col>

      <EditTransaction
        show={isOpenModal}
        onHide={() => closeModal()}
        handleSubmit={(e) => handleSubmit(e)}
        handleDelete={(e) => handleDelete(e)}
        previousData={rowData}
      />
    </Row>
  );
};

TransactionsTable.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteTransaction, editTransaction })(
  TransactionsTable
);
