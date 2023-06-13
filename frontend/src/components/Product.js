import React from 'react';

import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Product = (props) => {
  const product = props.product;
  return (
    <>
      <Card className='my-3 rounded product' style={{ height: '400px' }}>
        <Link to={`/product/${product.productId}`}>
          <Card.Img src={product.imageId} variant='top' style={{ height: '250px' }}></Card.Img>
        </Link>
        <Card.Body>
          <Link to={`/product/${product.productId}`}>
            <Card.Title as='div'>
              <strong>{product.productName}</strong>
            </Card.Title>
          </Link>

          <Card.Text as='div'>
            <Rating value={product.averageRating} text={`${product.noOfRatings} reviews`}></Rating>
          </Card.Text>

          <Card.Text as='div' className='my-3'>
            <p>${product.price}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
