import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../../authentication/reducers/auth.reducer';
import componentReducer from '../../core/reducers/core.reducer';

const reducers = combineReducers({
  [componentReducer.reducerPath]: componentReducer.reducer,
  [authReducer.reducerPath]: authReducer.reducer
});

export default reducers;
