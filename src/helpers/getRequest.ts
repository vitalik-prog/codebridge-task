import {Path} from "../common/enums/app";
import {ApiResponse} from "../common/types/http";

export const getData = async (apiKey: string, keywords: string, pageNumber: number = 0) => {
  const pageNumberText = `&page=${pageNumber}`
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

const getRequest = async (url: string, method = 'GET', body: any = null, headers: any = {}): Promise<unknown> => {
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      const response = await fetch(url, { method, body, headers })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Something wrong')
      }

      return data
    } catch (e: any) {
      throw e
    }
  }
