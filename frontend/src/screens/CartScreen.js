import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import CartItem from '../components/CartItem';
import { LinkContainer } from 'react-router-bootstrap';
import { cartActions } from '../reducers/cart-slice';

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { userInfo } = userLogin;
  const redirect = props.location.pathname;

  useEffect(() => {
    if (userInfo === null || userInfo === undefined || !userInfo) {
      props.history.push(`/login?redirect=${redirect}`);
      return;
    }
  }, [userInfo]);

  const addToCart = (item, q) => {
    dispatch(
      cartActions.addToCart({
        productId: item.productId,
        productName: item.productName,
        itemPrice: item.itemPrice,
        imageId: item.imageId,
        outOfStock: item.outOfStock,
        extendedPrice: 0,
        quantity: q
      })
    );
  };

  const checkoutHandler = () => {
    props.history.push('/login?redirect=placeOrder');
  };

  return (
    <>
      <>
        <Row>
          <h1>Shopping Cart</h1>
        </Row>
        <Row>
          <Col md={8}>
            {cart == null || cart.cartItems.length == 0 ? (
              <Message>
                Your cart is empty <Button onClick={() => props.history.goBack()}>Go Back</Button>
              </Message>
            ) : (
              <ListGroup.Item variant='flush'>
                {cart.cartItems.map((item) => (
                  <CartItem key={item.productId} item={item} addToCart={addToCart}></CartItem>
                ))}
              </ListGroup.Item>
            )}
            <Row className='m-5 justify-content-md-center'>
              <LinkContainer to={'/'}>
                <a>Add more books</a>
              </LinkContainer>
            </Row>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>`Subtotal ${cart.cartItems.length} Items`</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>${cart.totalPrice}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type='button'
                    variant='warning'
                    className='btn-block'
                    disabled={cart.cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    </>
  );
};

export default CartScreen;
