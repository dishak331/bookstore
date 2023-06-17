import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { cartActions } from '../reducers/cart-slice';
import { userDetails } from '../reducers/user-slice';
import { getBookData } from '../actions/product-actions';
import FullPageLoader from '../components/FullPageLoader';
import { createReviewData } from '../actions/review-actions';
import { history } from '../App';

const ProductScreen = (props) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);
  const admin = useSelector((state) => state.user.isAdmin);
  const product = useSelector((state) => state.product.productDetail);
  const productLoading = useSelector((state) => state.product.getBookLoading);
  const msg = useSelector((state) => state.product.messageProductDetail);
  const reviewError = useSelector((state) => state.product.reviewMessage);
  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;

  useEffect(() => {
    // setLoading(true);
    dispatch(getBookData(id));
    // setLoading(false);
  }, [dispatch, id]);

  useEffect(() => {
    if (product.reviews) {
      setReviews(product.reviews);
      console.log(reviews);
    }
  }, [product]);
  if (msg.length > 0) {
    return (
      <div className='text-center'>
        <Message>{msg}</Message>
      </div>
    );
  }

  const inCart = cart.find((prod) => prod.productId == id);

  const addToCartHandler = () => {
    dispatch(
      cartActions.addToCart({
        productId: id,
        productName: product.productName,
        itemPrice: product.price,
        imageId: product.imageId,
        outOfStock: product.outOfStock,
        extendedPrice: 0,
        quantity: qty
      })
    );
  };

  const createProductReviewHandler = (e) => {
    e.preventDefault();
    const newReview = {
      username: userDetails.userName,
      description: reviewMessage,
      rating: rating,
      book_id: id,
      user_id: userDetails.userId
    };
    setLoading(true);
    dispatch(createReviewData(newReview));
    setRating(0);
    setReviewMessage('');
    setLoading(false);
  };

  return !loading && !productLoading ? (
    <>
      <Row>
        <Button
          className='btn btn-dark my-3'
          onClick={() => {
            props.history.goBack();
          }}
        >
          Go Back
        </Button>
        {admin && (
          <Link to={`/admin/editBook/${product.productId}`}>
            <Button onClick={() => {}} className='btn my-3 ml-3' variant='warning' type='button'>
              Edit Book
            </Button>
          </Link>
        )}
      </Row>
      <>
        <Row>
          <Col md={6}>
            {true && (
              <div style={{ minWidth: '100%', height: '400px' }}>
                <Image style={{ height: '100%', width: '100%' }} src={product.imageId} alt={product.productName} fluid></Image>
              </div>
            )}
          </Col>
          <Col md={3} style={{ borderLeft: '1px solid #eee' }}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h4>{product.productName}</h4>
              </ListGroupItem>
              <ListGroupItem>
                <i>by {product.author}</i>
              </ListGroupItem>
              <ListGroupItem>
                <Rating value={product.averageRating} text={`${product.noOfRatings} reviews`}></Rating>
              </ListGroupItem>
              <ListGroupItem>Price : ${product.price}</ListGroupItem>
              <ListGroupItem>Description : {product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.outOfStock === 'no' ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroupItem>

                {product.outOfStock === 'no' && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                {!inCart && (
                  <ListGroupItem>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      variant='warning'
                      type='button'
                      disabled={product.outOfStock === 'yes' || admin}
                    >
                      Add to Cart
                    </Button>
                  </ListGroupItem>
                )}
                {inCart && (
                  <ListGroupItem>
                    <Button
                      onClick={(e) => props.history.push('/cart')}
                      className='btn-block'
                      type='button'
                      variant='warning'
                      disabled={product.availableItemCount <= 0}
                    >
                      Go to Cart
                    </Button>
                  </ListGroupItem>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row
          className='my-4 py-4'
          style={{
            borderTop: '1px solid #eee',
            borderBottom: '1px solid #eee'
          }}
        >
          <Col md={6}>
            <h2>Reviews</h2>
            {reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant='flush'>
              {reviews.map((review) => (
                <ListGroup.Item key={review.review_id}>
                  <strong>{review.username ? review.username : 'Anonymous'}</strong>
                  <Rating value={review.rating} />
                  <p>{review.description}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={6} style={{ borderLeft: '1px solid #eee' }}>
            <ListGroup.Item>
              <h2>Write a Customer Review</h2>
              {userInfo ? (
                <Form onSubmit={createProductReviewHandler}>
                  <Form.Group controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control as='select' required value={rating} onChange={(e) => setRating(e.target.value)}>
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='reviewMessage'>
                    <Form.Label>Review</Form.Label>
                    <Form.Control
                      as='textarea'
                      row='3'
                      value={reviewMessage}
                      onChange={(e) => setReviewMessage(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  {/* <Button disabled={loadingProductReview} type='submit' variant='primary'> */}
                  <Button type='submit' variant='warning'>
                    Submit
                  </Button>
                  {reviewError.length > 0 && <Message>{reviewError}</Message>}
                </Form>
              ) : (
                <Message>
                  Please <Link to='/login'>sign in</Link> to write a review{' '}
                </Message>
              )}
            </ListGroup.Item>
          </Col>
        </Row>
      </>
    </>
  ) : (
    <FullPageLoader></FullPageLoader>
  );
};

export default ProductScreen;
