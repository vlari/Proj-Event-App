import React, { useReducer } from 'react';
import orderReducer from './orderReducer';
import OrderContext from './orderContext';
import axios from 'axios';
import {
  GET_ORDERS,
  GET_ORDER,
  PLACE_ORDER,
  ORDER_ERROR
} from '../states';

const OrderProvider = props => {

  const initialState = {
    orders: [],
    selectedOrder: null,
    newOrder: null,
    error: null
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Get orders
  const getOrders = async () => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      };

      const response = await axios.get('/api/v1/orders', config);

      dispatch({
        type: GET_ORDERS,
        payload: response.data.data
      });
    } catch (error) {
      dispatch({
        type: ORDER_ERROR,
        payload: error
      });
    }
  }

  // Get order
  const getOrder = async (id) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      };

      const response = await axios.get(`/api/v1/orders/${id}`, config);

      dispatch({
        type: GET_ORDER,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: ORDER_ERROR,
        payload: error
      });
    }
  }

  // Place order
  const placeOrder = async (order) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      };

      const response = await axios.post('/api/v1/orders', order, config);

      dispatch({
        type: PLACE_ORDER,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: ORDER_ERROR,
        payload: error
      });
    }
  }

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        selectedOrder: state.selectedOrder,
        newOrder: state.newOrder,
        error: state.error,
        getOrders,
        getOrder,
        placeOrder
      }}>
      { props.children }
    </OrderContext.Provider>
  )
};

export default OrderProvider;
