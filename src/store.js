import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer } from './features/auth/authSlice';
import { questionReducer } from './features/questions/questionSlice';
import { userReducer } from './features/user/usersSlice';

const rootReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  questions: questionReducer,
});

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
