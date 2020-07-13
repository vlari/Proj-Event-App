import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from '../states';

export default (state, action) => {
  switch(action.type) {
   case SET_NOTIFICATION:
     return [ ...state, action.payload ];
   case CLEAR_NOTIFICATION:
     return [];
   default:
     return state;
  } 
 }
