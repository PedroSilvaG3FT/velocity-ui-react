import { createSlice } from "@reduxjs/toolkit";
import store from "..";
import {
  IChatSetupModuleItem,
  IChatSetupOptionsItem,
} from "../../modules/chat/interfaces/chat-setup.interface";

const initialState = {
  ides: [] as IChatSetupOptionsItem[],
  modules: [] as IChatSetupModuleItem[],
  languages: [] as IChatSetupOptionsItem[],
  frameworks: [] as IChatSetupOptionsItem[],
};

const { actions: mutations, reducer } = createSlice({
  name: "chat-setup",
  initialState,
  reducers: {
    setIDEs(state, { payload }) {
      state.ides = payload;
    },
    setModules(state, { payload }) {
      state.modules = payload;
    },
    setLanguages(state, { payload }) {
      state.languages = payload;
    },
    setFrameworks(state, { payload }) {
      state.frameworks = payload;
    },
  },
});

export const chatSetupActions = {
  setIDEs: (payload: IChatSetupOptionsItem[]) =>
    store.dispatch(mutations.setIDEs(payload)),
  setModules: (payload: IChatSetupModuleItem[]) =>
    store.dispatch(mutations.setModules(payload)),
  setLanguages: (payload: IChatSetupOptionsItem[]) =>
    store.dispatch(mutations.setLanguages(payload)),
  setFrameworks: (payload: IChatSetupOptionsItem[]) =>
    store.dispatch(mutations.setFrameworks(payload)),
};

export default reducer;
