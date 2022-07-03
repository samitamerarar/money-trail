import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';
import UnDraw from '../layout/UnDraw';
import Loading from '../layout/Loading';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/transactions');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/transactions'); // push user to dashboard when they login
        }
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

        const userData = {
            email: this.state.email,
            password: this.state.password
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
                        <h4>Login below</h4>
                    </Col>
                </Row>

                {this.props.auth.loading ? (
                    <Loading loadingwhat="server" />
                ) : (
                    <>
                        <UnDraw image={'undraw_access_account_re_8spm'} size="20vh" subtitle="Secure login below (with passport and JWTs)." />

                        <Row className="justify-content-center">
                            <Card style={{ width: '20rem' }}>
                                <Card.Body>
                                    <form noValidate onSubmit={this.onSubmit}>
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
                                                        invalid: errors.email || errors.emailnotfound
                                                    })}
                                                />
                                                <Col className="text-left p-0">
                                                    <small className="text-danger">
                                                        {errors.email}
                                                        {errors.emailnotfound}
                                                    </small>
                                                </Col>
                                            </Col>
                                        </Row>

                                        <Row className="pb-1">
                                            <Col>Password</Col>
                                        </Row>
                                        <Row className="pb-3">
                                            <Col className="text-center">
                                                <input
                                                    onChange={this.onChange}
                                                    value={this.state.password}
                                                    error={errors.password}
                                                    id="password"
                                                    type="password"
                                                    className={classnames('w-100', {
                                                        invalid: errors.password || errors.passwordincorrect
                                                    })}
                                                />
                                                <Col className="text-left p-0">
                                                    <small className="text-danger">
                                                        {errors.password}
                                                        {errors.passwordincorrect}
                                                    </small>
                                                </Col>
                                            </Col>
                                        </Row>

                                        <Row className="pb-3">
                                            <Col className="text-center">
                                                <Button className="w-100" type="submit" variant="primary">
                                                    Login
                                                </Button>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="text-center">
                                                Don't have an account? <Link to="/register">Register</Link>
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
