import React, {FC, useCallback, useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import Divider from "@mui/material/Divider";
import {useDispatch} from "react-redux";
import {getArticles} from "../../store/actions";
import {Path} from "../../common/enums";
import {useAppSelector, useDebounce} from "../../hooks";
import { style } from './style'

const SearchBlock: FC = () => {
  const {totalArticles} = useAppSelector(({articles}) => ({
    totalArticles: articles.totalArticles
  }));
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1500);
  const dispatch = useDispatch();

  useEffect(() => {
      if (debouncedSearchTerm) {
        dispatch(getArticles(debouncedSearchTerm))
      }
    },
    [debouncedSearchTerm, dispatch]
  );

  const enterPressCatcher = useCallback(e => {
    if (e.key === 'Enter') {
      dispatch(getArticles(searchTerm))
    }
  }, [dispatch, searchTerm])

  useEffect(() => {
    document.addEventListener('keydown', enterPressCatcher)
    return () => document.removeEventListener('keydown', enterPressCatcher)
  }, [enterPressCatcher])

  return (
    <Grid container direction={'column'}>
      <Typography
        component={'span'}
        sx={style.header}
      >
        Filter by keywords
      </Typography>
      <TextField
        id="input-with-icon-textfield"
        defaultValue={Path.API_DEFAULT_KEYWORDS_TO_FIND}
        sx={style.input}
        placeholder={'Search'}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Typography
        component={'span'}
        sx={style.footer}
      >
        Results: {totalArticles}
      </Typography>
      <Divider />
    </Grid>
  );
};

export default SearchBlock;
