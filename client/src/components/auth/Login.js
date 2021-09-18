import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/investments");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/investments"); // push user to dashboard when they login
    }
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

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    this.props.loginUser(userData);
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
            <h2>Login below</h2>
          </Col>
        </Row>
        <Row className="p-1">
          <Col>
            Don't have an account? <Link to="/register">Register</Link>
          </Col>
        </Row>
        <form noValidate onSubmit={this.onSubmit}>
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
                  invalid: errors.email || errors.emailnotfound,
                })}
              />
              <Col>
                <span className="text-danger">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
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
                  invalid: errors.password || errors.passwordincorrect,
                })}
              />
              <Col>
                <span className="text-danger">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </Col>
            </Col>
          </Row>

          <Row className="p-1">
            <Col>
              <Button type="submit" variant="primary">
                Login
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
