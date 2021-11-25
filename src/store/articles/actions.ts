import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article, AsyncThunkConfig, ApiResponse } from '../../common/types';
import { ActionType } from './common';
import { Path } from "../../common/enums/app";

const getArticles = createAsyncThunk<Article[], undefined, AsyncThunkConfig>(
  ActionType.ARTICLES_GET,
  async (_args, { extra }) => {
    const { useHttp } = extra;
    const { request } = useHttp();
    const response = await request(`${Path.API_ARTICLES_ORIGIN_URL + Path.API_KEYWORDS_TO_FIND + Path.API_KEY}`) as ApiResponse;
    console.log(response)
    return response.articles;
  }
);

export { getArticles };
