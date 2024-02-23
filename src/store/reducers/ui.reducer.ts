import { createSlice } from "@reduxjs/toolkit";
import store from "../";
import { EThemeType } from "../../modules/@shared/enums/theme.enum";

const initialState = {
  theme: EThemeType.light,
};

const { actions: mutations, reducer } = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme(state, { payload }) {
      state.theme = payload;
    },
  },
});

export const uiActions = {
  setTheme: (payload: EThemeType) =>
    store.dispatch(mutations.setTheme(payload)),
};

export default reducer;
