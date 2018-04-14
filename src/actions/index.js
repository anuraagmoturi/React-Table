import { 
  FETCH_REQUESTS, 
  UPDATE_REQUEST,
  DELETE_REQUEST

  } from './types'
import { getRequests } from '../Api';

export const fetch_requests = () =>
  async dispatch => {
    const res = await getRequests();

    dispatch({ type: FETCH_REQUESTS, payload: res });
  };



 export const update_request = (req) =>
   dispatch => {
     dispatch({
       type: UPDATE_REQUEST, payload: req
     })
   }
  
 export const delete_request = (req) =>
   dispatch => {
     dispatch({
       type: DELETE_REQUEST, payload: req
     })
   }
  

