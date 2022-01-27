import moment from 'moment';
import 'moment/locale/ko';

const utcOffset = 9;

export const getDateFromNow = (date: number) => {
  return moment(date).utcOffset(utcOffset).fromNow();
};
