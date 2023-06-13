import React, { useEffect } from 'react';

import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';

import OrderItem from '../components/OrderItem';

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfo);
  const user = useSelector((state) => state.user.user);

  const orders = useSelector((state) => state.order.orders);
  const order = orders.find((o) => o.orderId == orderId);
  if (!order) {
    history.push('/');
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [dispatch, orderId]);

  return (
    <>
      <>
        <h1>Order - #{order.orderId}</h1>
        <hr></hr>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {user.firstName + ' ' + user.lastName}
                </p>
                <p>
                  <strong>Email: </strong> <a href={`mailto:${user.email}`}>{user.email}</a>
                </p>
                <p>
                  <strong>Address:</strong>
                  {order.shippingAddress.addressLine1}, {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
                {order.delivered ? (
                  <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  CASH
                </p>
                {order.paid ? (
                  <Message variant='success'>Paid on {order.paymentDate}</Message>
                ) : (
                  <Message variant='danger'>Not Paid</Message>
                )}

                <p></p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
                      <OrderItem item={item}></OrderItem>
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
                    <Col>${order.itemsTotalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    </>
  );
};

export default OrderScreen;
