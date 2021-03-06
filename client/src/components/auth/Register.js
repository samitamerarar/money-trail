import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';
import UnDraw from '../layout/UnDraw';
import Loading from '../layout/Loading';

const isEmpty = require('is-empty');

export const Register = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (props.auth.isAuthenticated) {
            navigate('/transactions');
        }
    }, []);

    useEffect(() => {
        if (props.errors) {
            setErrors(props.errors);
        }
    }, [props.errors]);

    const onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: name,
            email: email,
            password: password,
            password2: password2
        };

        props.registerUser(newUser, navigate);
    };

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

            {!isEmpty(props.errors) && (
                <Row>
                    <Col className="text-center text-danger">Errors were returned by the server.</Col>
                </Row>
            )}

            {props.auth.loading ? (
                <Loading loadingwhat="server" />
            ) : (
                <>
                    <UnDraw image={'undraw_join_re_w1lh'} size="18vh" subtitle="The password is encrypted." />

                    <Row className="justify-content-center mb-5">
                        <Card style={{ width: '20rem' }}>
                            <Card.Body>
                                <form noValidate onSubmit={onSubmit}>
                                    <Row className="pb-1">
                                        <Col>Name</Col>
                                    </Row>
                                    <Row className="pb-2">
                                        <Col className="text-center">
                                            <input
                                                onChange={(e) => setName(e.target.value)}
                                                value={name}
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
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
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
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
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
                                                onChange={(e) => setPassword2(e.target.value)}
                                                value={password2}
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
};

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(Register);
