import {Article} from "./article.type";

type GetMoreArticlesResult = {
  articles: Article[],
  pageNumber: number,
  hasMoreArticles: boolean
}

export type { GetMoreArticlesResult }
