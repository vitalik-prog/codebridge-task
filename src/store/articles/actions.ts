import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, ApiResponse, GetArticlesPayload, GetArticlesResult } from '../../common/types';
import { ActionType } from './common';
import { Path } from "../../common/enums/app";
import { getRequest } from "../../helpers";

const getArticles = createAsyncThunk<GetArticlesResult, GetArticlesPayload, AsyncThunkConfig>(
  ActionType.ARTICLES_GET,
  async (payload, { getState }) => {
    const { keywords, pageNumber} = payload
    const pageNumberText = `&page=${pageNumber}`
    const articles = getState().articles.articles
    const prevPageNumber = getState().articles.pageNumber

    const getData = async (apiKey: string) => {
      if (!keywords.trim()) {
        const response = await getRequest(`${Path.API_ARTICLES_ORIGIN_URL + pageNumberText + apiKey}`) as ApiResponse;
        return response
      }

      const keywordsQuery = keywords.trim().split(' ').map(keyword => '"' + keyword + '"').join(' AND ')
      const gatheredTitleQueryText = `&fq=headline:(${keywordsQuery})`
      let response = await getRequest(`${Path.API_ARTICLES_ORIGIN_URL + pageNumberText + gatheredTitleQueryText + apiKey}`) as ApiResponse;
      if (response.response.docs.length < 10) {
        const gatheredDescriptionText = `&q=(${keywordsQuery})`
        response = await getRequest(`${Path.API_ARTICLES_ORIGIN_URL+ pageNumberText + gatheredDescriptionText + apiKey}`) as ApiResponse;
      }
      return response
    }

    let data = await getData(Path.API_KEY1)
    const newArticles = pageNumber !== prevPageNumber
      ? [...articles, ...data.response.docs]
      : data.response.docs
    const hasMoreArticles = newArticles.length < data.response.meta.hits

    return {
      articles: newArticles,
      totalArticles: data.response.meta.hits,
      keywords,
      pageNumber,
      hasMoreArticles
    };
  }
);

export { getArticles };
