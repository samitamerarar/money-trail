import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Image, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getInvestments,
  addInvestment,
} from "../../../actions/investmentAction";

import moment from "moment";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import TransactionsTable from "./TransactionsTable/TransactionsTable";

export const TableContainer = (props) => {
  const [dataTableByDate, setDataTableByDate] = useState(new Map());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

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

  let buffer = [];
  if (dataTableByDate.size > 0) {
    if (dataTableByDate.has("2021")) {
      dataTableByDate.get("2021").forEach((val, key) => {
        buffer.push(
          <div className="keen-slider__slide">
            <TransactionsTable tableData={val} />
          </div>
        );
      });
    }
  }

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {buffer}
      </div>

      {slider && (
        <div className="dots">
          {[...Array(slider.details().size).keys()].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  slider.moveToSlideRelative(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              />
            );
          })}
        </div>
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
