import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import OrderItem from '../components/OrderItem';
import { getOrderByIdData } from '../actions/order-actions';
import FullPageLoader from '../components/FullPageLoader';
import { useState } from 'react';
import { getUserDataById } from '../actions/user-actions';

const OrderScreen = ({ match, history }) => {
  const orderId = parseInt(match.params.id);
  let userId = match.params.userId;
  console.log(userId);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const userInfo = useSelector((state) => state.user.userInfo);
  const user = useSelector((state) => state.user.user);

  const order = useSelector((state) => state.order.orderDetails);
  const error = useSelector((state) => state.order.orderMessage);
  const admin = useSelector((state) => state.user.isAdmin);
  const userData = useSelector((state) => state.order.userData);
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [dispatch, orderId]);

  useEffect(async () => {
    console.log(orderId);
    setLoading(true);
    await dispatch(getOrderByIdData(orderId));
    console.log(userId);
    if (userId) {
      console.log(userId);
      await dispatch(getUserDataById(parseInt(userId)));
    }
    setLoading(false);
  }, [dispatch, orderId]);

  return (
    <>
      {loading ? (
        <FullPageLoader></FullPageLoader>
      ) : error.length > 0 ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h1>Order - #{order.orderId}</h1>
          <hr></hr>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Details:</h2>
                  <p>
                    <strong>Name: </strong> {userId ? userData.firstName + ' ' + userData.lastName : user.firstName + ' ' + user.lastName}
                  </p>
                  <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${userId ? userData.email : user.email}`}>{userId ? userData.email : user.email}</a>
                  </p>
                  {order.isDelivered ? (
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
                  {order.orderItems?.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems?.map((item, index) => (
                        <OrderItem key={item.productId} item={item}></OrderItem>
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
                      <Col>
                        <h3>Total</h3>
                      </Col>
                      <Col>
                        <h3>${order.total}</h3>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
