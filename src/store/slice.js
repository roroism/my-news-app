import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../api/apiKey";

export const getUrl = ({ q, page }) =>
  `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${q}&page=${page}&sort=newest&api-key=${API_KEY}`;

const SEARCH_HISTORY_KEY = "SEARCH_HISTORY";
const CLIP_KEY = "CLIP_HISTORY";

export const setHistoryToLocalStorage = createAction(
  "setHistoryToLocalStorage"
);

export const setLocalStorageMiddleware = (store) => (next) => (action) => {
  console.log("Middleware 진입", action);

  if (action === "newsSlice/fetchNewsbySearch/fulfilled") {
    console.log("newsSlice/fetchNewsbySearch/fulfilled 진입");
  }

  if (action.type === "setHistoryToLocalStorage") {
    console.log("setHistoryToLocalStorage 진입");
    const storeHistoryList = [...store.getState().history.history];

    try {
      localStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(storeHistoryList)
      );
    } catch (e) {
      throw new Error("LocalStorage를 사용할 수 없습니다.", e);
    }
    return;
  }

  return next(action);
};

export const fetchNewsbySearch = createAsyncThunk(
  "newsSlice/fetchNewsbySearch",
  async (searchInfo, thunkAPI) => {
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
  },
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

const initialHistoryList = (() => {
  let initialState = { history: [], clip: [] };
  // console.log("history initialState");
  try {
    initialState.history =
      JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY)) || [];
    initialState.clip = JSON.parse(localStorage.getItem(CLIP_KEY)) || [];
  } catch (e) {
    // error
    throw new Error("LocalStorage를 사용할 수 없습니다.", e);
  } finally {
    return initialState;
  }
})();

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
  },
});
