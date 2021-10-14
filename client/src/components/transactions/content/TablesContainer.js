import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TransactionsTable from "./TransactionsTable/TransactionsTable";

import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Pagination } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/pagination.css";

import { CreditCard } from "react-kawaii";

import moment from "moment";

export const TablesContainer = (props) => {
  const [dataTableByDate, setDataTableByDate] = useState(new Map());
  const [flickingTables, setFlickingTables] = useState([]);
  const [flickingCategories, setFlickingCategories] = useState([]);

  // Flicking pagination
  const plugins = [new Pagination({ type: "bullet" })];

  useEffect(() => {
    const mapYear = new Map();

    // insert transactions year
    props.tableData.forEach((e) => {
      const month = e.date.split("/")[1];
      const year = e.date.split("/")[2];
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
        val.sort(
          (e1, e2) =>
            moment(e2.date, "DD/MM/YYYY").valueOf() -
            moment(e1.date, "DD/MM/YYYY").valueOf()
        );
      });

      // sort each month map
      mapYear.set(
        key,
        new Map([...val.entries()].sort((e1, e2) => e2[0] > e1[0]))
      );
    });

    // sort each year map
    const sortedByYear = new Map(
      [...mapYear.entries()].sort((e1, e2) => e2[0] > e1[0])
    );
    setDataTableByDate(sortedByYear);

    // populate the year dropdown filter
    props.setYears(Array.from(sortedByYear.keys()));
  }, [props.tableData, props.category]);

  useEffect(() => {
    let noRecordsFound = (
      <Container className="mt-5">
        <Row
          className="justify-content-center m-3"
          style={{ textAlign: "center" }}>
          You don't have any transactions here.
        </Row>
        <Row className="justify-content-center">
          <CreditCard size={75} mood="happy" color="#83D1FB" />
        </Row>
      </Container>
    );

    let buffer = [];
    if (dataTableByDate.size > 0) {
      if (dataTableByDate.has(props.year)) {
        dataTableByDate.get(props.year).forEach((val, key) => {
          if (val.length > 0) {
            buffer.push(
              <div style={{ width: "98%" }}>
                <Container>
                  <Row>
                    <Col>
                      <TransactionsTable
                        tableData={val}
                        category={props.category}
                        month={key}
                      />
                    </Col>
                  </Row>
                </Container>
              </div>
            );
          } else {
            buffer.push(noRecordsFound);
          }
        });
      } else {
        buffer.push(noRecordsFound);
      }
    } else {
      buffer.push(noRecordsFound);
    }

    setFlickingTables(buffer);
  }, [dataTableByDate, props.year]);

  useEffect(() => {
    let buffer = [];
    const categories = [
      { name: "All", value: "all" },
      { name: "Automobile", value: "automobile" },
      { name: "Clothing", value: "clothing" },
      { name: "Food", value: "food" },
      { name: "Fun", value: "fun" },
      { name: "Electronics", value: "electronics" },
      { name: "Amenities", value: "amenities" },
      { name: "Personal", value: "personal" },
      { name: "Medical", value: "medical" },
      { name: "Other", value: "other" },
    ];

    categories.forEach((e) => {
      if (e.value === props.category) {
        buffer.push(
          <Button
            id={e.value}
            onClick={handleClick}
            className="m-1"
            variant="info"
            style={{
              background: "#F2A65E",
              boxShadow: "1px 1px 3px rgba(46, 46, 46, 0.62)",
              borderColor: "#AD7743",
            }}>
            {e.name}
          </Button>
        );
      } else {
        buffer.push(
          <Button
            id={e.value}
            onClick={handleClick}
            className="m-1"
            variant="light">
            {e.name}
          </Button>
        );
      }
    });

    setFlickingCategories(buffer);
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

      {flickingTables.length > 0 && (
        <Flicking
          renderOnlyVisible={true}
          align="prev"
          horizontal="false"
          plugins={plugins}>
          {flickingTables}
          <ViewportSlot>
            <div className="flicking-pagination"></div>
          </ViewportSlot>
        </Flicking>
      )}
    </>
  );
};

TablesContainer.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(TablesContainer);
