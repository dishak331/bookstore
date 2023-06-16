import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';

import FormContainer from '../components/FormContainer';

import { userActions } from '../reducers/user-slice';
import { emailRegex, passwordRegex } from '../constants/common';
import FormInput from '../components/FormInput';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { productAction } from '../reducers/product-slice';
import { addBookData, getBookData, updateBookData } from '../actions/product-actions';
import FullPageLoader from '../components/FullPageLoader';

const AddEditBookScreen = (props) => {
  const [productName, setProductName] = useState('');
  const [image, setImage] = useState('');
  const [renderImage, setRenderImage] = useState('');
  const [price, setPrice] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [outOfStock, setOutOfStock] = useState('false');
  const [message, setMessage] = useState(null);
  const params = useParams();
  const { id } = params;
  const [loading, setLoading] = useState(id ? true : false);
  // const products = useSelector((state) => state.product.products);
  const product = useSelector((state) => state.product.productDetail);
  const msg = useSelector((state) => state.product.messageProductDetail);

  const messageUpdate = useSelector((state) => state.product.updateProductMessage);
  const messageAdd = useSelector((state) => state.product.addProductMessage);
  const success = useSelector((state) => state.product.updateSuccess);
  const history = useHistory();

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const m = useSelector((state) => state.user.messageRegister);

  //   const redirect = props.location.search ? props.location.search.substring(props.location.search.indexOf('=') + 1) : '/';

  useEffect(() => {
    setAuthor('');
    setDescription('');
    setImage('');
    setMessage(null);
    setOutOfStock('false');
    setPrice('');
    setProductName('');
  }, []);
  useEffect(() => {
    if (id) {
      setLoading(true);
      // const product = products.find((prod) => prod.productId == id);
      dispatch(getBookData(id));
      setLoading(false);
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (id) {
      if (!loading && msg.length > 0) {
        history.push('/404');
        return;
      }
      if (product.productName) {
        setDescription(product.description);
        setAuthor(product.author);
        setImage(product.imageId);
        setRenderImage(product.imageId);
        setPrice(product.price);
        setProductName(product.productName);
        setOutOfStock(product.outOfStock === 'no' ? 'false' : 'true');
      }
    }
  }, [id, msg, messageUpdate, messageAdd, product, loading]);
  //   useEffect(() => {
  //     // if (userInfo) {
  //     //   props.history.push(redirect);
  //     // }
  //   }, [props.history, userInfo, redirect, m]);

  const renderHandler = (e) => {
    e.preventDefault();
    setRenderImage(image);
  };

  const addEditHandler = async (e) => {
    setMessage(null);
    e.preventDefault();
    if (isNaN(+price)) {
      setMessage('Price cannot be anything other than a number');
      return;
    }
    if (description.length > 100) {
      setMessage('Description too long');
      return;
    }
    setLoading(true);
    if (id) {
      dispatch(
        updateBookData({
          book_id: product.productId,
          image_url: image,
          average_reviews: product.averageRating,
          total_reviews: product.noOfRatings,
          price: price,
          title: productName,
          author: author,
          out_of_stock: outOfStock === 'true' ? 'yes' : 'no',
          description: description,
          reviews: product.reviews
        })
      );
    } else {
      dispatch(
        addBookData({
          title: productName,
          author: author,
          description: description,
          image_url: image,
          price: parseInt(price),
          out_of_stock: outOfStock === 'true' ? 'yes' : 'no'
        })
      );
    }
    setLoading(false);
    // const timer = setTimeout(() => {
    //   dispatch(productAction.updateSuccessFalse());
    // }, 3000);

    if (id && messageUpdate.length === 0) {
      history.goBack();
    }

    if (!id && messageAdd.length === 0) {
      history.push('/');
    }

    // return () => clearTimeout(timer);
  };

  // const registerHandler = async (e) => {
  //   setMessage(null);
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     setMessage('Passwords do not match');
  //   } else if (!emailRegex.test(email)) {
  //     setMessage('Invalid Email');
  //   } else if (!passwordRegex.test(password)) {
  //     setMessage('Password must be more than 8 characters.\nIt must contain a number, string and special character');
  //   } else {
  //     setMessage(null);
  //     const details = {
  //       userName: userName,
  //       firstName: firstName,
  //       password: password,
  //       email: email
  //     };

  //     const login = {
  //       userName: email,
  //       password: password
  //     };
  //     dispatch(userActions.register(details));

  //     dispatch(userActions.login(login));
  //   }
  // };

  return !loading ? (
    <div>
      <FormContainer>
        <h1>{props.productName ? 'Edit Book' : 'Add New Book'}</h1>
        {message && (id ? messageUpdate.length === 0 : messageAdd.length === 0) && <Message variant='warning'>{message}</Message>}
        {id && messageUpdate.length > 0 && <Message variant='warning'>{messageUpdate}</Message>}
        {!id && messageAdd.length > 0 && <Message variant='warning'>{messageAdd}</Message>}
        {/* {message.length===0 && } */}

        <Form onSubmit={addEditHandler}>
          <Card.Img src={renderImage} variant='top' style={{ width: '80%', height: '350px' }}></Card.Img>

          <Row className='mt-3'>
            <div className='col-10'>
              <FormInput id='image' title='Image URL' placeholder='Image URL' value={image} onChange={(e) => setImage(e.target.value)} />
            </div>

            <Button onClick={renderHandler} className='btn btn-dark ml-2 mr-2 my-3 mt-3' variant='warning'>
              Render
            </Button>
          </Row>
          <FormInput
            id='productName'
            title='Book Name'
            placeholder='Book Name'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <FormInput id='author' title='Book Author' placeholder='Book Author' value={author} onChange={(e) => setAuthor(e.target.value)} />
          <FormInput id='price' title='Price' placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
          <FormInput
            id='description'
            as='textarea'
            title='Description'
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* <Form.Group controlId='password'>
            <Form.Label className='font-italic'>Out Of Stock</Form.Label>
            <Form.Control required as='select' value={outOfStock} onChange={(e) => setOutOfStock(e.target.value)}>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </Form.Control>
          </Form.Group> */}
          <Form.Group controlId='outOfStock'>
            <Form.Label className='font-italic'>Out Of Stock</Form.Label>
            <Row>
              <Form.Check
                className='col-3 ml-3'
                type='radio'
                label='Yes'
                value='true'
                onChange={(e) => setOutOfStock(e.target.value)}
                checked={outOfStock === 'true'}
              />
              <Form.Check
                className='col-3 ml-3'
                type='radio'
                label='No'
                value='false'
                onChange={(e) => setOutOfStock(e.target.value)}
                checked={outOfStock === 'false'}
              />
            </Row>

            {/* <option value='true'>Yes</option>
              <option value='false'>No</option> */}
          </Form.Group>

          <Button className='custom-btn' type='submit' variant='warning'>
            {id ? 'Edit Book' : 'Add Book'}
          </Button>
        </Form>
      </FormContainer>
    </div>
  ) : (
    <FullPageLoader></FullPageLoader>
  );
};

export default AddEditBookScreen;
