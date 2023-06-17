import { history } from '../App';
import { headers } from '../constants/headers';
import { cartActions } from '../reducers/cart-slice';
import { orderActions } from '../reducers/order-slice';

const orderURL = 'http://localhost:9004/orders';

export const createCartData = (data, props) => {
  return async (dispatch) => {
    try {
      console.log(JSON.stringify(data));
      const response = await fetch(orderURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });
      const body = await response.json();
      console.log(body);
      if (!response.ok) {
        dispatch(orderActions.setCartMessage({ message: 'Bad Request: Order ID does not exist' }));
      } else {
        dispatch(orderActions.setCartMessage({ message: '' }));
        dispatch(cartActions.clearCart());
        props.history.push(`/order/${body.order_id}`);
        console.log(body.order_id);
      }
    } catch (error) {
      console.log('error occured');

      dispatch(orderActions.setCartMessage({ message: 'Server error: Try again later' }));
    }
  };
};

export const getOrderByIdData = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${orderURL}/${id}`, {
        method: 'GET',
        headers: headers
      });
      const body = await response.json();
      console.log(body);
      if (!response.ok) {
        dispatch(orderActions.setOrderMessage({ message: 'Some error occured' }));
      } else {
        dispatch(orderActions.setOrderMessage({ message: '' }));
        const orderItems = [];
        body.order_details.map((product) => {
          orderItems.push({
            productId: product.book_id,
            productName: product.book_name,
            itemPrice: product.book_price,
            imageId: product.book_image,
            outOfStock: product.book_outOfStock,
            extendedPrice: product.subtotal,
            quantity: product.book_qty
          });
        });
        dispatch(
          orderActions.addOrderDetail({
            details: {
              orderId: body.order_id,
              shippingAddress: body,
              orderItems: orderItems,
              paid: true,

              deliveredAt: JSON.stringify(body.shipping_date).slice(1, 11).split('-').reverse().join('/'),
              paymentDate: JSON.stringify(body.shipping_date).slice(1, 11).split('-').reverse().join('/'),
              total: body.total,
              created_at: JSON.stringify(body.order_date).slice(1, 11).split('-').reverse().join('/'),
              isDelivered: true
            }
          })
        );
      }
    } catch (error) {
      console.log('error occured');
      dispatch(orderActions.setOrderMessage({ message: 'Server error: Try again later' }));
    }
  };
};

export const getOrdersByUserId = (id) => {
  return async (dispatch) => {
    try {
      dispatch(orderActions.setLoading({ loading: true }));

      const response = await fetch(`${orderURL}/users/${id}`, {
        method: 'GET',
        headers: headers
      });
      const body = await response.json();
      console.log(body);
      if (!response.ok) {
        dispatch(orderActions.setOrderMessage({ message: 'Some error occured' }));
      } else {
        dispatch(orderActions.setOrderMessage({ message: '' }));
        const orders = [];
        body.map((order) => {
          const orderItems = [];
          order.order_details.map((product) => {
            orderItems.push({
              productId: product.book_id,
              productName: product.book_name,
              itemPrice: product.book_price,
              imageId: product.book_image,
              outOfStock: product.book_outOfStock,
              extendedPrice: product.subtotal,
              quantity: product.book_qty
            });
          });

          orders.push({
            orderId: order.order_id,
            userId: order.user_id,
            shippingAddress: order,
            orderItems: orderItems,
            paid: true,

            deliveredAt: JSON.stringify(order.shipping_date).slice(1, 11).split('-').reverse().join('/'),
            paymentDate: JSON.stringify(order.order_date).slice(1, 11).split('-').reverse().join('/'),
            total: order.total,

            created_at: JSON.stringify(order.order_date).slice(1, 11).split('-').reverse().join('/'),
            isDelivered: true
          });
        });

        dispatch(
          orderActions.addOrders({
            orders: orders
          })
        );
      }
      dispatch(orderActions.setLoading({ loading: false }));
    } catch (error) {
      console.log('error occured');
      dispatch(orderActions.setLoading({ loading: false }));
      dispatch(orderActions.setOrderMessage({ message: 'Server error: Try again later' }));
    }
  };
};

export const getAllOrdersData = () => {
  return async (dispatch) => {
    // try {
    dispatch(orderActions.setLoading({ loading: true }));

    const response = await fetch(orderURL, {
      method: 'GET',
      headers: headers
    });
    const body = await response.json();
    console.log(body);
    if (!response.ok) {
      dispatch(orderActions.setOrderMessage({ message: 'Some error occured' }));
    } else {
      dispatch(orderActions.setOrderMessage({ message: '' }));
      const orders = [];
      body.map((order) => {
        const orderItems = [];
        order.order_details.map((product) => {
          orderItems.push({
            productId: product.book_id,
            productName: product.book_name,
            itemPrice: product.book_price,
            imageId: product.book_image,
            outOfStock: product.book_outOfStock,
            extendedPrice: product.subtotal,
            quantity: product.book_qty
          });
        });

        orders.push({
          orderId: order.order_id,
          userId: order.user_id,
          shippingAddress: order,
          orderItems: orderItems,
          paid: true,

          deliveredAt: JSON.stringify(order.shipping_date).slice(1, 11).split('-').reverse().join('/'),
          paymentDate: JSON.stringify(order.order_date).slice(1, 11).split('-').reverse().join('/'),
          total: order.total,

          created_at: JSON.stringify(order.order_date).slice(1, 11).split('-').reverse().join('/'),
          isDelivered: true
        });
      });

      dispatch(
        orderActions.addOrders({
          orders: orders
        })
      );
    }
    dispatch(orderActions.setLoading({ loading: false }));
    // } catch (error) {
    //   console.log('error occured');
    //   dispatch(orderActions.setLoading({ loading: false }));
    //   dispatch(orderActions.setOrderMessage({ message: 'Server error: Try again later' }));
    // }
  };
};
