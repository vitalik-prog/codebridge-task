import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article, AsyncThunkConfig, ApiResponse } from '../../common/types';
import { ActionType } from './common';
import { Path } from "../../common/enums/app";
import { getRequest } from "../../helpers";

const getArticles = createAsyncThunk<Article[], string, AsyncThunkConfig>(
  ActionType.ARTICLES_GET,
  async (keywords, { extra }) => {
    const response = await getRequest(`${Path.API_ARTICLES_ORIGIN_URL + keywords + Path.API_KEY}`) as ApiResponse;
    return response.articles;
  }
);

export { getArticles };
