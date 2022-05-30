import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TransactionsTable from './TransactionsTable/TransactionsTable';

import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import { Pagination } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/pagination.css';

import { CreditCard } from 'react-kawaii';

import moment from 'moment';

import Loading from '../Loading';

export const Tables = (props) => {
    const [dataTablesByDate, setDataTablesByDate] = useState(new Map());
    const [flickingTables, setFlickingTables] = useState([]);
    const [flickingCategories, setFlickingCategories] = useState([]);

    const [isComponentLoading, setIsComponentLoading] = useState(true);
    const [renderIsDone, setRenderIsDone] = useState(false);

    // Control UI Loading (called second)
    useEffect(() => {
        setIsComponentLoading(false);
    }, [renderIsDone]);

    // Control UI Loading (called first)
    useEffect(() => {
        setRenderIsDone(!renderIsDone);
    }, [flickingTables]);

    // Flicking pagination
    const plugins = [new Pagination({ type: 'bullet' })];

    /*
     * Create a sorted Map of years of a sorted Map of months
     */
    useEffect(() => {
        const mapYear = new Map();

        // insert transactions year
        props.tableData.forEach((e) => {
            const month = e.date.split('/')[1];
            const year = e.date.split('/')[2];
            if (!mapYear.has(year)) {
                mapYear.set(year, new Map([[month, []]]));
            }

            if (!mapYear.get(year).has(month)) {
                mapYear.get(year).set(month, []);
            }

            mapYear.get(year).get(month).push(e);
        });

        // sort year map, month map and transactions array
        mapYear.forEach((val, key) => {
            // sort each transactions array
            mapYear.get(key).forEach((val, key) => {
                val.sort((e1, e2) => moment(e2.date, 'DD/MM/YYYY').valueOf() - moment(e1.date, 'DD/MM/YYYY').valueOf());
            });

            // sort each month map
            mapYear.set(
                key,
                new Map(
                    [...val.entries()].sort((e1, e2) => {
                        if (e2[0] > e1[0]) return 1;
                        else return -1;
                    })
                )
            );
        });

        // sort each year map
        const sortedByYear = new Map(
            [...mapYear.entries()].sort((e1, e2) => {
                if (e2[0] > e1[0]) return 1;
                else return -1;
            })
        );
        setDataTablesByDate(sortedByYear);

        // populate the year dropdown filter
        props.setYears([...sortedByYear.keys()]);
    }, [props.tableData, props.category]);

    /*
     * Create a Table for each month based on the only selected year
     */
    useEffect(() => {
        setIsComponentLoading(true);
        let tables = [];
        let index = 0;
        if (dataTablesByDate.size > 0 && dataTablesByDate.has(props.year)) {
            dataTablesByDate.get(props.year).forEach((dataTable, key) => {
                if (dataTable.length > 0) {
                    tables.push(
                        <div key={index} style={{ width: '98%' }}>
                            <Container>
                                <Row>
                                    <Col>
                                        <TransactionsTable dataTable={dataTable} category={props.category} month={key} />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    );
                    index++;
                }
            });
        }

        setFlickingTables([...tables]);
    }, [dataTablesByDate, props.year]);

    /*
     * Create Category Buttons filters
     */
    useEffect(() => {
        let categoriesJSX = [];
        const categories = [
            { name: 'All', value: 'all' },
            { name: 'Automobile', value: 'automobile' },
            { name: 'Clothing', value: 'clothing' },
            { name: 'Food', value: 'food' },
            { name: 'Fun', value: 'fun' },
            { name: 'Electronics', value: 'electronics' },
            { name: 'Amenities', value: 'amenities' },
            { name: 'Personal', value: 'personal' },
            { name: 'Medical', value: 'medical' },
            { name: 'Other', value: 'other' }
        ];

        categories.forEach((e) => {
            if (e.value === props.category) {
                categoriesJSX.push(
                    <Button
                        key={e.value}
                        id={e.value}
                        onClick={handleClick}
                        className="m-1"
                        variant="info"
                        style={{
                            background: '#F2A65E',
                            boxShadow: '1px 1px 3px rgba(46, 46, 46, 0.62)',
                            borderColor: '#AD7743'
                        }}>
                        {e.name}
                    </Button>
                );
            } else {
                categoriesJSX.push(
                    <Button key={e.value} id={e.value} onClick={handleClick} className="m-1" variant="light">
                        {e.name}
                    </Button>
                );
            }
        });

        setFlickingCategories(categoriesJSX);
    }, [props.category]);

    // set the category on the Parent Component
    const handleClick = (e) => {
        props.setCategory(e.currentTarget.id);
    };

    return (
        <>
            <div>
                {flickingCategories.length > 0 && (
                    <Flicking align="prev" bounce="2%">
                        {flickingCategories}
                    </Flicking>
                )}
            </div>

            {isComponentLoading ? (
                <Loading />
            ) : (
                <>
                    {flickingTables.length > 0 ? (
                        <Flicking renderOnlyVisible={true} align="prev" horizontal="false" plugins={plugins}>
                            {flickingTables}
                            <ViewportSlot>
                                <div className="flicking-pagination"></div>
                            </ViewportSlot>
                        </Flicking>
                    ) : (
                        <Container key="00" className="mt-5">
                            <Row className="justify-content-center m-3" style={{ textAlign: 'center' }}>
                                You don't have any transactions here.
                            </Row>
                            <Row className="justify-content-center">
                                <CreditCard size={75} mood="happy" color="#83D1FB" />
                            </Row>
                        </Container>
                    )}
                </>
            )}
        </>
    );
};

Tables.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(Tables);
