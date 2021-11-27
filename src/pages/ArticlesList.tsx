import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {getArticles} from "../store/actions";
import ArticlesListGrid from "../components/articles-list";
import {useAppSelector} from "../hooks";
import { SearchBlock } from "../components";
import {Path} from "../common/enums/app";

const ArticlesList = () => {
  const {articles, dataStatus} = useAppSelector(({articles}) => ({
    articles: articles.articles,
    dataStatus: articles.dataStatus,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles(Path.API_DEFAULT_KEYWORDS_TO_FIND));
  }, [dispatch]);

  return (
    <>
      <SearchBlock />
      <ArticlesListGrid articles={articles}/>
    </>
  );
};

export default ArticlesList;
