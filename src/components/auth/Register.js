import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';
import UnDraw from '../layout/UnDraw';
import Loading from '../layout/Loading';

const isEmpty = require('is-empty');

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/transactions');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
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
            password2: this.state.password2
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
                        <h4>Register below</h4>
                    </Col>
                </Row>

                {!isEmpty(this.props.errors) && (
                    <Row>
                        <Col className="text-center text-danger">Errors were returned by the server.</Col>
                    </Row>
                )}

                {this.props.auth.loading ? (
                    <Loading loadingwhat="server" />
                ) : (
                    <>
                        <UnDraw image={'undraw_join_re_w1lh'} size="18vh" subtitle="The password is encrypted." />

                        <Row className="justify-content-center mb-5">
                            <Card style={{ width: '20rem' }}>
                                <Card.Body>
                                    <form noValidate onSubmit={this.onSubmit}>
                                        <Row className="pb-1">
                                            <Col>Name</Col>
                                        </Row>
                                        <Row className="pb-2">
                                            <Col className="text-center">
                                                <input
                                                    onChange={this.onChange}
                                                    value={this.state.name}
                                                    error={errors.name}
                                                    id="name"
                                                    type="text"
                                                    className={classnames('w-100', {
                                                        invalid: errors.name
                                                    })}
                                                />
                                                <Col className="text-left p-0">
                                                    <small className="text-danger">{errors.name}</small>
                                                </Col>
                                            </Col>
                                        </Row>

                                        <Row className="pb-1">
                                            <Col>Email</Col>
                                        </Row>
                                        <Row className="pb-2">
                                            <Col className="text-center">
                                                <input
                                                    onChange={this.onChange}
                                                    value={this.state.email}
                                                    error={errors.email}
                                                    id="email"
                                                    type="email"
                                                    className={classnames('w-100', {
                                                        invalid: errors.email
                                                    })}
                                                />
                                                <Col className="text-left p-0">
                                                    <small className="text-danger">{errors.email}</small>
                                                </Col>
                                            </Col>
                                        </Row>

                                        <Row className="pb-1">
                                            <Col>Password</Col>
                                        </Row>
                                        <Row className="pb-2">
                                            <Col className="text-center">
                                                <input
                                                    onChange={this.onChange}
                                                    value={this.state.password}
                                                    error={errors.password}
                                                    id="password"
                                                    type="password"
                                                    className={classnames('w-100', {
                                                        invalid: errors.password2
                                                    })}
                                                />
                                                <Col className="text-left p-0">
                                                    <small className="text-danger">{errors.password}</small>
                                                </Col>
                                            </Col>
                                        </Row>

                                        <Row className="pb-1">
                                            <Col>Confirm Password</Col>
                                        </Row>
                                        <Row className="pb-3">
                                            <Col className="text-center">
                                                <input
                                                    onChange={this.onChange}
                                                    value={this.state.password2}
                                                    error={errors.password2}
                                                    id="password2"
                                                    type="password"
                                                    className="w-100"
                                                />
                                                <Col className="text-left p-0">
                                                    <small className="text-danger">{errors.password2}</small>
                                                </Col>
                                            </Col>
                                        </Row>

                                        <Row className="pb-3">
                                            <Col className="text-center">
                                                <Button className="w-100" type="submit" variant="primary">
                                                    Sign Up
                                                </Button>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="text-center">
                                                Already have an account? <Link to="/login">Log in</Link>
                                            </Col>
                                        </Row>
                                    </form>
                                </Card.Body>
                            </Card>
                        </Row>
                    </>
                )}
            </Container>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
