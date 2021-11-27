import React, {FC, useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import {useDebounce} from "../../hooks";
import {useDispatch} from "react-redux";
import {getArticles} from "../../store/actions";

const style = {
  header: {
    marginTop: '50px',
    marginBottom: '10px',
    fontSize: 16,
    fontWeight: 700
  },
  input: {
    width: '42%',
    marginBottom: '40px',
    backgroundColor: '#FFFFFF',
    padding: '15px 20px',
    border: '1px solid #EAEAEA',
    borderRadius: '5px',
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.20)',
  }
}

const SearchBlock: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 800);
  const dispatch = useDispatch();

  useEffect(() => {
      if (debouncedSearchTerm) {
        dispatch(getArticles(debouncedSearchTerm))
      }
    },
    [debouncedSearchTerm, dispatch]
  );

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
    </Grid>
  );
};

export default SearchBlock;