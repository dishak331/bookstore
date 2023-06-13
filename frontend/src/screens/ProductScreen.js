import React, { useEffect, useState } from 'react';

import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Message from '../components/Message';
import Rating from '../components/Rating';

import { productAction } from '../reducers/product-slice';
import { cartActions } from '../reducers/cart-slice';
import { userDetails } from '../reducers/user-slice';
import { history } from '../App';

const ProductScreen = (props) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState('');
  const [productimageBase64, setProductimageBase64] = useState(null);
  // const [product, setProduct] = useState({});
  // let product = {};
  const params = useParams();
  const { id } = params;

  // console.log(1 == '1');

  const dispatch = useDispatch();
  // const product = useSelector((state) => state.productDetails.product);
  const products = useSelector((state) => state.product.products);
  const cart = useSelector((state) => state.cart.cartItems);
  const admin = useSelector((state) => state.user.isAdmin);
  // const reviews = useSelector((state) => state.productReviews.reviews)[id];
  // console.log(reviews);

  // const reviews = rev[id];
  // const { loading, error } = productDetails;

  // const productReviews = useSelector((state) => state.productReviews);
  // const { loading: loadingProductReviews, error: errorProductReviews, reviews } = productReviews;
  // const reviews = [];

  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;
  // const [product, setProduct] = useState(null);
  const product = products.find((p) => p.productId == id);
  if (!product) {
    return (
      <div className='text-center'>
        <Message>No Product Found</Message>
      </div>
    );
  }
  // const [reviews, setReviews] = useState([]);
  // let imageId = product.imageId;
  let reviews = [];
  if (product) {
    reviews = product.reviews;
  }
  console.log(rating);
  // const productReviewCreate = useSelector((state) => state.productReviewCreate);
  // const { success: successProductReview, loading: loadingProductReview, error: errorProductReview } = productReviewCreate;

  useEffect(() => {
    // console.log(product);
    // console.log('jrhv');
    // if (!prod) {
    //   return;
    // }
    // setProduct(prod);
    // setReviews(product.reviews);
    // console.log('////');
    // reviews = product.reviews;
    // console.log(reviews);
    // dispatch({
    //   type: PRODUCT_REVIEWS_SUCCESS,
    //   payload: prod.reviews
    // });
    // setProductimageBase64(null);
    // dispatch(listProductDetailsAction(props.match.params.id));
    // await getProductDetailApi(props.match.params.id).then((r) => {
    // const prod = products.find((prod) => prod.productId === id);
    // console.log(id);
    // console.log(prod);
    // // reviews = product.reviews;
    // setProduct(prod);
    // });
    // dispatch(listProductReviewsAction(props.match.params.id));
    // if (product?.imageId) {
    // await getImageApi(product?.imageId).then((r) => {
    //   setProductimageBase64(r);
    // });
    // }
  }, []);
  const inCart = cart.find((prod) => prod.productId == id);
  // console.log(product);

  const addToCartHandler = () => {
    // props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
    dispatch(
      cartActions.addToCart({
        productId: id,
        productName: product.productName,
        itemPrice: product.price,
        extendedPrice: 0,
        quantity: qty
      })
    );
    // props.history.push('/cart')
  };

  const createProductReviewHandler = (e) => {
    e.preventDefault();
    const newReview = {
      username: userDetails.firstName + ' ' + userDetails.lastName,
      reviewMessage: reviewMessage,
      ratingValue: rating,
      reviewId: Math.random().toString()
    };
    dispatch(
      productAction.createReview({
        id: id,
        newReview: newReview
      })
    );
  };

  return (
    <>
      <Row>
        <Link className='btn btn-dark my-3' to={'..'}>
          Go Back
        </Link>
        {admin && (
          <Link to={`/admin/editBook/${product.productId}`}>
            <Button onClick={() => {}} className='btn my-3 ml-3' variant='warning' type='button'>
              Edit Book
            </Button>
          </Link>
        )}
      </Row>

      {/* {error ? (
        <Message variant='danger'></Message>
      ) : product ? 
      ( */}
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
                    <Col>{product.availableItemCount > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroupItem>

                {product.availableItemCount > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                          {product.availableItemCount > 10
                            ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))
                            : [...Array(product.availableItemCount).keys()].map((x) => (
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
                      disabled={product.availableItemCount <= 0}
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
            {{ reviews }?.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant='flush'>
              {reviews?.map((review) => (
                <ListGroup.Item key={review.reviewId}>
                  <strong>{review.username}</strong>
                  <Rating value={review.ratingValue} />
                  {/* <p>{review.created_at.substring(0, 10)}</p> */}
                  <p>{review.reviewMessage}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={6} style={{ borderLeft: '1px solid #eee' }}>
            <ListGroup.Item>
              <h2>Write a Customer Review</h2>
              {/* {successProductReview && <Message variant='success'>Review submitted successfully</Message>}
              {loadingProductReview && <Loader />}
              {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>} */}
              {userInfo ? (
                <Form onSubmit={createProductReviewHandler}>
                  <Form.Group controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
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
      {/* ) : null} */}
      {/* {loading && <FullPageLoader></FullPageLoader>} */}
    </>
  );
};

export default ProductScreen;
