import { createSlice } from "@reduxjs/toolkit";
import store from "../";

const initialState = {
  selectedIdeId: 0,
  selectedModuleId: 0,
  selectedSubjectId: 0,
  selectedLanguageId: 0,
  selectedSubmoduleId: 0,
  selectedFrameworkId: 0,
};

const { actions: mutations, reducer } = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIdeId(state, { payload }) {
      state.selectedIdeId = payload;
    },
    setModuleId(state, { payload }) {
      state.selectedModuleId = payload;
    },
    setSubjectId(state, { payload }) {
      state.selectedSubjectId = payload;
    },
    setLanguageId(state, { payload }) {
      state.selectedLanguageId = payload;
    },
    setSubmoduleId(state, { payload }) {
      state.selectedSubmoduleId = payload;
    },
    setFrameworkId(state, { payload }) {
      state.selectedFrameworkId = payload;
    },
  },
});

export const chatActions = {
  setIdeId: (payload: number) => store.dispatch(mutations.setIdeId(payload)),
  setModuleId: (payload: number) =>
    store.dispatch(mutations.setModuleId(payload)),
  setSubjectId: (payload: number) =>
    store.dispatch(mutations.setSubjectId(payload)),
  setLanguageId: (payload: number) =>
    store.dispatch(mutations.setLanguageId(payload)),
  setSubmoduleId: (payload: number) =>
    store.dispatch(mutations.setSubmoduleId(payload)),
  setFrameworkId: (payload: number) =>
    store.dispatch(mutations.setFrameworkId(payload)),
};

export default reducer;
