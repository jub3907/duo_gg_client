const Path = {
  home: '/',
  summoner: '/summoner/[name]',
  summonerStat: '/summoner/[name]/statistics',
  summonerComment: '/summoner/[name]/comment',
  multi: '/multi',
  duo: '/duo',
};

export type PathType = keyof typeof Path;

export default Path;

export const getSummonerUrl = (name: string) => {
  return `/summoner/${name}`;
};
