import React, {FC} from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Article} from "../../common/types/article";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LongText from "../long-text/LongText";
import {DateFormatType} from "../../common/enums/date";
import {getFormattedDate} from "../../helpers";
import {DEFAULT_IMAGE_URL} from "../../common/constants";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

const style = {
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as 'column'
  },
  img: {
    height: '217px'
  },
  cardContent: {
    padding: '25px 25px 14px 25px',
    flexGrow: 1
  },
  date: {
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center'
  },
  cardButton: {
    padding: '0 25px 25px 17px',
  },
  header: {
    height: '55px',
    marginBottom: '20px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: "2",
    WebkitBoxOrient: 'vertical' as 'vertical',
  }
};

type ArticlesListGridProps = {
  articles: Article[]
}

const ArticlesListGrid: FC<ArticlesListGridProps> = ({ articles }) => {
  const isArticlesExist = Boolean(articles.length);
  if (!isArticlesExist) {
    return (
      <Grid container sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant={'h4'}>
          Oops. There is no articles
        </Typography>
      </Grid>
    )
  }

  return (
    <Grid container spacing={6}>
      {articles.map((article) => (
        <Grid item key={article.publishedAt} xs={12} sm={6} md={4}>
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
                color={'textSecondary'}
                sx={style.date}
              >
                <Typography sx={{ mr: 1 }} component={'span'}>
                  <CalendarTodayOutlinedIcon />
                </Typography>
                <Typography component={'span'}>
                  {getFormattedDate(new Date(article.publishedAt), DateFormatType.MONTH_DAY_YEAR)}
                </Typography>
              </Typography>
              <Typography
                color={'textSecondary'}
                variant={'h5'}
                sx={style.header}
              >
                {article.title}
              </Typography>
              <LongText content={article.description} limit={100} />
            </CardContent>
            <CardActions sx={style.cardButton}>
              <Button variant="text" endIcon={<ArrowRightAltIcon />}>
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
