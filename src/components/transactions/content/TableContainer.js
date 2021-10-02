import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Image, Nav } from "react-bootstrap";
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

    setDataTableByDate(mapYear);
  }, [props.tableData]);

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
  }, [props.category, dataTableByDate]);

  return (
    <>
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
