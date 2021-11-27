import React from 'react';
import ArticlesListGrid from "../components/articles-list";
import {SearchBlock} from "../components";

const ArticlesList = () => {

  return (
    <>
      <SearchBlock />
      <ArticlesListGrid />
    </>
  );
};

export default ArticlesList;
