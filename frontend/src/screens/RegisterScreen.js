import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import FullPageLoader from '../components/FullPageLoader';
import { emailRegex, passwordRegex } from '../constants/common';
import { registerUserData } from '../actions/user-actions';

const RegisterScreen = (props) => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const m = useSelector((state) => state.user.messageRegister);
  const redirect = props.location.search ? props.location.search.substring(props.location.search.indexOf('=') + 1) : '/login';

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

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
      setLoading(true);
      const details = {
        username: userName,
        first_name: firstName,
        password: password,
        email: email,
        last_name: ''
      };

      dispatch(registerUserData(details));
      setLoading(false);
    }
  };

  return (
    <div>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && m.length === 0 && <Message variant='warning'>{message}</Message>}
        {m.length > 0 && <Message variant='warning'>{m}</Message>}

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
      {loading && <FullPageLoader></FullPageLoader>}
    </div>
  );
};

export default RegisterScreen;
