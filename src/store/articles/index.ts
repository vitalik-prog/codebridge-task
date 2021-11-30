import { createSlice } from '@reduxjs/toolkit';
import { Article } from '../../common/types';
import { getArticles } from './actions';
import { DataStatus } from "../../common/enums/app";

type State = {
  dataStatus: DataStatus;
  articles: Article[] | [];
  totalArticles: number;
  keywords: string;
  pageNumber: number;
  hasMoreArticles: boolean;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
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
      state.pageNumber = action.payload.pageNumber;
      state.hasMoreArticles = action.payload.hasMoreArticles;
    });
    builder.addCase(getArticles.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

const reducer = articlesSlice.reducer;

export { reducer };
