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

  const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    }
  };

  // Get orders
  const getOrders = () => {
    try {
      const response = axios.get('/api/v1/orders', config);

      dispatch({
        type: GET_ORDERS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: ORDER_ERROR,
        payload: response.data
      });
    }
  }

  // Get order
  const getOrder = (id) => {
    try {
      const response = axios.get(`/api/v1/order/${id}`, config);

      dispatch({
        type: GET_ORDER,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: ORDER_ERROR,
        payload: response.data
      });
    }
  }

  // Place order
  const placeOrder = (order) => {
    try {
      const response = axios.post(`/api/v1/order/${id}`, order, config);

      dispatch({
        type: PLACE_ORDER,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: ORDER_ERROR,
        payload: response.data
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
