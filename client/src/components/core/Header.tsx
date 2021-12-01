import React from 'react';
import {     
    Container, 
    Image, 
    Nav, 
    Navbar, 
    NavDropdown, 
    Button  
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { ReduxState } from 'types/ReduxState';
import { logout } from 'actions';
import { AppDispatch } from 'store';
import logo from 'assets/header.png';
import { HomeIcon, LogoutIcon, UserIcon } from 'components/icons';

const Header = () => {
    const history = useHistory();
    const dispatch = useDispatch<AppDispatch>();
    const { userInfo } = useSelector((state: ReduxState) => state.userLogin);
    const logoutHandler = () => dispatch(logout(() => history.push('/')));

    return (
        <Navbar className='' expand='lg' collapseOnSelect>
            <Container>
                <Link to='/'>
                    <Navbar.Brand>
                        <Image src={logo} alt="Logo" width="150" className="Logo" />
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls='navbarScroll' style={{ backgroundColor: '#fff' }} />
                <Navbar.Collapse id='navbarScroll'>
                    <Nav className='ml-auto' navbarScroll>
                        <Nav.Link href="/category">All</Nav.Link>
                        <Nav.Link href="/category/discuss">Discuss</Nav.Link>
                        <Nav.Link href="/category/science">Science</Nav.Link>
                        <Nav.Link href="/category/culture">Culture</Nav.Link>
                        <Nav.Link href="/category/sharing">Sharing</Nav.Link>
                        <Nav.Link href="/category/indite">Indite</Nav.Link>
                        {userInfo ? (
                            <>
                                <Image src={userInfo.avatar} width="40" height="40" roundedCircle />
                                <NavDropdown title={userInfo.name} id='username'>
                                    <Link to='/dashboard'>
                                        <NavDropdown.Item href="/dashboard">
                                            <HomeIcon /> My Dashboard
                                        </NavDropdown.Item>
                                    </Link>
                                    <Link to='/profile'>
                                        <NavDropdown.Item href="/profile">
                                            <UserIcon /> Profile
                                        </NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        <LogoutIcon /> Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/login" style={{ padding: 0, margin: 0 }}>
                                    <Button className="btn-light">
                                        Login
                                    </Button>
                                </Nav.Link>
                                <Nav.Link href="/login" style={{ padding: 0, margin: 0 }}>
                                    <Button className="btn-dark">
                                        Register
                                    </Button>
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
