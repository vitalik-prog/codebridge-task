import React, {FC, useEffect} from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import LongText from "../long-text/LongText";
import {DateFormatType} from "../../common/enums/date";
import {getFormattedDate} from "../../helpers";
import {DEFAULT_IMAGE_URL} from "../../common/constants";
import {useAppSelector} from "../../hooks";
import {getArticles} from "../../store/articles/actions";
import {DataStatus, Path} from "../../common/enums/app";
import {Loader, NoContent} from "../index";
import HighLighter from "../highlighter";
import { style } from "./style";

const ArticlesListGrid: FC = () => {
  const {articles, dataStatus} = useAppSelector(({articles}) => ({
    articles: articles.articles,
    dataStatus: articles.dataStatus,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getArticles(Path.API_DEFAULT_KEYWORDS_TO_FIND));
  }, [dispatch]);

  if (dataStatus === DataStatus.PENDING) {
    return <Loader />
  }

  const isArticlesExist = Boolean(articles.length);

  if (!isArticlesExist) {
    return <NoContent contentName='articles' />
  }

  return (
    <Grid sx={{ mt: 0.01 }} container spacing={6}>
      {articles.map((article, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card
            sx={style.card}
          >
            <CardMedia
              component="img"
              sx={style.img}
              image={article.urlToImage ? article.urlToImage : DEFAULT_IMAGE_URL}
              alt={article.title}
            />
            <CardContent sx={style.cardContent}>
              <Typography
                color='textSecondary'
                sx={style.date}
              >
                <Typography sx={{ mr: 1 }} component='span'>
                  <CalendarTodayOutlinedIcon />
                </Typography>
                <Typography component='span'>
                  {getFormattedDate(new Date(article.publishedAt), DateFormatType.MONTH_DAY_YEAR)}
                </Typography>
              </Typography>
              <Typography
                color='textSecondary'
                variant='body2'
                sx={style.header}
              >
                <HighLighter text={article.title} />
              </Typography>
              <LongText content={article.description} limit={100} />
            </CardContent>
            <CardActions sx={style.cardButton}>
              <Button
                onClick={() => navigate(`/article/${index}`) }
                variant='text'
                endIcon={<ArrowForwardIcon />}
              >
                Read more
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ArticlesListGrid;
