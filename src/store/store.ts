import { configureStore } from "@reduxjs/toolkit";
import { dataSlice } from "./dataSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
