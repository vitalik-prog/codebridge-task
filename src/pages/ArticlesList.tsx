import React from 'react';
import ArticlesListGrid from "../components/articles-list";
import {SearchBlock} from "../components";
import {Box} from "@mui/material";

const ArticlesList = () => {

  return (
    <Box sx={{ minWidth: 1290, ml: '75px', mr: '75px' }}>
      <SearchBlock />
      <ArticlesListGrid />
    </Box>
  );
};

export default ArticlesList;
