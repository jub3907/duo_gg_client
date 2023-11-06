const apiPath = {
  base: 'http://localhost:8080',

  comment: '/comment/[name]',
  deleteComment: '/comment/[commentId]',

  league: '/league/[name]',
  ranking: '/ranking',

  masteryByPuuid: '/mastery/by-puuid/[puuid]',
  masteryBySummoner: '/mastery/by-summoner/[summonerId]',
  masteryByName: '/mastery/by-name/[name]',

  match: '/match/[name]',
  matchDetail: '/match/detail',

  duo: '/duo',

  summoner: '/summoner/[name]',
};

export type PathType = keyof typeof apiPath;

export default apiPath;
