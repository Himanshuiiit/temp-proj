import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../../../authentication/reducers/auth.reducer';

const reducers = combineReducers({
  [authReducer.reducerPath]: authReducer.reducer
});

export default reducers;
