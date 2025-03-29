import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {LOGIN_BY_EMAIL} from '@env';
interface User {
  email?:string,
  token?:any;
  [str:string]:any
}

export interface UserState {
  accessToken: string;
  user: User;
  privileges: string[];
  loginState: boolean;
}

const initialState: UserState = {
  accessToken: '',
  user: {},
  privileges: [],
  loginState: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setPrivileges: (state, action: PayloadAction<string[]>) => {
      state.privileges = action.payload;
    },
    setLoginState: (state,action:PayloadAction<Boolean>) => {
      state.loginState = !state.loginState;
    }
  },
});

export const { setAccessToken, setUser, setPrivileges, setLoginState,} = userSlice.actions;

export default userSlice.reducer;
