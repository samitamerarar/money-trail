import React, { Component } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MUIDataTable from "mui-datatables";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";

class TransactionsTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tableData } = this.props;

    const options = {
      filter: true,
      responsive: "standard",
      selectableRows: "none",
      expandableRowsHeader: false,
      elevation: 0,
      print: false,
      download: false,
      pagination: true,
      filter: false,
      viewColumns: false,
      search: true,
      rowsPerPage: 5,
      rowsPerPageOptions: [],
      onRowClick: (rowData, rowMeta) => {
        console.log(rowData);
      },
    };

    const columnsDesktop = [
      {
        label: "id",
        name: "_id",
        options: { display: "excluded" },
      },
      {
        label: "Merchant",
        name: "merchant",
        options: {
          sort: false,
          viewColumns: false,
          customHeadRender: () => null,
          setCellProps: () => ({
            align: "left",
          }),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <div>
                <Card className="pl-3 pr-3" style={{ border: "0px" }}>
                  <Card
                    className="mt-2 transaction"
                    style={{ borderRadius: "24px 8px" }}>
                    <Card.Body style={{ padding: "0.85rem" }}>
                      <Row className="mb-1" style={{ fontSize: "1em" }}>
                        <Col>{tableMeta.rowData[1]}</Col>
                        <Col className="d-flex justify-content-end">
                          {tableMeta.rowData[3]}
                        </Col>
                      </Row>
                      <Row style={{ fontSize: "0.9em" }}>
                        <Col>
                          <span className="text-muted">
                            {tableMeta.rowData[2]}
                          </span>
                        </Col>
                        <Col className="d-flex justify-content-end">
                          <span className="text-muted">
                            {tableMeta.rowData[4]}
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
        label: "Category",
        name: "category",
        options: {
          display: "excluded",
          viewColumns: false,
          setCellProps: () => ({
            align: "left",
          }),
        },
      },
      {
        label: "Amount",
        name: "amount",
        options: {
          display: "excluded",
          setCellProps: () => ({
            align: "left",
          }),
        },
      },
      {
        label: "Date",
        name: "date",
        options: {
          display: "excluded",
          setCellProps: () => ({
            align: "left",
          }),
        },
      },
    ];

    const themeDesktop = createTheme({
      overrides: {
        MuiTableCell: {
          root: {
            borderBottom: "none",
            padding: "0px",
          },
          head: {
            //backgroundColor: "#F5F5F5 !important",
            fontWeight: "550",
            fontSize: "0.75rem",
            //color: "#757575",
          },
          body: {
            fontFamily: '"Segoe UI", Arial, Sans-serif',
          },
        },
      },
    });

    return (
      <Row className="mt-3">
        <Col style={{ padding: "5px" }}>
          <Container style={{ padding: "0px" }}>
            <MuiThemeProvider theme={themeDesktop}>
              {tableData.length > 0 && (
                <MUIDataTable
                  title={"September"}
                  data={tableData}
                  columns={columnsDesktop}
                  options={options}
                />
              )}
            </MuiThemeProvider>
          </Container>
        </Col>
      </Row>
    );
  }
}

TransactionsTable.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(TransactionsTable);
