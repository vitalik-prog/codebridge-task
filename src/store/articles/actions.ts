import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  GetArticlesPayload,
  GetArticlesResult,
  GetMoreArticlesResult
} from '../../common/types';
import { ActionType } from './common';
import { Path } from "../../common/enums/app";
import { getData } from "../../helpers";

const getArticles = createAsyncThunk<GetArticlesResult, GetArticlesPayload, AsyncThunkConfig>(
  ActionType.ARTICLES_GET,
  async (payload, { extra }) => {
    const { keywords } = payload

    let data = await getData(Path.API_KEY1, keywords)
    const newArticles = data.response.docs
    const hasMoreArticles = newArticles.length < data.response.meta.hits

    return {
      articles: newArticles,
      totalArticles: data.response.meta.hits,
      keywords,
      hasMoreArticles
    };
  }
);

const getMoreArticles = createAsyncThunk<GetMoreArticlesResult, undefined, AsyncThunkConfig>(
  ActionType.ARTICLES_GET_MORE,
  async (_args, { getState }) => {

    const articles = getState().articles.articles
    const keywords = getState().articles.keywords
    const pageNumber = getState().articles.pageNumber + 1

    let data = await getData(Path.API_KEY1, keywords, pageNumber)
    const newArticles = [...articles, ...data.response.docs]
    const hasMoreArticles = newArticles.length < data.response.meta.hits

    return {
      articles: newArticles,
      pageNumber,
      hasMoreArticles
    };
  }
);

const resetArticles = createAction(ActionType.RESET_ARTICLES);

export { getArticles, resetArticles, getMoreArticles };
