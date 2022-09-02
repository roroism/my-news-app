import { configureStore } from "@reduxjs/toolkit";
import {setLocalStorageMiddleware, newsSlice, clipSlice, historySlice } from "./slice"

export const store = configureStore({
  reducer: {
    news: newsSlice.reducer,
    clippednews: clipSlice.reducer,
    history: historySlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(setLocalStorageMiddleware),
});