import React, {FC} from 'react';
import {Typography} from "@mui/material";
import {useAppSelector} from "../../hooks";

const style = {
  highlighted: {
    backgroundColor: 'yellow',
    fontSize: '24px',
  },
  null: {
    fontSize: '24px',
  },
}

type HighLighterProps = {
  text: string,
}

const HighLighter: FC<HighLighterProps> = ({ text }) => {
  const {keywords} = useAppSelector(({articles}) => ({
    keywords: articles.keywords
  }));

  const keywordsReg = keywords.split(' ').join('|')
  const textParts = text.split(new RegExp(`(${keywordsReg})`, "gi"));
  const keywordsParts = keywords.split(' ')

  return (
    <>
      {" "}
      {textParts.map((part, i) => {
        const highlightStyle =
          keywordsParts.some(keywordsPart => part.toLowerCase() === keywordsPart.toLowerCase())
            ? style.highlighted
            : style.null;
        return (
          <Typography component={'span'} key={i} sx={highlightStyle}>
            {part}
          </Typography>
        );
      })}{" "}
    </>
  );
};

export default HighLighter;
