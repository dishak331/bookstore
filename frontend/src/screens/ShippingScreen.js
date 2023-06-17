import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, ListGroup, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch } from 'react-redux';

import { addressActions } from '../reducers/address-slice';
import { phoneRegex } from '../constants/common';
import CountrySelect from '../components/CountrySelect';

const ShippingScreen = ({ history }) => {
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('0');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [billingAddressId, setBillingAddressId] = useState('');
  const [shippingAddressId, setShippingAddressId] = useState('');

  const dispatch = useDispatch();

  const addresses = useSelector((state) => state.address.addresses);

  useEffect(() => {
    if (addresses.length > 0) {
      setBillingAddressId(addresses[0].addressId);
      setShippingAddressId(addresses[0].addressId);
    }
  }, [addresses]);

  const saveAddressHandler = async (e) => {
    e.preventDefault();
    if (country == 0) {
      setMessage('Please select country');
    } else if (!phoneRegex.test(phone) || phone.length !== 10) {
      setMessage('invalid phone number');
    } else {
      setMessage('');
      const addressRequestBody = {
        addressId: Math.random().toFixed(3).toString(),
        billingAddressId: Math.random().toFixed(3).toString(),
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
        phone
      };
      setAddressLine1('');
      setAddressLine2('');
      setCity('');
      setState('');
      setPostalCode('');
      setCountry(0);
      setPhone('');
      dispatch(addressActions.addAddress(addressRequestBody));
    }
  };

  const proceedToPayment = () => {
    if (shippingAddressId === null || shippingAddressId === '') {
      setMessage('Shipping Address is required');
      return;
    }
    localStorage.setItem('shippingAddressId', shippingAddressId);
    localStorage.setItem('billingAddressId', billingAddressId);
    history.push('/placeorder');
  };

  const deleteAddress = (addressId) => {
    if (addressId === billingAddressId) {
      setBillingAddressId(null);
    }
    if (addressId === shippingAddressId) {
      setShippingAddressId(null);
    }
    dispatch(addressActions.removeAddress(addressId));
  };

  return (
    <>
      <Row className='justify-content-md-center'>
        <CheckoutSteps step1 step2 />
      </Row>
      <Row className='mx-5 justify-content-md-center'>
        <h1 className='mx-5 justify-content-md-center'>Address</h1>
      </Row>
      <hr></hr>
      <>
        <Row>
          <Col xs={12} md={6}>
            <>
              <h2>Select Shipping Address</h2>
              {addresses.length == 0 && <Message>Add address</Message>}
              {addresses.map((a) => (
                <div key={a.addressId}>
                  <ListGroup.Item variant='flush'>
                    <InputGroup>
                      <Col md={1}>
                        <Form.Check
                          type='radio'
                          id={a.billingAddressId}
                          value={billingAddressId}
                          name='billingAddress'
                          checked={a.addressId === billingAddressId ? true : false}
                          onChange={() => {
                            setBillingAddressId(a.addressId);
                          }}
                        ></Form.Check>
                      </Col>
                      <Col>
                        <div
                          className='p-2'
                          style={{
                            whiteSpace: 'pre-wrap',
                            backgroundColor: '#eeeeee'
                          }}
                          onClick={() => {
                            setBillingAddressId(a.addressId);
                          }}
                        >
                          <p className='m-0'>{a.addressLine1} </p>
                          <p className='m-0'>{a.addressLine2}</p>
                          <p className='m-0'>
                            {a.city}, {a.state}, {a.country}
                          </p>
                          <p className='m-0'>{a.postalCode}</p>
                          <p className='m-0'>{a.phone}</p>
                        </div>
                      </Col>
                      <Col md={2} className='mr-0 pr-0'>
                        <Button type='button' variant='light' onClick={() => deleteAddress(a.addressId)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                    </InputGroup>
                  </ListGroup.Item>
                </div>
              ))}
            </>
          </Col>
          <Col xs={12} md={6}>
            {message && <Message variant='warning'>{message}</Message>}
            <h2>
              <p>Add New Address</p>
            </h2>
            <Form onSubmit={saveAddressHandler}>
              <Row className='mx-5 justify-content-md-center'>
                <Col>
                  <Form.Group controlId='addressLine1'>
                    <Form.Label>Address Line 1</Form.Label>
                    <Form.Control
                      required
                      placeholder='Enter address line 1'
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='addressLine2'>
                    <Form.Label>Address Line 2</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter address line 2'
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter city'
                      value={city}
                      required
                      onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='state'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter State'
                      value={state}
                      required
                      onChange={(e) => setState(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <CountrySelect onChange={(e) => setCountry(e.target.value)} />

                  <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter postal code'
                      value={postalCode}
                      required
                      onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='phone'>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      required
                      type='phone'
                      name='phone'
                      placeholder='Enter Phone number'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='mx-5 justify-content-md-center'>
                <Button type='submit' variant='warning'>
                  <>Add New Address</>
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>

        <hr></hr>
        <Row className='mx-5 justify-content-md-center'>
          <Button type='submit' variant='warning' onClick={proceedToPayment} className='mt-3' disabled={!shippingAddressId}>
            Proceed to Place Order
          </Button>
        </Row>
      </>
    </>
  );
};

export default ShippingScreen;
