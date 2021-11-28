import React from 'react';
import {Box} from "@mui/material";
import ArticlesListGrid from "../components/articles-list";
import {SearchBlock} from "../components";

const ArticlesList = () => {
  return (
    <Box sx={{ minWidth: 1290, ml: '75px', mr: '75px' }}>
      <SearchBlock />
      <ArticlesListGrid />
    </Box>
  );
};

export default ArticlesList;
