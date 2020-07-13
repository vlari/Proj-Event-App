import React, { useReducer } from 'react';
import NotificationContext from './notificationContext';
import notificationReducer from './notificationReducer';
import {v4 as uuidv4} from 'uuid';
import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from '../states';

const NotificationProvider = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const setNotification = (msg, type) => {
    const id = uuidv4();
    dispatch({
      type: SET_NOTIFICATION,
      payload: { msg, type, id }
    })
  };
  
  const clearNotifications = () => {
    state.length = 0;
    dispatch({
      type: CLEAR_NOTIFICATION,
      payload: state
    })
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications: state,
        setNotification,
        clearNotifications
      }}>
        {props.children}
    </NotificationContext.Provider>
  );

};

export default NotificationProvider;


