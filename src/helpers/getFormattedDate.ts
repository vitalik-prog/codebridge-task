import { format } from 'date-fns';
import {DateFormatType} from "../common/enums/date";

const getFormattedDate = (date: Date, formatType: DateFormatType): string => {
  return format(date, formatType);
};

export { getFormattedDate };
