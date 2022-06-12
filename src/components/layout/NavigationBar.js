import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

export const NavigationBar = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [isComponentLoading, setIsComponentLoading] = useState(false);

    // Logout
    const onLogoutClick = (e) => {
        e.preventDefault();
        collapseNav();
        props.logoutUser();
    };

    // Prevents lag while collapsing navbar, this calls the [isComponentLoading] useEffect
    const collapseNav = () => {
        setIsComponentLoading(!isComponentLoading);
    };
    useEffect(() => {
        // Set timeout to prevents further lag while collapsing navbar
        setTimeout(() => {
            setExpanded(false);
        }, 300);
    }, [isComponentLoading]);

    const { user } = props.auth;
    const { isAuthenticated } = props.auth;

    return (
        <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
            <Container className="p-0">
                <Navbar.Brand as={Link} to="/">
                    Money Trail
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} onClick={collapseNav} to="/investments">
                            Investments
                        </Nav.Link>
                        <Nav.Link as={Link} onClick={collapseNav} to="/transactions">
                            Transactions
                        </Nav.Link>
                        <Nav.Link as={Link} onClick={collapseNav} to="/statistics">
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
                                <NavDropdown.Item as={Link} onClick={collapseNav} to="/manage">
                                    Manage
                                </NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item href="" onClick={onLogoutClick}>
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
