import React, {FC} from 'react';
import {Grid, Typography} from "@mui/material";
import { style } from './style';

type NoContentProps = {
  contentName: string
}

const NoContent: FC<NoContentProps> = ({ contentName }) => {
  return (
    <Grid container sx={style.wrapper}>
      <Typography variant='h4'>
        Oops. There is no {contentName}
      </Typography>
    </Grid>
  );
};

export default NoContent;