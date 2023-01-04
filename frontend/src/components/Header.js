import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { isAdmin } from '../service/CommonUtils';
import { logout } from '../actions/userActions';
import { USER_LOGOUT } from '../constants/userConstants';
import { userActions } from '../reducers/user-slice';
import { Link, useHistory, useLocation } from 'react-router-dom';
const Header = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const user = useSelector((state) => state.user.user);
  const admin = useSelector((state) => state.user.isAdmin);
  const [searchText, setSearchText] = useState('');
  const history = useHistory();
  // const navigate = useN;
  // const { loading, userInfo } = userLogin;
  const location = useLocation();
  const pathName = location.pathname;
  const [isHome, setIsHome] = useState(false);
  // const home = location.pathname.startsWith('/');
  console.log('userInfo ' + userInfo);

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
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='p-2 fas fa-shopping-cart'></i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown className='p-1' title={'Profile'} id='username'>
                  <LinkContainer to='/userProfile'>
                    {/* <LinkContainer to='/'> */}
                    <NavDropdown.Item>{user.userName}</NavDropdown.Item>
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
              {/* {userInfo && admin && (
                <NavDropdown className='p-1' title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
