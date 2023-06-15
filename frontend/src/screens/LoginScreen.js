import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';

import FormContainer from '../components/FormContainer';

import { userActions } from '../reducers/user-slice';
import { emailRegex, passwordRegex } from '../constants/common';

const LoginScreen = (props) => {
  const [userNameOrEmail, setUserNameOrEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const message = useSelector((state) => state.user.messageLogin);
  // const { loading, userInfo } = userLogin;
  const history = useHistory();

  const redirect = props.location.search ? props.location.search.substring(props.location.search.indexOf('=') + 1) : '/';

  useEffect(() => {
    if (userInfo) {
      console.log('changed');
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    console.log('doing');
    // if(userNameOrEmail.length===0||password.length===0){
    //   setMsg("")
    // }

    if (!emailRegex.test(userNameOrEmail) && !passwordRegex.test(password)) {
      console.log(userNameOrEmail);
      setMsg('Invalid Email or Password');
      return;
    }
    // if () {
    //   console.log(password);
    //   setMsg('Invalid Password');
    //   return;
    // }
    setMsg('');
    const loginDetails = {
      userName: userNameOrEmail,
      password: password
    };
    dispatch(userActions.login(loginDetails));
    // history.push(redirect);
    console.log('done');
  };

  return (
    <div>
      <FormContainer>
        <h1>Sign In</h1>
        {message.length > 0 && msg.length === 0 && <Message variant='warning'>{message}</Message>}
        {msg.length > 0 && <Message variant='warning'>{msg}</Message>}
        <Form onSubmit={loginSubmitHandler}>
          <Form.Group controlId='userNameOrEmail'>
            <Form.Label className='font-italic'>Email Address</Form.Label>
            <Form.Control
              placeholder='Email'
              required
              value={userNameOrEmail}
              onChange={(e) => setUserNameOrEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label className='font-italic'>Password</Form.Label>
            <Form.Control
              placeholder='Password'
              required
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className='custom-btn' type='submit' variant='warning'>
            Sign In
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link to={'/register'} style={{ color: '#b0a448' }}>
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
      {/* {loading && <FullPageLoader></FullPageLoader>} */}
    </div>
  );
};

export default LoginScreen;
