import React from 'react';
import styles from './styles.module.scss';
import ArticlesList from "../../pages/ArticlesList";

const App = () => {
  return (
    <div className={styles.app}>
      <ArticlesList />
    </div>
  );
}

export default App;
