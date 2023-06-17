import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { ButtonGroup, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { getAllBooksData } from '../actions/product-actions';
import FullPageLoader from '../components/FullPageLoader';
import Message from '../components/Message';

const sortQuotes = (quotes, ascending) => {
  return quotes.slice().sort((a, b) => {
    if (ascending) {
      return b.price < a.price ? 1 : -1;
    } else {
      return b.price > a.price ? 1 : -1;
    }
  });
};

const HomeScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const prod = useSelector((state) => state.product.products);
  const error = useSelector((state) => state.product.messageProduct);
  const loading = useSelector((state) => state.product.getAllBooksLoading);
  const [productList, setProductList] = useState(prod);
  const [sortLowest, setSortLowest] = useState(false);
  const [sortHighest, setSortHighest] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search');

  useEffect(() => {
    dispatch(getAllBooksData());
  }, [dispatch]);

  useEffect(() => {
    if (search) {
      const newProd = prod.slice().filter((items) => items.productName.includes(search));
      setProductList(newProd);
    } else {
      setProductList(prod);
    }
  }, [prod, search]);

  const changingSortHandler = (event) => {
    const sortAsc = event.includes('Lowest');
    console.log(sortAsc);
    if (sortAsc) {
      setProductList((prev) => sortQuotes(prev, true));
      setSortLowest(true);
      setSortHighest(false);
    } else {
      setProductList((prev) => sortQuotes(prev, false));
      setSortHighest(true);
      setSortLowest(false);
    }
  };
  return (
    <>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col></Col>
        <Col className='col-lg-2 col-md-3'>
          <DropdownButton
            onSelect={changingSortHandler}
            className='p-2'
            as={ButtonGroup}
            id='sort-button'
            size='md'
            variant='warning'
            title='sort'
          >
            <Dropdown.Item eventKey='Highest' active={sortHighest}>
              Highest Price
            </Dropdown.Item>

            <Dropdown.Item eventKey='Lowest' active={sortLowest}>
              Lowest Price
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>

      {error.length > 0 ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {productList.map((product) => (
              <Col key={product.productId} sm={12} md={6} lg={4} xl={3}>
                <Product key={product.productId} product={product}></Product>
              </Col>
            ))}
          </Row>
        </>
      )}
      {loading && <FullPageLoader></FullPageLoader>}
    </>
  );
};

export default HomeScreen;
