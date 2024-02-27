import { AuthenticationResult } from "@azure/msal-browser";
import { createSlice } from "@reduxjs/toolkit";
import store from "..";
import { IUserData } from "../../modules/@shared/interfaces/user.interface";

const initialState = {
  token: ``,
  tokenType: ``,
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
    reset(state) {
      state.token = "";
      state.tokenType = "";
      state.userData = {} as IUserData;
      state.microsoftUser = {} as AuthenticationResult;
    },
  },
});

export const authActions = {
  reset: () => store.dispatch(mutations.reset()),
  setToken: (payload: string) => store.dispatch(mutations.setToken(payload)),
  setTokenType: (payload: string) =>
    store.dispatch(mutations.setTokenType(payload)),
  setUserData: (payload: IUserData) =>
    store.dispatch(mutations.setUserData(payload)),
  setMicrosoftUser: (payload: AuthenticationResult) =>
    store.dispatch(mutations.setMicrosoftUser(payload)),
};

export default reducer;
