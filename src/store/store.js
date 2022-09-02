import { configureStore } from "@reduxjs/toolkit";
import {setLocalStorageMiddleware } from "./slice"

export const store = configureStore({
  reducer: {
    // news,
    // clippednews,
    // history,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(setLocalStorageMiddleware),
});