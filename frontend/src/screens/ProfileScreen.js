import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import Message from '../components/Message';

import { userActions } from '../reducers/user-slice';
import { updateUserData } from '../actions/user-actions';
import FullPageLoader from '../components/FullPageLoader';

const ProfileScreen = ({ history }) => {
  const [username, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfo);
  // const { userInfo } = userLogin;

  const user = useSelector((state) => state.user.user);

  // setFirstName(user.firstName);
  // setLastName(user.lastName);
  // setEmail(user.email);
  const success = useSelector((state) => state.user.updateSuccess);
  const msg = useSelector((state) => state.user.messageUpdate);
  // const { error: errorUserDetails, loading: loadingUserDetails, user } = userDetails;

  // const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  // const { error: errorUpdateUserDetails, loading: loadingUpdateUserDetails, success } = userUpdateProfile;

  const orders = useSelector((state) => state.order.orders);
  // const { error: errorOrderListMy, loading: loadingOrderListMy, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    setUserName(user.userName);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    // else {
    //   if (!user || !user.userName) {
    //     dispatch({ type: USER_UPDATE_PROFILE_RESET });
    //     dispatch(getUserDetails());
    //   } else {
    //     setFirstName(user.firstName);
    //     setLastName(user.lastName);
    //     setEmail(user.email);
    //   }
    // }
    // dispatch(listMyOrdersAction());
  }, [userInfo, user]);

  const userProfileUpdateHandler = (e) => {
    e.preventDefault();
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setLoading(true);
      const userid = user.userId;
      if (!user.userId) {
        userid = JSON.parse(localStorage.getItem('user')).userId;
      }
      const details = {
        user_id: userid,
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: password
      };
      dispatch(updateUserData(details));
      setLoading(false);
      const timer = setTimeout(() => {
        dispatch(userActions.setSuccessFalse());
      }, 3000);
      return () => clearTimeout(timer);
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {!message && msg.length > 0 && <Message variant='warning'>{msg}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {/* {(errorUserDetails || errorUpdateUserDetails) && <Message variant='danger'>{errorUserDetails || errorUpdateUserDetails}</Message>} */}
        <Form onSubmit={userProfileUpdateHandler}>
          <Form.Group controlId='userName'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type='userName'
              placeholder='Enter Username'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='firstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type='firstName'
              placeholder='Enter First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='lastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='lastName'
              placeholder='Enter Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='warning'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {/* {errorOrderListMy ? (
          <Message variant='danger'>{errorOrderListMy}</Message>
        ) : ( */}
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.created_at}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.paid ? order.paymentDate?.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                  <td>
                    {order.delivered ? order.deliveredDate?.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order.orderId}`}>
                      <Button className='btn-sm' variant='warning'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {/* )} */}
      </Col>
      {loading && <FullPageLoader />}
      {/* {(loadingUserDetails || loadingUpdateUserDetails || loadingOrderListMy) && <FullPageLoader />} */}
    </Row>
  );
};

export default ProfileScreen;
