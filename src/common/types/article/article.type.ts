type Multimedia = {
  rank: number,
  subtype: string,
  caption: null,
  credit: null,
  type: string,
  url: string,
  height: number,
  width: number,
  legacy: unknown,
  subType: string,
  crop_name: string
}

type Article = {
  abstract: string,
  web_url:string,
  snippet: string,
  lead_paragraph: string,
  print_section: string,
  print_page: string,
  source: string,
  multimedia: Multimedia[] | [],
  headline: {
    main: string,
    kicker: string,
    content_kicker: string | null,
    print_headline: string,
    name: string | null,
    seo: string | null,
    sub: string | null
  },
  keywords: unknown[],
  pub_date: string,
  document_type: string,
  news_desk: string,
  section_name: string,
  byline: unknown,
  type_of_material: string,
  _id: string,
  word_count: number,
  uri: string
}

export type { Article };
