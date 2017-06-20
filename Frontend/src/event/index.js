import Immutable from 'immutable'
import axios from 'axios';
import { createAction, handleActions } from 'redux-actions';

const API_URL = process.env.NODE_ENV === 'development' 
  ? process.env.REACT_APP_INTERN_EVENTS_LOCAL_API
  : process.env.REACT_APP_INTERN_EVENTS_API;

console.log("API_URL: ", API_URL);
console.log("NODE_env: ", process.env.NODE_ENV);

const reducerMap = {};

const INITIAL_STATE = Immutable.fromJS({
  events: null
});

export const FETCH_EVENTS = 'Event/FETCH_EVENTS';
export const fetchEvents = createAction(FETCH_EVENTS);
export function fetchEventsRequest() {
  return (dispatch, getstate) => {
    return axios.get(`${API_URL}/events/`, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        dispatch(fetchEvents(response.data))
        // return response // Might be needed for testing
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
reducerMap[FETCH_EVENTS] = (state, { payload }) => {
  return state
    .set('events', Immutable.fromJS(payload))
};

// Adding Event Item
export const ADD_EVENT = 'Event/ADD_EVENT';
export const addEvent = createAction(ADD_EVENT);
export function addEventRequest(path) {
  return (dispatch, getState) => {
    return axios.post(`${API_URL}/events`, path)
      .then((res) => {
        dispatch(addEvent(res.data));
        // dispatch(reset('pantryForm'));
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          console.log(err);
        }
      });
  };
}
reducerMap[ADD_EVENT] = (state, { payload }) => {
  return state.update('events', (items) => items.push(Immutable.fromJS(payload)));
}

// Removing Event
export const REMOVE_EVENT = 'Event/REMOVE_EVENT';
export const removeEvent = createAction(REMOVE_EVENT);
export function removeEventRequest(id) {
  return (dispatch, getState) => {
    axios.delete(`${API_URL}/events/${id}`)
      .then((res) => {
        dispatch(removeEvent(id));
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          console.log(err.response);
        }
      });
  };
}
reducerMap[REMOVE_EVENT] = (state, { payload }) => {
  return state.update('events', (items) => items.filter((item) => item.get('id') !== payload));
};


export const ADD_GUEST = 'Event/ADD_GUEST';
export const addGuest = createAction(ADD_GUEST);
export function addGuestRequest(rID, guest) {
  return (dispatch, getstate) => {
    dispatch(addGuest({ rID, guest }))
    // return axios.post(`${API_URL}/events/${rID}/guests`, {
    //   headers: {'Content-Type': 'application/json'}
    // })
    //   .then((response) => {
    //     dispatch(addGuestRequest(rID, response.data))
    //     // return response // Might be needed for testing
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
}
reducerMap[ADD_GUEST] = (state, action) => {

  const { rID, guest } = action.payload;

  // Get index of the event
  const index = state.get('events').findIndex(i => i.get('id') === rID)

  // Push the new guest onto the event.
  return state.updateIn(['events', index, 'guests'], arr => arr.push(Immutable.fromJS(guest)))
}



export default handleActions(reducerMap, INITIAL_STATE);