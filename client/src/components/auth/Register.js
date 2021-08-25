import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/portfolio");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <Container>
        <Link to="/" className="btn-flat waves-effect">
          Back to home
        </Link>
        <Row className="p-1">
          <Col>
            <h2>Register below</h2>
          </Col>
        </Row>
        <Row className="p-1">
          <Col>
            Already have an account? <Link to="/login">Log in</Link>
          </Col>
        </Row>

        <form noValidate onSubmit={this.onSubmit}>
          <Row className="p-1">
            <Col>Name</Col>
          </Row>
          <Row className="p-1">
            <Col>
              <input
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
                className={classnames("", {
                  invalid: errors.name,
                })}
              />
              <Col>
                <span className="text-danger">{errors.name}</span>
              </Col>
            </Col>
          </Row>

          <Row className="p-1">
            <Col>Email</Col>
          </Row>
          <Row className="p-1">
            <Col>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email,
                })}
              />
              <Col>
                <span className="text-danger">{errors.email}</span>
              </Col>
            </Col>
          </Row>

          <Row className="p-1">
            <Col>Password</Col>
          </Row>
          <Row className="p-1">
            <Col>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password2,
                })}
              />
              <Col>
                <span className="text-danger">{errors.password}</span>
              </Col>
            </Col>
          </Row>

          <Row className="p-1">
            <Col>Confirm Password</Col>
          </Row>
          <Row className="p-1">
            <Col>
              <input
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
              />
              <Col>
                <span className="text-danger">{errors.password2}</span>
              </Col>
            </Col>
          </Row>

          <Row className="p-1">
            <Col>
              <Button type="submit" variant="primary">
                Sign Up
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
