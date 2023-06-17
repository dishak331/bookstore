import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { cartActions } from '../reducers/cart-slice';

const CartItem = ({ item, addToCart }) => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const removeFromCartHandler = (cartItemId) => {
    dispatch(cartActions.removeFromCart(cartItemId));
  };

  return (
    <>
      <ListGroup.Item key={item.productId}>
        <Row>
          <Col md={2}>
            <Image src={item.imageId} alt={item.productName} fluid rounded></Image>
          </Col>
          <Col md={3} className='pt-4'>
            <Link to={`/product/${item.productId}`}>{item.productName}</Link>
          </Col>
          <Col md={2} className='pt-4'>
            ${item.itemPrice}
          </Col>
          <Col md={2} className='pt-3'>
            {item && (
              <>
                <Form.Control as='select' value={item.quantity} onChange={(e) => addToCart(item, e.target.value)}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Form.Control>
              </>
            )}
          </Col>
          <Col md={1} className='pt-4'>
            ${item.extendedPrice}
          </Col>
          <Col md={2} className='pt-3 pl-5'>
            <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.productId)}>
              <i className='fas fa-trash'></i>
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default CartItem;
