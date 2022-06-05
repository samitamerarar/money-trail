import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

export const NavigationBar = (props) => {
    const [expanded, setExpanded] = useState(false);

    // Logout
    const onLogoutClick = (e) => {
        e.preventDefault();
        props.logoutUser();
    };

    const { user } = props.auth;
    const { isAuthenticated } = props.auth;

    return (
        <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
            <Container style={{ padding: '0px' }}>
                <Navbar.Brand as={Link} to="/">
                    Money Trail
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} onClick={() => setExpanded(false)} to="/investments">
                            Investments
                        </Nav.Link>
                        <Nav.Link as={Link} onClick={() => setExpanded(false)} to="/transactions">
                            Transactions
                        </Nav.Link>
                        <Nav.Link as={Link} onClick={() => setExpanded(false)} to="/statistics">
                            Statistics
                        </Nav.Link>

                        {/* <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/settings-categories">
                                    Manage Categories
                                </NavDropdown.Item>
                            </NavDropdown> */}
                    </Nav>

                    <Nav>
                        {isAuthenticated ? (
                            <NavDropdown title={user.name.split(' ')[0]} id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} onClick={() => setExpanded(false)} to="/manage">
                                    Manage
                                </NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    href=""
                                    onClick={(e) => {
                                        setExpanded(false);
                                        onLogoutClick(e);
                                    }}>
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
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    logoutUser
})(NavigationBar);
