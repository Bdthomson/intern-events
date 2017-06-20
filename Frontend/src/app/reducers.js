import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import event from '../event';

const rootReducer = combineReducers({
  form,
  event
});

export default rootReducer;