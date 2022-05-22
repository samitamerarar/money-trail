import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class NavigationBar extends Component {
    // Logout
    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container style={{ padding: '0px' }}>
                    <Navbar.Brand as={Link} to="/">
                        Money Trail
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/investments">
                                Investments
                            </Nav.Link>
                            <Nav.Link as={Link} to="/transactions">
                                Transactions
                            </Nav.Link>

                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/settings-categories">
                                    Manage Categories
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <Nav>
                            {this.props.auth.isAuthenticated ? (
                                <NavDropdown title={user.name.split(' ')[0]} id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/manage">
                                        Manage
                                    </NavDropdown.Item>

                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="" onClick={this.onLogoutClick}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <></>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    logoutUser
})(NavigationBar);
