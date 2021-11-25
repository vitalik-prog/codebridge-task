import { Article } from "../article";

type ApiResponse = {
  articles: Article[],
  status: string,
  totalResults: number
}

export type { ApiResponse };
