import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';

import { ButtonGroup, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';

import ReactPaginate from 'react-paginate';

import { useHistory, useLocation } from 'react-router-dom';
import { getAllBooksData } from '../actions/product-actions';
import FullPageLoader from '../components/FullPageLoader';
import Message from '../components/Message';
import useUpdateEffect from '../components/useUpdateEffect';

const sortQuotes = (quotes, ascending) => {
  return quotes.slice().sort((a, b) => {
    if (ascending) {
      return b.price < a.price ? 1 : -1;
    } else {
      return b.price > a.price ? 1 : -1;
    }
  });
};

// function sortByNum(a, b, order = ASC) {
//   const diff = a.num - b.num;

//   if (order === ASC) {
//       return diff;
//   }

//   return -1 * diff;
// }

const HomeScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const prod = useSelector((state) => state.product.products);
  const error = useSelector((state) => state.product.messageProduct);
  // const [loading, setLoading] = useState(true);
  const loading = useSelector((state) => state.product.getAllBooksLoading);
  const [productList, setProductList] = useState(prod);
  const [sortLowest, setSortLowest] = useState(false);
  const [sortHighest, setSortHighest] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search');

  useEffect(() => {
    // setLoading(true);
    dispatch(getAllBooksData());
    // setLoading(false);
  }, []);
  // useEffect(() => setProductList(prod), [prod]);

  // let productList = [];

  // const { loading, error, products, pageResponse } = productList;

  useEffect(() => {
    // if (sort) {
    //   if (sort === 'lowest') {
    //   } else {

    //   }
    // } else {
    // setLoading(true);
    if (search) {
      const newProd = prod.slice().filter((items) => items.productName.includes(search));
      setProductList(newProd);
    } else {
      setProductList(prod);
      // dispatch(getAllBooksData());
      // setProductList(prod);
    }
    // setLoading(false);
    // console.log(productList);
    // }
  }, [prod, search]);

  // useUpdateEffect(() => {
  //   setLoading(true);
  //   dispatch(getAllBooksData());
  //   setProductList(prod);
  //   setLoading(false);
  // }, [prod]);

  const handlePageClick = (data) => {
    let selected = data.selected;
    // dispatch(listProductsAction(selected));
  };

  const changingSortHandler = (event) => {
    // event.preventDefault();

    const sortAsc = event.includes('Lowest');
    console.log(sortAsc);
    if (sortAsc) {
      setProductList((prev) => sortQuotes(prev, true));
      // productList = ;
      setSortLowest(true);
      setSortHighest(false);
    } else {
      setProductList((prev) => sortQuotes(prev, false));
      // productList = ;
      setSortHighest(true);
      setSortLowest(false);
    }

    // history.push({
    //   pathname: location.pathname,
    //   search: '?sort=' + (sortAsc ? 'lowest' : 'highest')
    // });
  };

  const searchHandler = (searchText) => {
    // event.preventDefault();
    const newProds = prod.slice().filter((item) => item.productName.includes(searchText));
    setProductList(newProds);
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

            {/* <Dropdown.Item eventKey='3'>Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey='4'>Separated link</Dropdown.Item> */}
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
          {/* pageResponse?.pageable?.pageNumber */}
        </>
      )}
      {loading && <FullPageLoader></FullPageLoader>}
    </>
  );
};

export default HomeScreen;
