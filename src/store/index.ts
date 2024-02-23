import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import reducers from "./reducers";
import storage from "./storage";

const store = configureStore({
  reducer: persistReducer({ key: "root", storage }, reducers),
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export default store;
export type RootState = ReturnType<typeof reducers>;
