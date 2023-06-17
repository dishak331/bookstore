import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import OrderItem from '../components/OrderItem';
import { createCartData } from '../actions/order-actions';
import FullPageLoader from '../components/FullPageLoader';

const PlaceOrderScreen = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const order = {
    shippingAddressId: localStorage.getItem('shippingAddressId'),
    billingAddressId: localStorage.getItem('billingAddressId')
  };
  const previewOrderResponse = useSelector((state) => state.cart.cartItems);
  const orderItems = previewOrderResponse;
  const error = useSelector((state) => state.order.cartMessage);
  const itemsTotalPrice = useSelector((state) => state.cart.totalPrice);
  const userId = useSelector((state) => state.user.user.userId);

  if (!order.billingAddressId) {
    props.history.push('/shipping');
  } else if (!order.billingAddressId) {
    props.history.push('/shipping');
  }

  useEffect(() => {}, []);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    const current = new Date();
    setLoading(true);
    const order_details = [];
    orderItems.map((item) => {
      order_details.push({
        book_id: item.productId,
        book_qty: item.quantity,
        book_image: item.imageId,
        book_outOfStock: item.outOfStock,
        book_price: item.itemPrice,
        book_name: item.productName,
        subtotal: item.extendedPrice
      });
    });
    const body = {
      order_details: order_details,
      total: itemsTotalPrice,
      user_id: userId
    };
    dispatch(createCartData(body, props));
    setLoading(false);
  };

  return (
    <>
      {error.length > 0 && <Message variant='danger'>{error}</Message>}
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Confirm your Order:</h2>
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
                <Button
                  type='button'
                  variant='warning'
                  className='btn-block'
                  disabled={previewOrderResponse.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {loading && <FullPageLoader></FullPageLoader>}
    </>
  );
};

export default PlaceOrderScreen;
