import { API_URL } from './env';

const apiPath = {
  base: API_URL,

  account: '/account/by-riot-id',

  comment: '/comment/[puuid]',
  deleteComment: '/comment/[commentId]',

  league: '/league/[puuid]',
  leagueSolo: '/league/[puuid]/solo',
  leagueFree: '/league/[puuid]/free',
  ranking: '/ranking',

  masteryByPuuid: '/mastery/by-puuid/[puuid]',
  masteryBySummoner: '/mastery/by-summoner/[summonerId]',
  masteryByName: '/mastery/by-name/[name]',

  match: '/match/[puuid]',
  matchDetail: '/match/detail',

  duo: '/duo',

  summonerByPuuid: '/summoner/by-puuid/[puuid]',
  summonerById: '/summoner/by-id/[summonerId]',
};

export type PathType = keyof typeof apiPath;

export default apiPath;
