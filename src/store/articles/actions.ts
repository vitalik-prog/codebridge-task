import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article, AsyncThunkConfig, ApiResponse } from '../../common/types';
import { ActionType } from './common';
import { Path } from "../../common/enums/app";
import { getRequest } from "../../helpers";

const getArticles = createAsyncThunk<{ articles: Article[], keywords: string }, string, AsyncThunkConfig>(
  ActionType.ARTICLES_GET,
  async (keywords, { extra }) => {
    const keywordsQuery = keywords.split(' ').join(' AND ')
    const gatheredTitleQueryText = `qInTitle=(${keywordsQuery})`

    let response = await getRequest(`${Path.API_ARTICLES_ORIGIN_URL + gatheredTitleQueryText + Path.API_KEY}`) as ApiResponse;
    if (response.articles.length === 0) {
      const gatheredDescriptionText = `q="${gatheredTitleQueryText}"`
      response = await getRequest(`${Path.API_ARTICLES_ORIGIN_URL + gatheredDescriptionText + Path.API_KEY}`) as ApiResponse;
    }

    return { articles: response.articles, keywords };
  }
);

export { getArticles };
