import React, { useReducer } from 'react';
import eventReducer from './eventReducer';
import EventContext from './eventContext';
import axios from 'axios';
import {
  GET_EVENTS,
  EVENT_ERROR
} from '../states';

const EventProvider = props => {
  const initialState = {
    events: [],
    pagination: null,
    filter: '',
    error: null
  };

  const [state, dispatch] = useReducer(eventReducer, initialState);

  // Get events
  const getEvents = async (filter = '') => {
    try {

      if (filter) {
        let query = { ...filter };
        filter = '';
        for (const key in query) {
          filter += `&${key}=${query[key]}`;
        }

        filter = `?${filter.slice(1)}`;
      }

      const response = await axios.get(`/api/v1/events${filter}`);

      const eventPayload = {
        data: response.data.data,
        pagination: response.data.pagination,
        filter
      };

      dispatch({
        type: GET_EVENTS,
        payload: eventPayload 
      });
    } catch (error) {
      dispatch({
        type: EVENT_ERROR,
        payload: error
      });
    }
  };

  return (
    <EventContext.Provider
      value={{
        events: state.events,
        pagination: state.pagination,
        filter: state.filter,
        getEvents
      }}>
        { props.children }
    </EventContext.Provider>
  );

};

export default EventProvider;
