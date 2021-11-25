import { createSlice } from '@reduxjs/toolkit';
import { Article } from '../../common/types';
import { getArticles } from './actions';
import { DataStatus } from "../../common/enums/app";

type State = {
  dataStatus: DataStatus;
  articles: Article[] | [];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  articles: [],
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticles.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getArticles.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.articles = action.payload;
    });
    builder.addCase(getArticles.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

const reducer = articlesSlice.reducer;

export { reducer };
