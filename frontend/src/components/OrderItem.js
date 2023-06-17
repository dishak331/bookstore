import React, { useEffect } from 'react';

import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

const OrderItem = ({ item }) => {
  const products = useSelector((state) => state.product.products);
  const product = products.find((prod) => prod.productId == item.productId);

  useEffect(async () => {}, []);

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
          <Col md={2} className='pt-4'>
            {item.quantity}
          </Col>
          <Col md={1} className='pt-4'>
            ${item.extendedPrice}
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default OrderItem;
