import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../reducers/user-slice';
import { useHistory, useLocation } from 'react-router-dom';
const Header = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const username = useSelector((state) => state.user.user.userName);
  const admin = useSelector((state) => state.user.isAdmin);
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  const location = useLocation();
  const pathName = location.pathname;
  const [isHome, setIsHome] = useState(false);
  console.log('userInfo ' + userInfo);
  // console.log(`//${user.userName}`);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userActions.logout());
  };

  const searchHandler = (event) => {
    event.preventDefault();
    if (searchText.length === 0) {
      history.push('/');
      return;
    }
    history.push({
      pathname: location.pathname,
      search: `?search=${searchText}`
    });
  };

  useEffect(() => {
    setIsHome(pathName === '/');
  }, [pathName]);

  return (
    <header>
      <Navbar
        style={{
          background: '#f0e8a1',

          border: '2em'
        }}
        className='navbar navbar-expand-lg navbar-light'
        expand='md'
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='bookstore-brand'>
              <i>Book</i>ish
            </Navbar.Brand>
          </LinkContainer>
          {isHome && (
            <Form className='d-flex p-2 ml-2 ' onSubmit={searchHandler}>
              <Form.Control
                type='search'
                placeholder='Search'
                className='me-2'
                onChange={(e) => setSearchText(e.target.value)}
                aria-label='Search'
              />

              <Button className='ml-3' variant='warning' type='submit'>
                Search
              </Button>
            </Form>
          )}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='navbar-nav ml-auto'>
              {admin && (
                <LinkContainer to='/admin/addBook'>
                  <Nav.Link>
                    <i className='p-2 fas fa-plus-circle'></i>Add Book
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='p-2 fas fa-shopping-cart'></i>Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown className='p-1' title={'Profile'} id='username'>
                  <LinkContainer to='/userProfile'>
                    <NavDropdown.Item>{username}</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link href='/login'>
                    <i className='p-2 fas fa-user'></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
