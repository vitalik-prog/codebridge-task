import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const extraArgument = {

};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    });
  },
});

export { extraArgument, store };
