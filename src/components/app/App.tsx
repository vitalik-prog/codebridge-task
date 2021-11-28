import React from 'react';
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import styles from './styles.module.scss';
import ArticlesList from "../../pages/ArticlesList";
import Article from "../../pages/Article";

const App = () => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path={'/article/:id'} element={<Article/>}/>
          <Route path={'/'} element={<ArticlesList/>}/>
          <Route path={'*'} element={<Navigate replace to="/"/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
