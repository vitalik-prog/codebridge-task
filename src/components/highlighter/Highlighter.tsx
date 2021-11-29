import React, {FC} from 'react';
import {Typography} from "@mui/material";
import {useAppSelector} from "../../hooks";

type HighLighterProps = {
  text: string,
  fontSize?: string
}

const HighLighter: FC<HighLighterProps> = ({ text, fontSize = '24px' }) => {
  const {keywords} = useAppSelector(({articles}) => ({
    keywords: articles.keywords
  }));

  const keywordsReg = keywords.split(' ').join('|')
  const textParts = text.split(new RegExp(`(${keywordsReg})`, 'gi'));
  const keywordsParts = keywords.split(' ')

  return (
    <>
      {" "}
      {textParts.map((part, i) => {
        const highlightStyle =
          keywordsParts.some(keywordsPart => part.toLowerCase() === keywordsPart.toLowerCase())
            ? {fontSize, backgroundColor: 'yellow', color: 'primary.main'}
            : {fontSize, color: 'primary.main'};
        return (
          <Typography component='span' key={i} sx={highlightStyle}>
            {part}
          </Typography>
        );
      })}{" "}
    </>
  );
};

export default HighLighter;
