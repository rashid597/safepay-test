import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { typeOptions } from "@testing-library/user-event/dist/type/typeImplementation";
import { apiSlice } from "./api-slice";
import uuidReducer from './uuid-slice';

export const store = configureStore({
  reducer:{
    api: apiSlice.reducer,
    uuid: uuidReducer,
  },
  middleware: getDefaultMiddleware().concat(apiSlice.middleware),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;