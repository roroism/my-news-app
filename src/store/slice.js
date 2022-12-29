import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { current } from "@reduxjs/toolkit";

export const getUrl = ({ q, page }) =>
  // `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${q}&page=${page}&sort=newest&api-key=${API_KEY}`;
  `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=headline:("${q}")&page=${page}&sort=newest&api-key=${process.env.REACT_APP_API_KEY}`;

const SEARCH_HISTORY_KEY = "SEARCH_HISTORY";
const NEWS_CLIP_KEY = "NEWS_CLIP_KEY";

export const updateLocalStorage = createAction("updateClipLocalStorage");
export const setHistoryToLocalStorage = createAction(
  "setHistoryToLocalStorage"
);

export const setLocalStorageMiddleware = (store) => (next) => (action) => {
  console.log("Middleware 진입", action);

  if (action.type === "newsSlice/fetchNewsbySearch/fulfilled") {
    console.log("newsSlice/fetchNewsbySearch/fulfilled 진입");
    // 중복제거
    const storeHistoryList = [...store.getState().history.history];
    storeHistoryList.unshift(action.meta.arg.q);
    const updateHistoryList = [...new Set(storeHistoryList)];
    if (updateHistoryList.length >= 6) updateHistoryList.length = 5;
    console.log("storeHistoryList : ", updateHistoryList);
    store.dispatch(historySlice.actions.addHistory(updateHistoryList));
  }

  // {type: "타입이름", payload: {}}
  if (action.type === "updateClipLocalStorage") {
    console.log("updateClipLocalStorage 진입");
    try {
      const storeClipList = [...store.getState().history.clip];
      localStorage.setItem(NEWS_CLIP_KEY, JSON.stringify(storeClipList));
    } catch (e) {
      throw new Error("LocalStorage를 사용할 수 없습니다.", e);
    }
    return;
  }

  if (action.type === "setHistoryToLocalStorage") {
    console.log("setHistoryToLocalStorage 진입");
    const storeHistoryList = [...store.getState().history.history];
    console.log("storeHistoryList : ", storeHistoryList);
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
      console.log("createAsyncThunk 진입 : ", getUrl(searchInfo));
      const res = await fetch(getUrl(searchInfo));
      const jsonData = await res.json();
      // console.log("jsonData", jsonData);
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
    page: 1,
  },
  reducers: {
    setPage: (state, action) => {
      console.log("redux page : ", action.payload);
      state.page = action.payload;
      console.log("state.page : ", state.page);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewsbySearch.pending, (state, action) => {
      state.loading = true;
      // state.news = [];
      state.error = "";
    });

    builder.addCase(fetchNewsbySearch.fulfilled, (state, action) => {
      console.log("action.payload.response.docs", action.payload.response.docs);
      if (state.page === 1) {
        console.log("if state.page : ", state.page);
        state.news = action.payload.response.docs;
      } else {
        console.log("if else state.page : ", state.page);
        // console.log("old state.news", current(state));
        console.log("old state.news", state);
        state.news = [...state.news, ...action.payload.response.docs];
        console.log("new state.news", state.news);
      }
      state.loading = false;
      state.error = "";
    });

    builder.addCase(fetchNewsbySearch.rejected, (state, action) => {
      state.loading = false;
      state.news = [];
      state.error = action.payload;
    });
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
    initialState.clip = JSON.parse(localStorage.getItem(NEWS_CLIP_KEY)) || [];
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
      // localStorage.setItem(NEWS_CLIP_KEY, JSON.stringify(state.is));
    },
    deleteClip: (state, action) => {
      state.clip = state.clip.filter((item) => item._id !== action.payload);
    },
  },
});

export const { setPage } = newsSlice.actions;
export const { addClip, deleteClip } = historySlice.actions;
