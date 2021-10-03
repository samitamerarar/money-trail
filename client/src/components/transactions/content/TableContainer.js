import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import Flicking from "@egjs/react-flicking";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getInvestments,
  addInvestment,
} from "../../../actions/investmentAction";

import moment from "moment";

import TransactionsTable from "./TransactionsTable/TransactionsTable";

export const TableContainer = (props) => {
  const [dataTableByDate, setDataTableByDate] = useState(new Map());
  const [flickingContent, setFlickingContent] = useState([]);
  const [flickingContent2, setFlickingContent2] = useState([]);

  useEffect(() => {
    // start by inserting today month and year
    const mapYear = new Map();
    mapYear.set(
      moment().format("YYYY"),
      new Map([[moment().format("MM"), []]])
    );

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
    setDataTableByDate(
      new Map([...mapYear.entries()].sort((e1, e2) => e2[0] > e1[0]))
    );
  }, [props.tableData, props.category]);

  useEffect(() => {
    let buffer = [];
    if (dataTableByDate.size > 0) {
      if (dataTableByDate.has("2021")) {
        dataTableByDate.get("2021").forEach((val, key) => {
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
        });
      }
    }

    setFlickingContent(buffer);
  }, [dataTableByDate]);

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
            variant="info">
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

    setFlickingContent2(buffer);
  }, [props.category]);

  // set the category on the Parent Component
  const handleClick = (e) => {
    props.setCategory(e.currentTarget.id);
  };

  return (
    <>
      <div>
        {flickingContent2.length > 0 && (
          <Flicking align="prev" bounce="2%">
            {flickingContent2}
          </Flicking>
        )}
      </div>

      {flickingContent.length > 0 && (
        <Flicking renderOnlyVisible={true} align="prev" horizontal="false">
          {flickingContent}
        </Flicking>
      )}
    </>
  );
};

TableContainer.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(TableContainer);
