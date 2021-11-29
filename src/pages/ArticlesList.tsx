import React from 'react';
import {Box} from "@mui/material";
import ArticlesGridList from "../components/articles-grid-list";
import {SearchBlock} from "../components";

const ArticlesList = () => {
  return (
    <Box sx={{ minWidth: 1290, ml: '75px', mr: '75px', mb: '63px' }}>
      <SearchBlock />
      <ArticlesGridList />
    </Box>
  );
};

export default ArticlesList;
