
import { FETCH_REQUESTS, 
        UPDATE_REQUEST,
        DELETE_REQUEST,
        } from '../actions/types'

import initialState from './initialState'

export default function (state = initialState.requests, action) {
  debugger
  switch (action.type) {
    case FETCH_REQUESTS:
      return action.payload
  
    case UPDATE_REQUEST:
      return [
        ...state.filter(req => req.id != action.payload.id),
        Object.assign({}, action.payload)
      ]
    case DELETE_REQUEST:
      return [
        ...state.filter(req => req.id != action.payload.id)
      ]
  
    default:
      return state
  }
}
