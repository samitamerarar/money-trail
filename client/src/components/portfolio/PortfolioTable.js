import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MUIDataTable, { ExpandButton } from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { columnsResponsive, columnsResponsiveExpandRow } from "./columnsMobile";
import { columns } from "./columnsDesktop";

class PortfolioTable extends Component {
  constructor(props) {
    super(props);
    this.state = { mobileView: false };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    let mobile = window.innerWidth <= 500;
    if (mobile !== this.state.mobile) {
      this.setState({ mobileView: mobile });
    }
  }

  render() {
    const { tableData } = this.props;

    const options = {
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
        columns.forEach((e, i) => {
          element[e.name] = rowData[i];
          element[e.name] = rowData[i];
        });
        array.push(element);
        const colSpan = rowData.length + 1;
        return (
          <TableRow>
            <TableCell colSpan={colSpan}></TableCell>
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

    const optionsResponsive = {
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
        columnsResponsive.forEach((e, i) => {
          element[e.name] = rowData[i];
          element[e.name] = rowData[i];
        });
        array.push(element);
        const colSpan = rowData.length + 1;
        return (
          <TableRow>
            <TableCell colSpan={colSpan}>
              <MuiThemeProvider theme={theme2}>
                <MUIDataTable
                  data={array}
                  columns={columnsResponsiveExpandRow}
                  options={optionsResponsiveExpandRow}
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

    const optionsResponsiveExpandRow = {
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

    const theme = createTheme({
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

    const theme2 = createTheme({
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
          {this.state.mobileView ? (
            <MuiThemeProvider theme={theme}>
              <MUIDataTable
                title={"Assets"}
                data={tableData}
                columns={columnsResponsive}
                options={optionsResponsive}
                components={components}
              />
            </MuiThemeProvider>
          ) : (
            <MuiThemeProvider theme={theme}>
              <MUIDataTable
                title={"Assets"}
                data={tableData}
                columns={columns}
                options={options}
                components={components}
              />
            </MuiThemeProvider>
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
