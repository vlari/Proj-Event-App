import {
  GET_EVENTS,
  GET_EVENT,
  EVENT_ERROR,
} from '../states';

export default (state, action) => {
  switch(action.type) {
    case GET_EVENTS:
      const response = action.payload.response;
      return {
        ...state,
        events: response.data,
        paging: response.pagination,
        filter: action.payload.filter,
        textFilter: action.payload.textFilter
      };
    case GET_EVENT:
      return {
        ...state,
        event: action.payload.data
      };
    case EVENT_ERROR:
      return {
        ...state,
        event: action.payload
      };
    default:
      return state;
  }
};
