import { useDispatch } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import summonerReducer from 'lib/slice/summonerSlice';
import { createLogger } from 'redux-logger';

import * as reducers from 'lib/slice';

// 만들어 놓은 리듀서들을 합친다.
const reducer = combineReducers(reducers);

// React에서 사용할 수 있도록 타입을 만들어 export 해준다.
export type ReducerType = ReturnType<typeof reducer>;

const middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware.push(
    createLogger({
      duration: true,
      collapsed: true,
    }),
  );
}

const store = configureStore({
  reducer,
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
