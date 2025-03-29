import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./RootReducer";

export const Store = configureStore({
  reducer: RootReducer,
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;
