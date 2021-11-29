import React, {FC, useEffect} from 'react';
import { Grid } from "@mui/material";
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from "../../hooks";
import {getArticles} from "../../store/articles/actions";
import {DataStatus} from "../../common/enums/app";
import {Loader, NoContent} from "../index";
import ArticleGridItem from "../article-grid-item/ArticleGridItem";

const ArticlesGridList: FC = () => {
  const {articles, dataStatus, keywords} = useAppSelector(({articles}) => ({
    articles: articles.articles,
    dataStatus: articles.dataStatus,
    keywords: articles.keywords
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getArticles(keywords));
  }, [dispatch, keywords]);

  if (dataStatus === DataStatus.PENDING) {
    return <Loader/>
  }

  const isArticlesExist = Boolean(articles.length);

  if (!isArticlesExist) {
    return <NoContent contentName='articles'/>
  }

  const handleArticleNavigate = (index: number): void => {
    navigate(`/article/${index}`)
  }

  return (
    <Grid sx={{mt: 0.01}} container spacing={6}>
      {articles.map((article, index) => (
        <ArticleGridItem
          key={index}
          article={article}
          index={index}
          onArticleSelect={handleArticleNavigate}
        />
      ))}
    </Grid>
  );
};

export default ArticlesGridList;
