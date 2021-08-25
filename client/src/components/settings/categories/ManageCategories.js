import React, { Component } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import ManageShops from "./ManageShops";

class ManageCategories extends Component {
  constructor() {
    super();
    this.state = { key: "Food" }; // the key is also the Category Name
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {}

  // Tabs handling
  handleSelect(category) {
    this.setState({ key: category });
  }

  render() {
    let manageCategoriesContent;

    // the key is also the Category Name
    switch (this.state.key) {
      case "Food":
        manageCategoriesContent = <ManageShops category={this.state.key} />;
        break;
      case "Personal Spending":
        manageCategoriesContent = <ManageShops category={this.state.key} />;
        break;
      case "Entertainment":
        manageCategoriesContent = <ManageShops category={this.state.key} />;
        break;
      case "Transportation":
        manageCategoriesContent = <ManageShops category={this.state.key} />;
        break;
      case "Healthcare":
        manageCategoriesContent = <ManageShops category={this.state.key} />;
        break;
      default:
        manageCategoriesContent = <ManageShops category="Food" />;
    }

    let manageCategoriesTabs = (
      <Nav
        fill
        variant="pills"
        defaultActiveKey="Food"
        onSelect={this.handleSelect}
        className="mt-3 flex-column">
        <Nav.Item>
          <Nav.Link eventKey="Food">Food</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Personal Spending">Personal Spending</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Entertainment">Entertainment</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Transportation">Transportation</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Healthcare">Healthcare</Nav.Link>
        </Nav.Item>
      </Nav>
    );

    let manageCategories = (
      <Container>
        <Row className="mt-3">
          <h5>Categories</h5>
        </Row>
        <Row>
          <Col sm={3}>{manageCategoriesTabs}</Col>
          <Col sm={9}>{manageCategoriesContent}</Col>
        </Row>
      </Container>
    );

    return <>{manageCategories}</>;
  }
}

ManageCategories.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(ManageCategories);
