import React, {FC} from 'react';
import {Grid} from "@mui/material";
import { useParams } from 'react-router-dom';
import {useAppSelector} from "../hooks";
import {ArticleBody} from "../components";

const Article: FC = () => {
  const {articles} = useAppSelector(({articles}) => ({
    articles: articles.articles
  }));

  let { id } = useParams();

  const article = articles[Number(id)]

  return (
    <Grid container direction={'column'} sx={{ flexGrow: 1 }}>
      <ArticleBody article={article} />
    </Grid>
  );
};

export default Article;
