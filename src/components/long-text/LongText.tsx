import React, {FC} from "react";
import {Typography} from "@mui/material";
import HighLighter from "../highlighter";

type LongTextProps = {
  content: string | null,
  limit: number
}

const LongText: FC<LongTextProps> = ({ content, limit}) => {
  const toShow = content ? content.substring(0, limit) + "..." : '';
  return (
    <Typography sx={{ color: 'primary.main' }}>
      <HighLighter text={toShow} fontSize='16px' />
    </Typography>
  )
}

export default LongText
