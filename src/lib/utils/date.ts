import moment from 'moment';
import 'moment/locale/ko';

const utcOffset = 9;

export const getDateFromNow = (date: number) => {
  return moment(date).utcOffset(utcOffset).fromNow();
};

export const getGameDuration = (sec: number) => {
  const min = Math.floor(sec / 60);
  return `${min}분 ${sec - 60 * min}분`;
};
