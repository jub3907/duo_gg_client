import { MatchBasicType } from 'lib/types/match';
import { ParticipantDetailType } from 'lib/types/participant';

export const preventEvent = async (event: any) => {
  // this part is for stopping parent forms to trigger their submit
  if (event) {
    // sometimes not true, e.g. React Native
    if (typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    if (typeof event.stopPropagation === 'function') {
      // prevent any outer forms from receiving the event too
      event.stopPropagation();
    }
  }
};

export type ImageType =
  | 'tier'
  | 'position'
  | 'stat'
  | 'profileicon'
  | 'champion'
  | 'item'
  | 'spell'
  | 'perk';

export const getImagePath = (id: string | number, type: ImageType) => {
  return `https://lolduo.s3.ap-northeast-2.amazonaws.com/${type}/${id}.png`;
};

export const getWinRate = (wins: number, losses: number) => {
  return ((100 * wins) / (wins + losses)).toFixed();
};

export const getRate = (kills: number, deaths: number, assists: number) => {
  return deaths === 0 ? 'Perfect' : ((kills + assists) / deaths).toFixed(1);
};

export const getPickRate = (pick: number, total: number) => {
  return ((100 * pick) / total).toFixed();
};

export const parseMultiSearchInput = (text: string) => {
  // case1. ,를 기준으로 아이디를 입력
  if (text.includes(',')) {
    return text.split(',').slice(0, 5);
  } else {
    const lines = text.split('\n');
    return lines
      .map((line) => line.replace('님이 방에 참가했습니다.', ''))
      .slice(0, 5);
  }
};

//TODO: 백엔드로 옮겨야함

export const getMatchDetailSummary = (
  red: ParticipantDetailType[],
  blue: ParticipantDetailType[],
) => {
  const wins = red[0].isWin ? 200 : 100;

  const redSummary = red.reduce(
    (acc, participant) => {
      acc.dragonKills += participant.dragonKills;
      acc.turretKills += participant.turretKills;
      acc.baronKills += participant.baronKills;
      acc.kills += participant.kills;
      acc.goldEarned += participant.goldEarned;

      return acc;
    },
    {
      dragonKills: 0,
      turretKills: 0,
      baronKills: 0,
      kills: 0,
      goldEarned: 0,
    },
  );

  const blueSummary = blue.reduce(
    (acc, participant) => {
      acc.dragonKills += participant.dragonKills;
      acc.turretKills += participant.turretKills;
      acc.baronKills += participant.baronKills;
      acc.kills += participant.kills;
      acc.goldEarned += participant.goldEarned;

      return acc;
    },
    {
      dragonKills: 0,
      turretKills: 0,
      baronKills: 0,
      kills: 0,
      goldEarned: 0,
    },
  );

  return { wins, redSummary, blueSummary };
};

export const getMatchSummary = (matches: MatchBasicType[]) => {
  return matches.reduce(
    (acc, val) => {
      const data = val;

      const position = data.teamPosition ? data.teamPosition : 'Invalid';

      if (data.isWin) {
        acc.wins += 1;
        acc[position].wins += 1;
      } else {
        acc.losses += 1;
        acc[position].losses += 1;
      }
      acc[position].total += 1;
      acc.total += 1;
      acc.kills += data.kills;
      acc.deaths += data.deaths;
      acc.assists += data.assists;

      return acc;
    },
    {
      total: 0,
      wins: 0,
      losses: 0,
      kills: 0,
      deaths: 0,
      assists: 0,
      TOP: {
        total: 0,
        wins: 0,
        losses: 0,
      },
      JUNGLE: {
        total: 0,
        wins: 0,
        losses: 0,
      },
      MIDDLE: {
        total: 0,
        wins: 0,
        losses: 0,
      },
      BOTTOM: {
        total: 0,
        wins: 0,
        losses: 0,
      },
      UTILITY: {
        total: 0,
        wins: 0,
        losses: 0,
      },
      Invalid: {
        total: 0,
        wins: 0,
        losses: 0,
      },
    },
  );
};
