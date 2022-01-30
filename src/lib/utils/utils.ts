import { MatchBasicType } from 'lib/types/match';
import { ParticipantType } from 'lib/types/participant';

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

type ImagePath = 'emblems' | 'positions' | 'stats';

export const getImagePath = (id: string, type: ImagePath) => {
  return `/images/${type}/${id}.png`;
};

export const getWinRate = (wins: number, losses: number) => {
  return ((100 * wins) / (wins + losses)).toFixed();
};

export const getRate = (kills: number, deaths: number, assists: number) => {
  return deaths === 0 ? 'Perfect' : ((kills + assists) / deaths).toFixed(1);
};

export const parseMultiSearchInput = (text: string) => {
  // case1. ,를 기준으로 아이디를 입력
  if (text.includes(',')) {
    return text.split(',').slice(0, 5);
  } else {
    const lines = text.split('\n');
    return lines
      .reduce((acc: string[], val: string) => {
        if (val.includes('님이 방에')) {
          acc.push(val.split('님이 방에')[0]);
        }
        return acc;
      }, [])
      .slice(0, 5);
  }
};

//TODO: 백엔드로 옮겨야함

export const getMatchDetailSummary = (
  red: ParticipantType[],
  blue: ParticipantType[],
) => {
  const wins = red[0].win ? 200 : 100;

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
      const data = val.summonerInGameData;

      if (data.win) {
        acc.wins += 1;
        acc[data.individualPosition].wins += 1;
      } else {
        acc.losses += 1;
        acc[data.individualPosition].losses += 1;
      }
      acc[data.individualPosition].total += 1;
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
