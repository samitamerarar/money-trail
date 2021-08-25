import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import { addShop, getShops, deleteShops } from "../../../actions/shopActions";
import AddShopsModal from "./AddShopsModal";

class ManageShops extends Component {
  constructor() {
    super();
    this.state = { isOpenModal: false };
  }

  componentDidMount() {
    this.props.getShops({ category: this.props.category });
  }

  componentDidUpdate() {
    const { shops, shopsLoading } = this.props.shops;
    const { category } = this.props;

    if (
      !shopsLoading &&
      shops &&
      shops[0] &&
      shops[0].category &&
      shops[0].category !== category
    ) {
      this.props.getShops({ category: category });
    }
  }

  handleSubmit = (data) => {
    if (data) {
      const filteredData = data
        .split(/\r?\n/)
        .map((e) => e.trim())
        .filter((e) => e);
      if (filteredData.length) {
        this.props.addShop({
          shops: filteredData,
          category: this.props.category,
        });
      }
    }
  };

  handleDelete = (data) => {
    if (data) {
      const ids = data.map((shop) => shop._id);
      this.props.deleteShops({
        ids: ids,
      });
    }
  };

  openModal = () => this.setState({ isOpenModal: true });
  closeModal = () => this.setState({ isOpenModal: false });

  render() {
    const { shops, shopsLoading } = this.props.shops;
    const { category } = this.props;

    let shopsData = [];
    if (shops) {
      shops.forEach(function (shop) {
        if (shop.category === category)
          shopsData.push({
            _id: shop._id,
            name: shop.name,
            category: shop.category,
          });
      });
    }

    // Setting up data table
    const shopsColumns = [
      {
        title: "Id",
        field: "_id",
        hidden: true,
      },
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Category",
        field: "category",
      },
    ];

    return (
      <Container>
        <Row>
          <Col>
            <Row className="mt-3">
              {shopsLoading ? (
                <Container>
                  <Row>
                    <Col className="mt-3">Fetching shops...</Col>
                  </Row>
                </Container>
              ) : (
                <>
                  <p className="grey-text text-darken-1">
                    You have <b>{shops.length}</b> shop(s) saved in{" "}
                    {this.props.category} category.
                  </p>
                  <Container style={{ padding: "0px" }}>
                    <MaterialTable
                      style={{ marginBottom: "1rem" }}
                      minRows={10}
                      columns={shopsColumns}
                      data={shopsData}
                      title="🛒"
                      actions={[
                        {
                          tooltip: "Add User",
                          icon: "add",
                          isFreeAction: true,
                          onClick: (e) => this.openModal(),
                        },
                        {
                          tooltip: "Remove All Selected Shops Names",
                          icon: "delete",
                          onClick: (e, data) => this.handleDelete(data),
                        },
                      ]}
                      options={{
                        tableLayout: "auto",
                        selection: true,
                        actionsColumnIndex: -1,
                        pageSize: 10,
                        pageSizeOptions: [10, 25, 50],
                        toolbar: true,
                        paging: true,
                        padding: "dense",
                        paginationType: "normal",
                        rowStyle: {
                          fontSize: 13,
                        },
                        searchFieldStyle: {
                          fontSize: 13,
                        },
                      }}
                    />
                  </Container>
                </>
              )}
            </Row>
          </Col>
        </Row>
        <AddShopsModal
          show={this.state.isOpenModal}
          onHide={() => this.closeModal()}
          handleSubmit={(e) => this.handleSubmit(e)}
        />
      </Container>
    );
  }
}

ManageShops.propTypes = {
  getShops: PropTypes.func.isRequired,
  addShop: PropTypes.func.isRequired,
  deleteShops: PropTypes.func.isRequired,
  shops: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  shops: state.shops,
});

export default connect(mapStateToProps, { getShops, addShop, deleteShops })(
  ManageShops
);
