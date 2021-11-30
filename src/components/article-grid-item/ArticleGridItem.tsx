import React, {FC} from 'react';
import {Article} from "../../common/types/article";
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {style} from "./style";
import {Path} from "../../common/enums/app";
import {DEFAULT_IMAGE_URL} from "../../common/constants";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import {getFormattedDate} from "../../helpers";
import {DateFormatType} from "../../common/enums/date";
import HighLighter from "../highlighter";
import LongText from "../long-text";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type ArticleGridItemProps = {
  article: Article,
  index: number,
  onArticleSelect: (index: number) => void,
}

const ArticleGridItem: FC<ArticleGridItemProps> = ({ article, index, onArticleSelect }) => {
  const isImageExist = Boolean(article.multimedia && article.multimedia.length)
  const imagePath = isImageExist ? (Path.API_IMG_ORIGIN_URL + article.multimedia[0].url) : DEFAULT_IMAGE_URL

  return (
    <Grid item xs={12} sm={6} md={4} sx={{ pt: '0px' }}>
      <Card
        sx={style.card}
      >
        <CardMedia
          component='img'
          sx={style.img}
          image={imagePath}
          alt={article.multimedia?.length ? article.multimedia[0].crop_name : ''}
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
              {getFormattedDate(new Date(article.pub_date), DateFormatType.MONTH_DAY_YEAR)}
            </Typography>
          </Typography>
          <Typography
            color='textSecondary'
            variant='body2'
            sx={style.header}
          >
            <HighLighter text={article.headline.main} />
          </Typography>
          <LongText content={article.abstract} limit={100} />
        </CardContent>
        <CardActions sx={style.cardButton}>
          <Button
            onClick={() => onArticleSelect(index) }
            variant='text'
            endIcon={<ArrowForwardIcon />}
          >
            Read more
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArticleGridItem;
