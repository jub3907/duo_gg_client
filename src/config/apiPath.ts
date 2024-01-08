import { API_URL } from './env';

const apiPath = {
  base: API_URL,

  account: '/account/by-riot-id',

  comment: '/comment/[puuid]',
  deleteComment: '/comment/[commentId]',

  league: '/league/[name]',
  leagueSolo: '/league/[name]/solo',
  leagueFree: '/league/[name]/free',
  ranking: '/ranking',

  masteryByPuuid: '/mastery/by-puuid/[puuid]',
  masteryBySummoner: '/mastery/by-summoner/[summonerId]',
  masteryByName: '/mastery/by-name/[name]',

  match: '/match/[puuid]',
  matchDetail: '/match/detail',

  duo: '/duo',

  summoner: '/summoner/[name]',
};

export type PathType = keyof typeof apiPath;

export default apiPath;
