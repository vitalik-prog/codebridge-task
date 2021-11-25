import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import {useHttp} from "../hooks";

const extraArgument = {
  useHttp
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
