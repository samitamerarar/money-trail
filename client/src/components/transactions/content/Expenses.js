import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Chart from "react-apexcharts";

class Expenses extends Component {
  componentDidMount() {}

  render() {
    const { expenses } = this.props;

    const series = [
      {
        name: "This Month",
        data: expenses.thisMonth,
      },
      {
        name: "Past Month",
        data: expenses.pastMonth,
      },
      {
        name: "Monthly Average",
        data: expenses.averagePerMonth,
      },
    ];

    const options = {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "86%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Food",
          "Personal Spending",
          "Entertainment",
          "Transportation",
          "Healthcare",
          "Other",
        ],
      },
      yaxis: {
        title: {
          text: "expenses ($)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " $";
          },
        },
      },
    };

    return (
      <Row>
        <Col>
          <Row className="mt-3">
            <h5>Expenses</h5>
          </Row>

          <Row className="mt-3">
            <Container style={{ padding: "0px" }}>
              <Chart
                options={options}
                series={series}
                type="bar"
                height={500}
              />
            </Container>
          </Row>
        </Col>
      </Row>
    );
  }
}

Expenses.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Expenses);
