import {
  GET_EVENTS,
  EVENT_ERROR
} from '../states';

export default (state, action) => {
  switch(action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload
      };
    case EVENT_ERROR:
      console.log(action.payload);
      return {
        ...state,
        events: action.payload,
        pagination: action.payload.pagination,
        filter: action.payload.filter
      };
    default:
      return state;
  }
};
