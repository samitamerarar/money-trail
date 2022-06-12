import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryImage from './CategoryImage';
import Tables from './Tables';
import AddTransaction from './AddTransaction/AddTransaction';
import { addTransaction } from '../../../actions/transactionActions';

export const Content = (props) => {
    const [category, setCategory] = useState('all');
    const [dataTable, setDataTable] = useState([]);
    const [netWorth, setNetWorth] = useState(0);
    const [showNetWorth, setShowNetWorth] = useState(false);

    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);

    // add transaction to database
    const handleSubmit = (data) => {
        if (data) {
            props.addTransaction(data);
        }
    };

    // set Category from child component
    const setSelectedCategory = (category) => {
        setCategory(category);
    };

    /*
     * Filter data by the selected Category
     */
    useEffect(() => {
        const { transactions } = props.transactions;
        if (transactions.length > 0) {
            setNetWorth(
                Number(
                    transactions.filter((e) => e.type === 'income').reduce((prev, cur) => cur.amount + prev, 0) +
                        transactions.filter((e) => e.type === 'expense').reduce((prev, cur) => prev - cur.amount, 0)
                ).toLocaleString('en-US', {
                    maximumFractionDigits: 0
                })
            );

            if (category !== 'all') setDataTable(transactions.filter((e) => e.category === category));
            else setDataTable(transactions);
        } else setDataTable(transactions);
    }, [props.transactions, category]);

    return (
        <Container fluid>
            <Row>
                <Col className="p-0">
                    <Container>
                        <Row className="mt-3 align-items-center">
                            <Col className="pl-1">
                                {showNetWorth ? (
                                    <Button variant="light" size="sm" onClick={(e) => setShowNetWorth(!showNetWorth)}>
                                        Hide net worth: {netWorth ? <>{netWorth}</> : <>0</>}$
                                    </Button>
                                ) : (
                                    <Button variant="light" size="sm" onClick={(e) => setShowNetWorth(!showNetWorth)}>
                                        Show net worth
                                    </Button>
                                )}
                            </Col>
                            <Col className="d-flex justify-content-end pr-1">
                                <Button variant="primary" onClick={(e) => openModal()}>
                                    + Transaction
                                </Button>
                            </Col>
                        </Row>
                    </Container>

                    <Container className="p-2">
                        <Row className="mt-3">
                            <Col md="3">
                                <Row className="justify-content-center">
                                    <CategoryImage image={category} />
                                </Row>
                            </Col>
                            <Col md="9" className="p-0">
                                <Tables
                                    tableData={dataTable}
                                    category={category}
                                    year={props.selectedYear}
                                    setYears={(e) => props.setYears(e)}
                                    setCategory={setSelectedCategory}
                                />
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>

            <AddTransaction show={isOpenModal} onHide={() => closeModal()} handleSubmit={(e) => handleSubmit(e)} />
        </Container>
    );
};

Content.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    transactions: state.transactions
});

export default connect(mapStateToProps, {
    addTransaction
})(Content);
