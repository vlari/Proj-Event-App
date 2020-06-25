import {
  GET_ORDER,
  PLACE_ORDER,
  ORDER_ERROR,
  GET_ORDERS
} from '../states';

export default (state, action) => {
  switch (action.type) {
    case GET_ORDERS:
        return {
          ...state,
          orders: action.payload
        };     
      break;
    case GET_ORDER:
        return {
          ...state,
          order: action.payload
        };     
      break;
    case PLACE_ORDER:
        return {
          ...state,
          newOrder: action.payload
        };     
      break;
    case ORDER_ERROR:
        return {
          ...state,
          error: action.payload
        };     
      break;
    default:
      return state;
  }
};
