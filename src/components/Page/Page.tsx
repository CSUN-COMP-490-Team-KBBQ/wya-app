import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import logo from '../../assets/wya-logo.png';
import { useUserContext } from '../../contexts/UserContext';
import { logOut } from '../../lib/auth';
import './Page.css';

const Page: React.FC = ({ children }): JSX.Element => {
    const { user } = useUserContext();
    return (
        <>
            <Navbar expand={false}>
                <Container fluid>
                    <Navbar.Brand href="/">
                        <Image src={logo} fluid style={{ height: '60px' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="offcanvasNavbar"
                        // Remove the border and boxShadow onFocus
                        style={{ border: 'unset', boxShadow: 'none' }}
                    />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                        style={{ width: '20%' }}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">
                                Menu
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav>
                                <Nav.Link href="/">Home</Nav.Link>
                                {user ? (
                                    <>
                                        {/* Private */}

                                        {/* If a user is logged in then the calendar will be the home page */}
                                        <Nav.Link href="/calendar">
                                            Calendar
                                        </Nav.Link>

                                        <Nav.Link href="/create-event">
                                            Create an event
                                        </Nav.Link>
                                        <Nav.Link href="/profile">
                                            Profile
                                        </Nav.Link>
                                        <Nav.Item>
                                            <Button
                                                variant="danger"
                                                style={{ width: '100%' }}
                                                onClick={logOut}
                                            >
                                                Log out
                                            </Button>
                                        </Nav.Item>
                                    </>
                                ) : (
                                    <>
                                        {/* Public */}
                                        <Nav.Link href="/register">
                                            Create an account
                                        </Nav.Link>
                                        <Nav.Link href="/login">
                                            Log in
                                        </Nav.Link>
                                    </>
                                )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            {children}
        </>
    );
};

export default Page;
