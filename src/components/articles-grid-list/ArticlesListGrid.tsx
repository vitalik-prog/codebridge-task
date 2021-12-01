import React, {FC, useCallback, useRef} from 'react';
import {Grid} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks";
import {DataStatus} from "../../common/enums/app";
import {Loader, NoContent} from "../index";
import ArticleGridItem from "../article-grid-item/ArticleGridItem";
import {getMoreArticles} from "../../store/articles/actions";

const ArticlesGridList: FC = () => {
  const {articles, dataStatus, loadingMoreArticles, pageNumber, hasMoreArticles} = useAppSelector(({articles}) => ({
    articles: articles.articles,
    dataStatus: articles.dataStatus,
    loadingMoreArticles: articles.loadingMoreArticles,
    keywords: articles.keywords,
    pageNumber: articles.pageNumber,
    hasMoreArticles: articles.hasMoreArticles
  }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const observer = useRef<IntersectionObserver>()
  const lastElementRef = useCallback(node => {
    if (dataStatus === DataStatus.PENDING) {
      return
    }
    if (observer.current) {
      observer.current.disconnect()
    }
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreArticles) {
        dispatch(getMoreArticles({pageNumber: pageNumber + 1}))
      }
    })
    if (node) {
      observer.current.observe(node)
    }
  }, [dataStatus]);

  const isArticlesExist = Boolean(articles.length);
  if (!isArticlesExist && dataStatus !== DataStatus.PENDING) {
    return <NoContent contentName='articles'/>
  }

  if (dataStatus === DataStatus.PENDING) {
    return <Loader />
  }

  const handleArticleNavigate = (index: number): void => {
    navigate(`/article/${index}`)
  }

  return (
    <>
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
      <Box ref={lastElementRef}></Box>
      {loadingMoreArticles === DataStatus.PENDING && <Loader/>}
      {!isArticlesExist && <NoContent contentName='articles' />}
    </>
  );
};

export default ArticlesGridList;
