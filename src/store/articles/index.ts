import { createSlice } from '@reduxjs/toolkit';
import { Article } from '../../common/types';
import {getArticles, getMoreArticles, resetArticles} from './actions';
import { DataStatus } from "../../common/enums/app";

type State = {
  dataStatus: DataStatus;
  loadingMoreArticles: DataStatus;
  articles: Article[] | [];
  totalArticles: number;
  keywords: string;
  pageNumber: number;
  hasMoreArticles: boolean;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  loadingMoreArticles: DataStatus.IDLE,
  articles: [],
  totalArticles: 0,
  keywords: '',
  pageNumber: 0,
  hasMoreArticles: true,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticles.pending, (state, action) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getArticles.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.articles = action.payload.articles;
      state.totalArticles = action.payload.totalArticles;
      state.keywords = action.payload.keywords;
      state.hasMoreArticles = action.payload.hasMoreArticles;
    });
    builder.addCase(getArticles.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addCase(getMoreArticles.pending, (state, action) => {
      state.loadingMoreArticles = DataStatus.PENDING;
    });
    builder.addCase(getMoreArticles.fulfilled, (state, action) => {
      state.loadingMoreArticles = DataStatus.FULFILLED;
      state.articles = action.payload.articles;
      state.hasMoreArticles = action.payload.hasMoreArticles;
      state.pageNumber = action.payload.pageNumber;
    });
    builder.addCase(getMoreArticles.rejected, (state) => {
      state.loadingMoreArticles = DataStatus.REJECTED;
    });
    builder.addCase(resetArticles, (state) => {
      state.articles = [];
    });
  },
});

const reducer = articlesSlice.reducer;

export { reducer };
