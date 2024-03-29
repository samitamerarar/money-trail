import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TransactionsTable from './TransactionsTable/TransactionsTable';

import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import { Pagination, Arrow } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/pagination.css';
import '@egjs/flicking-plugins/dist/arrow.css';

import moment from 'moment';

import Loading from '../../layout/Loading';
import UnDraw from '../../layout/UnDraw';

export const Tables = (props) => {
    const [dataTablesByDate, setDataTablesByDate] = useState(new Map());
    const [flickingTables, setFlickingTables] = useState([]);
    const [flickingCategories, setFlickingCategories] = useState([]);
    const [flickingCategoriesIndex, setFlickingCategoriesIndex] = useState(0);

    const [isComponentLoading, setIsComponentLoading] = useState(true);
    const [renderIsDone, setRenderIsDone] = useState(false);

    // Flicking pagination
    const [plugins, setPlugins] = useState([new Pagination({ type: 'scroll' }), new Arrow()]); //eslint-disable-line

    // Control UI Loading (called second)
    useEffect(() => {
        setIsComponentLoading(false);
    }, [renderIsDone]);

    // Control UI Loading (called first)
    useEffect(() => {
        setRenderIsDone(!renderIsDone);
    }, [flickingTables]); // eslint-disable-line

    /*
     * Create a sorted Map of years of a sorted Map of months
     */
    useEffect(() => {
        const mapYear = new Map();

        // insert transactions year
        props.tableData &&
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

        // add missing months that have no transactions
        const today = new Date();
        mapYear.forEach((months, year) => {
            const mostRecentMonth = year < today.getFullYear() ? 12 : today.getUTCMonth() + 1;
            const missingMonths = new Map();
            mapYear.get(year).forEach((transactions, key) => {
                for (let month = 1; month <= mostRecentMonth; month++) {
                    if (!months.has(('0' + month).slice(-2))) {
                        missingMonths.set(('0' + month).slice(-2), []);
                    }
                }
            });

            mapYear.set(year, new Map([...months.entries(), ...missingMonths]));
        });

        // sort year map, month map and transactions array
        mapYear.forEach((val, key) => {
            // sort each transactions array
            mapYear.get(key).forEach((val, key) => {
                val.sort((e1, e2) => moment.utc(e2.date, 'DD/MM/YYYY').valueOf() - moment.utc(e1.date, 'DD/MM/YYYY').valueOf());
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
    }, [props.tableData, props.category]); // eslint-disable-line

    /*
     * Create a Table for each month based on the only selected year
     */
    useEffect(() => {
        setIsComponentLoading(true);
        let tables = [];
        let index = 0;

        if (dataTablesByDate.size > 0 && dataTablesByDate.has(props.year)) {
            const dataTablesByMonth = dataTablesByDate.get(props.year);

            dataTablesByMonth.forEach((dataTable, key) => {
                if (dataTable) {
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
    }, [dataTablesByDate, props.year, flickingCategories]); // eslint-disable-line

    // set the category on the Parent Component
    const handleCategoryClick = (e) => {
        if (props.category !== e.currentTarget.id) {
            setFlickingCategories([]);
            props.setCategory(e.currentTarget.id);
        }
    };

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
                // Unselected Categories
                categoriesJSX.push(
                    <Button
                        key={e.value}
                        id={e.value}
                        onClick={handleCategoryClick}
                        className="m-1 button-no-outline"
                        variant="info"
                        style={{
                            background: '#f2a65e',
                            boxShadow: '1px 1px 3px rgba(46, 46, 46, 0.62)',
                            borderColor: '#d99554'
                        }}>
                        {e.name}
                    </Button>
                );
            } else {
                // Selected Category
                categoriesJSX.push(
                    <Button key={e.value} id={e.value} onClick={handleCategoryClick} className="m-1 category-button button-no-outline" variant="light">
                        {e.name}
                    </Button>
                );
            }
        });

        // set flicking camera to focus on the selected button
        setFlickingCategoriesIndex(categories.findIndex((obj) => obj.value === props.category) - 2);
        setFlickingCategories(categoriesJSX);
    }, [props.category]); // eslint-disable-line

    return (
        <>
            <Row className="p-0 m-0 justify-content-center ">
                {flickingCategories.length > 0 ? (
                    <Flicking align="prev" bounce="2%" className="shadow-light" defaultIndex={flickingCategoriesIndex}>
                        {flickingCategories}
                    </Flicking>
                ) : (
                    <Loading loadingwhat="categories" small={true} />
                )}
            </Row>

            {isComponentLoading ? (
                <Loading loadingwhat="transactions" />
            ) : (
                <>
                    {flickingTables.length > 0 ? (
                        <Flicking renderOnlyVisible={false} align="prev" horizontal="false" plugins={plugins}>
                            {flickingTables}
                            <ViewportSlot>
                                <div style={{ marginTop: '56px' }}>
                                    <span className="flicking-pagination" style={{ paddingBottom: '20px' }}></span>
                                    <span
                                        className="flicking-arrow-prev is-circle"
                                        style={{ transform: 'scale(0.75)', top: 'initial', bottom: '0', left: '1em' }}></span>
                                    <span
                                        className="flicking-arrow-next is-circle"
                                        style={{ transform: 'scale(0.75)', top: 'initial', bottom: '0', right: '1em' }}></span>
                                </div>
                            </ViewportSlot>
                        </Flicking>
                    ) : (
                        <Container key="00">
                            <Row className="justify-content-center">
                                <UnDraw image={'undraw_no_data_re_kwbl'} size="10vh" subtitle="You don't have any transactions." />
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
