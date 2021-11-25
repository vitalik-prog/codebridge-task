import { Article } from '../common/types';

const getFormattedDate = (article: Article): string => {
  const month = new Date(article.publishedAt).toLocaleString('en-EN', { month: 'long' });
  const year = new Date(article.publishedAt).toLocaleString('en-EN', { year: 'numeric' });
  let date = new Date(article.publishedAt).toLocaleString('en-EN', { day: 'numeric' });
  if (Number(date) < 10) {
    date = '0' + date;
  }
  return `${date} ${month}, ${year}`;
};

export { getFormattedDate };
