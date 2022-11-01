import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MUIDataTable, { ExpandButton } from 'mui-datatables';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';

import { columnsMobile, columnsMobileExpandRow } from './columns/columnsMobile';
import { columnsDesktop } from './columns/columnsDesktop';

import { isMobile } from 'react-device-detect';

class AssetsTable extends Component {
    render() {
        const { tableData } = this.props;

        // DESKTOP VIEW SETTINGS
        const options = {
            filter: false,
            filterType: 'dropdown',
            responsive: 'vertical',
            selectableRows: 'none',
            expandableRowsHeader: false,
            elevation: 3,
            print: false,
            download: false,
            pagination: false,
            viewColumns: true,
            search: false
        };

        const themeDesktop = createTheme({
            overrides: {
                MuiButton: {
                    root: {
                        fontWeight: '550',
                        fontSize: '0.75rem',
                        color: '#757575'
                    }
                },
                MuiTableCell: {
                    head: {
                        backgroundColor: '#F5F5F5 !important',
                        fontWeight: '550',
                        fontSize: '0.75rem',
                        color: '#757575'
                    },
                    body: {
                        backgroundColor: '#FEFEFE',
                        borderLeft: 'solid 0.5px #D3D3D3',
                        fontFamily: '"Segoe UI", Arial, Sans-serif',
                        fontWeight: '550'
                    }
                },
                MUIDataTableSelectCell: {
                    expandDisabled: {
                        // Soft hide the button.
                        visibility: 'hidden'
                    }
                },
                MUIDataTableBodyCell: {
                    root: {
                        minWidth: '80px'
                    }
                }
            }
        });

        // MOBILE VIEW SETTINGS
        const optionsMobile = {
            filter: false,
            filterType: 'dropdown',
            responsive: 'standard',
            selectableRows: 'none',
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
                                <MUIDataTable data={array} columns={columnsMobileExpandRow} options={optionsMobileExpandRow} />
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
            viewColumns: false,
            search: false
        };

        const optionsMobileExpandRow = {
            filter: false,
            responsive: 'vertical',
            selectableRows: 'none',
            elevation: 0,
            print: false,
            download: false,
            pagination: false,
            rowHover: false,
            viewColumns: false,
            search: false
        };

        const themeMobile = createTheme({
            overrides: {
                MuiButton: {
                    root: {
                        fontWeight: '550',
                        fontSize: '0.75rem',
                        color: '#757575'
                    }
                },
                MuiTableCell: {
                    head: {
                        backgroundColor: '#F5F5F5 !important',
                        fontWeight: '550',
                        fontSize: '0.75rem',
                        color: '#757575'
                    },
                    body: {
                        fontWeight: '550',
                        borderLeft: 'solid 0.5px #D3D3D3',
                        fontFamily: '"Segoe UI", Arial, Sans-serif'
                    }
                },
                MUIDataTableBodyCell: {
                    root: {
                        width: '65px'
                    }
                },
                MUIDataTableSelectCell: {
                    expandDisabled: {
                        // Soft hide the button.
                        visibility: 'hidden'
                    }
                }
            }
        });

        const themeMobileExpandRow = createTheme({
            overrides: {
                MUIDataTableBodyCell: {
                    root: {
                        fontSize: '1em !important'
                    },
                    stackedHeader: {
                        fontWeight: '550 !important'
                    }
                },
                MuiPaper: {
                    root: {
                        alignItems: 'center',
                        margin: '-16px'
                    }
                },
                MuiToolbar: { root: { display: 'none' } }
            }
        });

        const components = {
            ExpandButton: function (props) {
                return <ExpandButton {...props} />;
            }
        };

        return (
            <Row className="mt-3 mb-5">
                <Col className="p-1">
                    {isMobile ? (
                        // cant make it responsive with window width because of the theme
                        // so i need to use the library to check browser type
                        <MuiThemeProvider theme={themeMobile}>
                            <MUIDataTable title={'Assets'} data={tableData} columns={columnsMobile} options={optionsMobile} components={components} />
                        </MuiThemeProvider>
                    ) : (
                        <Container className="p-0">
                            <MuiThemeProvider theme={themeDesktop}>
                                <MUIDataTable title={'Assets'} data={tableData} columns={columnsDesktop} options={options} components={components} />
                            </MuiThemeProvider>
                        </Container>
                    )}
                </Col>
            </Row>
        );
    }
}

AssetsTable.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(AssetsTable);
