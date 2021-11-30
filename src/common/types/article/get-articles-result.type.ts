import {Article} from "./article.type";

type GetArticlesResult = {
  articles: Article[],
  keywords: string,
  totalArticles: number,
  pageNumber: number,
  hasMoreArticles: boolean
}

export type { GetArticlesResult }
