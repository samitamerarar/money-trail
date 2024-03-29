import React, { useState } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import EditTransaction from './EditTransaction/EditTransaction';

import { deleteTransaction, editTransaction } from '../../../../actions/transactionActions';

import moment from 'moment';
import UnDraw from '../../../layout/UnDraw';

export const TransactionsTable = (props) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [rowData, setRowData] = useState();

    const openModal = (data) => {
        setIsOpenModal(true);
        setRowData(data);
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

    const { dataTable } = props;

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const options = {
        filter: false,
        responsive: 'scroll',
        selectableRows: 'none',
        expandableRowsHeader: false,
        elevation: 1,
        print: false,
        download: dataTable.length > 0 ? true : false,
        pagination: false,
        viewColumns: false,
        search: dataTable.length > 0 ? true : false,
        rowsPerPage: 5,
        rowsPerPageOptions: [],
        onRowClick: (rowData, rowMeta) => {
            openModal({
                id: rowData[1],
                merchant: rowData[2],
                category: rowData[3],
                amount: rowData[4],
                date: rowData[5],
                type: rowData[6]
            });
        },
        textLabels: {
            body: {
                noMatch: (
                    <div className="pt-4 bg-white">
                        <UnDraw image={'undraw_handcrafts_balloon'} size="110px" subtitleSmall="No Transactions" />
                    </div>
                )
            }
        },
        // Search ALL columns, including hidden fields that use display:false, viewColumns:false...
        customSearch: (searchQuery, currentRow, columns) => {
            let isFound = false;
            currentRow.forEach((col, i) => {
                if (
                    i > 1 && // remove _id from search
                    col &&
                    col.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
                ) {
                    isFound = true;
                }
            });
            return isFound;
        }
    };

    const columnsDesktop = [
        {
            label: 'wathever',
            name: 'wathever',
            options: {
                download: false,
                customHeadRender: () => null,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const merchant = tableMeta.rowData[2];
                    const type = tableMeta.rowData[6];
                    const amount = tableMeta.rowData[4].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    const category = tableMeta.rowData[3];
                    const date = moment.utc(tableMeta.rowData[5], 'DD/MM/YYYY').format('ddd Do MMM');

                    return (
                        <div>
                            <Card className="border-0 pr-2 pl-2 pb-2">
                                <Card className="transaction" style={{ borderRadius: '21px 7px' }}>
                                    <Card.Body className="p-2 m-1">
                                        <Row className="mb-1" style={{ fontSize: '1em', lineHeight: 'normal' }}>
                                            <Col>{merchant}</Col>
                                            <Col sm={1} className="d-flex justify-content-end">
                                                {type === 'income' ? <div style={{ color: 'green' }}>{amount}$</div> : <div>-{amount}$</div>}
                                            </Col>
                                        </Row>
                                        <Row style={{ fontSize: '0.85em' }}>
                                            <Col>
                                                <span className="text-muted">{category}</span>
                                            </Col>
                                            <Col className="d-flex justify-content-end">
                                                <span className="text-muted">{date}</span>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Card>
                        </div>
                    );
                }
            }
        },
        {
            label: 'id',
            name: '_id',
            options: {
                download: false,
                display: 'excluded'
            }
        },
        {
            label: 'Merchant',
            name: 'merchant',
            options: {
                display: 'excluded'
            }
        },
        {
            label: 'Category',
            name: 'category',
            options: {
                display: 'excluded'
            }
        },
        {
            label: 'Amount',
            name: 'amount',
            options: {
                display: 'excluded'
            }
        },
        {
            label: 'Date',
            name: 'date',
            options: {
                display: 'excluded'
            }
        },
        {
            label: 'type',
            name: 'type',
            options: {
                display: 'excluded'
            }
        }
    ];

    const theme = createTheme({
        overrides: {
            MuiTypography: {
                h6: {
                    fontFamily: "'Source Sans Pro', sans-serif"
                }
            },
            MUIDataTable: {
                responsiveScroll: {
                    minHeight: '50vh',
                    maxHeight: '50vh !important'
                }
            },
            MuiTableCell: {
                root: {
                    borderBottom: 'none',
                    padding: '0px'
                },
                body: {
                    fontFamily: "'Merriweather', sans-serif"
                }
            }
        }
    });

    return (
        <Row className="mt-3">
            <Col className="p-1">
                <Container className="p-0 shadow-sm">
                    <MuiThemeProvider theme={theme}>
                        <MUIDataTable
                            title={
                                months[parseInt(props.month) - 1] +
                                ' - ' +
                                props.category +
                                ' [total: ' +
                                (Number(
                                    dataTable.filter((e) => e.type === 'income').reduce((prev, cur) => cur.amount + prev, 0) +
                                        dataTable.filter((e) => e.type === 'expense').reduce((prev, cur) => prev - cur.amount, 0)
                                ) > 0
                                    ? '+'
                                    : '') +
                                Number(
                                    dataTable.filter((e) => e.type === 'income').reduce((prev, cur) => cur.amount + prev, 0) +
                                        dataTable.filter((e) => e.type === 'expense').reduce((prev, cur) => prev - cur.amount, 0)
                                ).toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                    currencyDisplay: 'code'
                                }) +
                                '$]'
                            }
                            data={dataTable}
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
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteTransaction, editTransaction })(TransactionsTable);
