import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MUIDataTable, { ExpandButton } from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { columnsMobile, columnsMobileExpandRow } from "./columnsMobile";
import { columnsDesktop } from "./columnsDesktop";

import { isMobile } from "react-device-detect";

class PortfolioTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tableData } = this.props;

    // DESKTOP VIEW SETTINGS
    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "standard",
      selectableRows: "none",
      expandableRowsHeader: false,
      elevation: 1,
      print: false,
      download: false,
      pagination: false,
      filter: false,
      viewColumns: false,
      search: false,
    };

    const themeDesktop = createTheme({
      overrides: {
        MuiButton: {
          root: {
            fontWeight: "600 !important",
          },
        },
        MuiTableCell: {
          head: {
            backgroundColor: "#F5F5F5 !important",
          },
          body: {
            borderLeft: "solid 0.5px #D3D3D3",
          },
        },
        MUIDataTableSelectCell: {
          expandDisabled: {
            // Soft hide the button.
            visibility: "hidden",
          },
        },
      },
    });

    // MOBILE VIEW SETTINGS
    const optionsMobile = {
      filter: true,
      filterType: "dropdown",
      responsive: "standard",
      selectableRows: "none",
      expandableRows: true,
      expandableRowsHeader: false,
      expandableRowsOnClick: true,
      rowsExpanded: [],
      renderExpandableRow: (rowData) => {
        let element = {};
        let array = [];
        columnsMobile.forEach((e, i) => {
          element[e.name] = rowData[i];
          element[e.name] = rowData[i];
        });
        array.push(element);
        const colSpan = rowData.length + 1;
        return (
          <TableRow>
            <TableCell colSpan={colSpan}>
              <MuiThemeProvider theme={themeMobileExpandRow}>
                <MUIDataTable
                  data={array}
                  columns={columnsMobileExpandRow}
                  options={optionsMobileExpandRow}
                />
              </MuiThemeProvider>
            </TableCell>
          </TableRow>
        );
      },
      onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) => {
        //console.log(curExpanded, allExpanded, rowsExpanded);
      },
      elevation: 1,
      print: false,
      download: false,
      pagination: false,
      filter: false,
      viewColumns: false,
      search: false,
    };

    const optionsMobileExpandRow = {
      filter: false,
      responsive: "vertical",
      selectableRows: "none",
      elevation: 0,
      print: false,
      download: false,
      pagination: false,
      rowHover: false,
      viewColumns: false,
      search: false,
    };

    const themeMobile = createTheme({
      overrides: {
        MuiButton: {
          root: {
            fontWeight: "600 !important",
          },
        },
        MuiTableCell: {
          head: {
            backgroundColor: "#F5F5F5 !important",
          },
          body: {
            borderLeft: "solid 0.5px #D3D3D3",
          },
        },
        MUIDataTableSelectCell: {
          expandDisabled: {
            // Soft hide the button.
            visibility: "hidden",
          },
        },
      },
    });

    const themeMobileExpandRow = createTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            fontSize: "1em !important",
          },
          stackedHeader: {
            fontWeight: "550 !important",
          },
        },
        MuiPaper: {
          root: {
            alignItems: "center",
            width: "88vw",
          },
        },
        MuiToolbar: { root: { display: "none" } },
      },
    });

    const components = {
      ExpandButton: function (props) {
        return <ExpandButton {...props} />;
      },
    };

    return (
      <Row className="mt-3">
        <Col style={{ padding: "5px" }}>
          {isMobile ? (
            // cant make it responsive with window width because of the theme
            // so i need to use the library to check browser type
            <MuiThemeProvider theme={themeMobile}>
              <MUIDataTable
                title={"Assets"}
                data={tableData}
                columns={columnsMobile}
                options={optionsMobile}
                components={components}
              />
            </MuiThemeProvider>
          ) : (
            <Container style={{ padding: "0px" }}>
              <MuiThemeProvider theme={themeDesktop}>
                <MUIDataTable
                  title={"Assets"}
                  data={tableData}
                  columns={columnsDesktop}
                  options={options}
                  components={components}
                />
              </MuiThemeProvider>
            </Container>
          )}
        </Col>
      </Row>
    );
  }
}

PortfolioTable.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PortfolioTable);
