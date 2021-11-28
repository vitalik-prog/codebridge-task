import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article, AsyncThunkConfig, ApiResponse } from '../../common/types';
import { ActionType } from './common';
import { Path } from "../../common/enums/app";
import { getRequest } from "../../helpers";

const getArticles = createAsyncThunk<{ articles: Article[], keywords: string, totalArticles: number }, string, AsyncThunkConfig>(
  ActionType.ARTICLES_GET,
  async (keywords, { extra }) => {

    const getData = async (apiKey: string) => {
      const keywordsQuery = keywords.split(' ').join(' AND ')
      const gatheredTitleQueryText = `qInTitle=(${keywordsQuery})`

      let response = await getRequest(`${Path.API_ARTICLES_ORIGIN_URL + gatheredTitleQueryText + apiKey}`) as ApiResponse;
      if (response.articles.length === 0) {
        const gatheredDescriptionText = `q="${gatheredTitleQueryText}"`
        response = await getRequest(`${Path.API_ARTICLES_ORIGIN_URL + gatheredDescriptionText + apiKey}`) as ApiResponse;
      }
      return response
    }

    let data = await getData(Path.API_KEY1)

    window.onerror = (message) => {
      console.log(message)
    };

    return { articles: data.articles, totalArticles: data.articles.length, keywords };
  }
);

export { getArticles };
