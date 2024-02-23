import { IUserData } from "@/modules/@shared/interfaces/user.interface";
import { AuthenticationResult } from "@azure/msal-browser";
import { createSlice } from "@reduxjs/toolkit";
import store from "..";

const initialState = {
  token: "",
  tokenType: "",
  userData: {} as IUserData,
  microsoftUser: {} as AuthenticationResult,
};

const { actions: mutations, reducer } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, { payload }) {
      state.token = payload;
    },
    setTokenType(state, { payload }) {
      state.tokenType = payload;
    },
    setUserData(state, { payload }) {
      state.userData = payload;
    },
    setMicrosoftUser(state, { payload }) {
      state.microsoftUser = payload;
    },
  },
});

export const authActions = {
  setToken: (payload: string) => store.dispatch(mutations.setToken(payload)),
  setTokenType: (payload: string) =>
    store.dispatch(mutations.setTokenType(payload)),
  setUserData: (payload: IUserData) =>
    store.dispatch(mutations.setUserData(payload)),
  setMicrosoftUser: (payload: AuthenticationResult) =>
    store.dispatch(mutations.setMicrosoftUser(payload)),
};

export default reducer;
