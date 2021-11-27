type Article = {
  author: string,
  content: string,
  description: string | null,
  publishedAt: string,
  title: string,
  url: string,
  urlToImage: string | null,
  source: {
    id: string,
    name: string
  }
}

export type { Article };
