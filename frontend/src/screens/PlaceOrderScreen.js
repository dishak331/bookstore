import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutSteps from '../components/CheckoutSteps';

import Message from '../components/Message';
import OrderItem from '../components/OrderItem';
import { cartActions } from '../reducers/cart-slice';
import { orderActions } from '../reducers/order-slice';

const PlaceOrderScreen = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const order = {
    shippingAddressId: localStorage.getItem('shippingAddressId'),
    billingAddressId: localStorage.getItem('billingAddressId')
  };
  let shippingAddress = {};

  const previewOrderResponse = useSelector((state) => state.cart.cartItems);
  if (previewOrderResponse.length === 0) {
    props.history.push('/');
  } else {
    const addresses = useSelector((state) => state.address.addresses);
    shippingAddress = addresses.find((address) => address.addressId == order.billingAddressId);
  }
  const orderItems = previewOrderResponse;
  const itemsTotalPrice = useSelector((state) => state.cart.totalPrice);

  if (!order.billingAddressId) {
    props.history.push('/shipping');
  } else if (!order.billingAddressId) {
    props.history.push('/shipping');
  }

  useEffect(() => {}, []);

  const placeOrderHandler = () => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const orderId = (Math.random().toFixed(3) * 100).toString();
    const body = {
      orderId: orderId,
      shippingAddress: shippingAddress,
      orderItems: orderItems,
      paid: true,
      deliveredAt: date,
      paymentDate: date,
      itemsTotalPrice: itemsTotalPrice,
      taxPrice: 2,
      created_at: date,
      shippingPrice: 2,
      isDelivered: true,
      totalPrice: itemsTotalPrice + 4
    };

    dispatch(orderActions.addOrder(body));
    dispatch(cartActions.clearCart());
    props.history.push(`/order/${orderId}`);
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.addressLine1}, {shippingAddress.city}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              CASH
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <OrderItem item={item}></OrderItem>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsTotalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$2</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$2</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${itemsTotalPrice + 4}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  variant='warning'
                  className='btn-block'
                  disabled={previewOrderResponse.orderItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
