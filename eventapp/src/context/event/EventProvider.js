import React, { useReducer } from 'react';
import eventReducer from './eventReducer';
import EventContext from './eventContext';
import axios from 'axios';
import {
  GET_EVENTS,
  EVENT_ERROR,
  GET_EVENT,
  GET_FAVORITE_LIST
} from '../states';

const EventProvider = props => {
  const initialState = {
    events: [],
    event: null,
    filteredEvents: null,
    paging: null,
    filter: {},
    error: null
  };

  const [state, dispatch] = useReducer(eventReducer, initialState);

  // Get events
  const getEvents = async (filter = {}) => {
    try {
      let config = {}

      let query = {};
      if (filter) {
        query = { ...filter };
        filter = '';
        for (const key in query) {
          filter += `&${key}=${query[key]}`;
        }
        
        filter = `?${filter.slice(1)}`;
      }

      const token = localStorage.getItem('userToken');
      if (token) {
        config.headers = {
            'Authorization': `Bearer ${token}`
        };
      }
      
      const response = await axios.get(`/api/v1/events${filter}`, config);
      filter = { ...query };
      const eventPayload = {
        response: response.data,
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

  const getEvent = async (id) => {
    try {
      const response = await axios.get(`/api/v1/events/${id}`); 
      
      dispatch({
        type: GET_EVENT,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: EVENT_ERROR,
        payload: error
      });
    }
  };

  // Get favorite events
  const getFavoriteEvents = async (eventId) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      };

      const response = await axios.get('/api/v1/user/collections', config); 
      
      const filter = { };
      const eventPayload = {
        response: response.data,
        filter
      };

      dispatch({
        type: GET_FAVORITE_LIST,
        payload: eventPayload
      });
    } catch (error) {
      dispatch({
        type: EVENT_ERROR,
        payload: error
      });
    }
  };

  // Add favorite event
  const addEvent = async (eventId) => {
    try {
      await axios.put(`/api/v1/user/collections/${eventId}`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      }); 
      
    } catch (error) {
      dispatch({
        type: EVENT_ERROR,
        payload: error
      });
    }
  };

  // Add favorite Event
  const deleteEvent = async (eventId) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      };

      await axios.delete(`/api/v1/user/collections/${eventId}`,config); 
      
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
        filteredEvents: state.filteredEvents,
        paging: state.paging,
        filter: state.filter,
        event: state.event,
        getEvents,
        getEvent,
        addEvent,
        deleteEvent,
        getFavoriteEvents
      }}>
        { props.children }
    </EventContext.Provider>
  );

};

export default EventProvider;
