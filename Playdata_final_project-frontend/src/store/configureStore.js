import { configureStore } from "@reduxjs/toolkit";
import { userReducers } from "../_reducers/user";

const store = configureStore({
  reducer: { userReducers },
});

export default store;
