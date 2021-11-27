import {FC} from "react";
import {Typography} from "@mui/material";

type LongTextProps = {
  content: string | null,
  limit: number
}

const LongText: FC<LongTextProps> = ({ content, limit}) => {
  const toShow = content ? content.substring(0, limit) + "..." : '';
  return (
    <Typography sx={{ color: 'primary.main' }}>
      {toShow}
    </Typography>
  )
}

export default LongText
