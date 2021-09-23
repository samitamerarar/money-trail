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
        variant="pills"
        defaultActiveKey="Food"
        onSelect={this.handleSelect}
        className="mt-3 flex-column">
        <Nav.Item>
          <Nav.Link eventKey="Food">All</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Medical">Fun</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Medical">Food</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Entertainment">Amenities</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Automobile">Automobile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Medical">Smartphone</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Medical">Electronics</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Medical">Medical</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Medical">Personal</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Medical">Other</Nav.Link>
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
