import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';

import FormContainer from '../components/FormContainer';

import { userActions } from '../reducers/user-slice';
import { emailRegex, passwordRegex } from '../constants/common';

const RegisterScreen = (props) => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const m = useSelector((state) => state.user.messageRegister);

  const redirect = props.location.search ? props.location.search.substring(props.location.search.indexOf('=') + 1) : '/';

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect, m]);

  const registerHandler = async (e) => {
    setMessage(null);
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else if (!emailRegex.test(email)) {
      setMessage('Invalid Email');
    } else if (!passwordRegex.test(password)) {
      setMessage('Password must be more than 8 characters.\nIt must contain a number, string and special character');
    } else {
      setMessage(null);
      const details = {
        userName: userName,
        firstName: firstName,
        password: password,
        email: email
      };

      const login = {
        userName: email,
        password: password
      };
      dispatch(userActions.register(details));

      dispatch(userActions.login(login));
    }
  };

  return (
    <div>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='warning'>{message}</Message>}

        <Form onSubmit={registerHandler}>
          <Form.Group controlId='userName'>
            <Form.Label className='font-italic'>Username</Form.Label>
            <Form.Control required placeholder='Username' value={userName} onChange={(e) => setUserName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='firstName'>
            <Form.Label className='font-italic'> Name</Form.Label>
            <Form.Control required placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label className='font-italic'>Email</Form.Label>
            <Form.Control required type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label className='font-italic'>Password</Form.Label>
            <Form.Control
              required
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label className='font-italic'>Confirm Password</Form.Label>
            <Form.Control
              required
              placeholder='Confirm Password'
              type='password'
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className='custom-btn' type='submit' variant='warning'>
            Register
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Have an Account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} style={{ color: '#b0a448' }}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default RegisterScreen;
