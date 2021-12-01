import React, {FC, useCallback, useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import Divider from "@mui/material/Divider";
import {useDispatch} from "react-redux";
import {getArticles} from "../../store/actions";
import {useAppSelector, useDebounce} from "../../hooks";
import { style } from './style'

const SearchBlock: FC = () => {
  const {totalArticles, keywords} = useAppSelector(({articles}) => ({
    totalArticles: articles.totalArticles,
    keywords: articles.keywords,
    pageNumber: articles.pageNumber,
  }));
  const [searchTerm, setSearchTerm] = useState(keywords);
  const debouncedSearchTerm = useDebounce(searchTerm, 1500);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles({keywords: debouncedSearchTerm}))
  }, [dispatch, debouncedSearchTerm]);

  const enterPressCatcher = useCallback(e => {
    if (e.key === 'Enter') {
      dispatch(getArticles({keywords: searchTerm}))
    }
  }, [dispatch, searchTerm])

  useEffect(() => {
    document.addEventListener('keydown', enterPressCatcher)
    return () => document.removeEventListener('keydown', enterPressCatcher)
  }, [enterPressCatcher])

  return (
    <Grid container direction='column'>
      <Typography
        component={'span'}
        sx={style.header}
      >
        Filter by keywords
      </Typography>
      <TextField
        id='input-with-icon-textfield'
        sx={style.input}
        placeholder='Search'
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant='standard'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Typography
        component='span'
        sx={style.footer}
      >
        Results: {totalArticles}
      </Typography>
      <Divider />
    </Grid>
  );
};

export default SearchBlock;
