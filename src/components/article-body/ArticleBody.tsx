import React, {FC} from 'react';
import {Article} from "../../common/types/article";
import {Button, CardMedia, Grid, Paper, Typography} from "@mui/material";
import {DEFAULT_IMAGE_URL} from "../../common/constants";
import {Navigate, useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";

const style = {
  img: {
    height: '245px',
    padding: 0,
    margin: 0
  },
  paper: {
    maxWidth: '1290px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '-95px',
    marginBottom: '35px',
    padding: '0 75px 50px 75px',
    flexGrow: 1
  },
  header: {
    fontSize: '24px',
    textAlign: 'center' as 'center',
    marginTop: '35px',
    marginBottom: '50px'
  },
  text: {
    fontSize: '18px',
  }
}

type ArticleBodyProps = {
  article: Article
}

const ArticleBody: FC<ArticleBodyProps> = ({ article }) => {
  const navigate = useNavigate();
  if (!article) {
    return <Navigate to={`/`} replace />
  }

  return (
    <Grid container direction={'column'} sx={{ flexGrow: 1 }}>
      <CardMedia
        component="img"
        sx={style.img}
        image={article.urlToImage ? article.urlToImage : DEFAULT_IMAGE_URL}
        alt={article.title}
      />
      <Paper elevation={1} sx={style.paper}>
        <Typography
          color={'textSecondary'}
          variant={"body2"}
          sx={style.header}
        >
          {article.title}
        </Typography>
        <Typography
          color={'primary.dark'}
          variant={"body2"}
          sx={style.text}
        >
          {article.content}
        </Typography>
      </Paper>
      <Box sx={{ pl: 18.75 }}>
        <Button
          onClick={() => navigate(`/`) }
          variant="text"
          startIcon={<ArrowBackIcon />}
          sx={{ pl: 0, pb: 0, mb: 5.63 }}
        >
          Back to homepage
        </Button>
      </Box>
    </Grid>
  );
};

export default ArticleBody;
