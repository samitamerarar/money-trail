import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';
import UnDraw from '../layout/UnDraw';
import Loading from '../layout/Loading';

const isEmpty = require('is-empty');

export const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (props.auth.isAuthenticated) {
            navigate('/transactions');
        }
    }, []);

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            navigate('/transactions'); // push user to dashboard when they login
        }
        if (props.errors) {
            setErrors(props.errors);
        }
    }, [props.errors, props.auth.isAuthenticated]);

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password
        };

        props.loginUser(userData);
    };

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

            {!isEmpty(props.errors) && (
                <Row>
                    <Col className="text-center text-danger">Errors were returned by the server.</Col>
                </Row>
            )}

            {props.auth.loading ? (
                <Loading loadingwhat="server" />
            ) : (
                <>
                    <UnDraw image={'undraw_access_account_re_8spm'} size="20vh" subtitle="Secure login (with passport and JWTs)." />

                    <Row className="justify-content-center mb-5">
                        <Card style={{ width: '20rem' }}>
                            <Card.Body>
                                <form noValidate onSubmit={onSubmit}>
                                    <Row className="pb-1">
                                        <Col>Email</Col>
                                    </Row>
                                    <Row className="pb-2">
                                        <Col className="text-center">
                                            <input
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
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
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
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
};

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
