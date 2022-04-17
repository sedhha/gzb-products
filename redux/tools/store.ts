import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import user from '@redux-slices/user';
export function makeStore() {
  return configureStore({
    reducer: {
      user,
    },
    devTools: process.env.NODE_ENV === 'development',
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
