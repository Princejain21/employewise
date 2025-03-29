import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";

const RootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
