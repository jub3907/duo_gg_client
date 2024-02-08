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
  return name ? `/summoner/${name}` : '#';
};

export const getSummonerCommentUrl = (gameName: string, tagLine: string) => {
  return tagLine
    ? `/summoner/${gameName}-${tagLine}/comment`
    : `/summoner/${gameName}-KR1}/comment`;
};

export const getSummonerStatUrl = (name: string) => {
  return name ? `/summoner/${name}/statistics` : '#';
};
