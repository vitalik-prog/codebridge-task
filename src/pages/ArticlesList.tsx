import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {getArticles} from "../store/actions";

const ArticlesList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);
  return (
    <div>

    </div>
  );
};

export default ArticlesList;
