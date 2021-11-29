import {Article} from "../article";

type ApiResponse = {
  status: string,
  copyright: string,
  response: {
    docs: Article[],
    meta: {
      hits: number,
      offset: number,
      time: number
    }
  }
}

export type {ApiResponse};
