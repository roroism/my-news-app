import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../api/apiKey";

export const getUrl = ({ q, page }) => `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${q}&page=${page}&sort=newest&api-key=${API_KEY}`;

export const setLocalStorageMiddleware = (store) => (next) => (action) => {
  console.log("setLocalStorageMiddleware 진입", action);
}

export const fetchNewsbySearch = createAsyncThunk(
  "newsSlice/fetchNewsbySearch",
  async(searchInfo, thunkAPI) => {
    try {
      console.log("createAsyncThunk 진입");
      const res = await fetch(getUrl(searchInfo));
      const jsonData = await res.json();
      console.log("jsonData", jsonData);
      return jsonData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    loading: true,
    error: "",
  },
  reducers: {},
  extraRedecers: (builder) => {
    // builder.addCase(fetchUserById.fulfilled, (state, action) => {
    //   // Add user to the state array
    //   state.entities.push(action.payload)
    // })
  }
});

export const clipSlice = createSlice({
  name: "clippednews",
  initialState: {
    clippednews: [],
  },
  reducers: {
    clip: ({ clippednews }, action) => {
      clippednews.push(action.payload);
    },
    unclip: ({ clippednews }, action) => {
      clippednews.filter((item) => item.id !== action.id);
    },
  },
});

const initialHistoryList = [];

export const historySlice = createSlice({
  name: "history",
  initialState: initialHistoryList,
  reducers: {
    addHistory: (state, action) => {
      state.history = action.payload;
    },
    addClip: (state, action) => {
      state.clip.push(action.payload);
    },
    deleteClip: (state, action) => {
      state.clip = state.clip.filter((item) => item._id !== action.payload);
    },
    setClipInLocalStorage: (state, action) => {
      return;
    },
  },
});