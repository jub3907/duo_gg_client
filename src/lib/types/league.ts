import { Queuetype } from './queue';
import { TierType } from './tier';

export type LeagueType = {
  queueType: Queuetype;
  tier: TierType;
  rank: string;

  freshBlood: boolean;
  inactive: boolean;
  veteran: boolean;
  hotStreak: boolean;

  wins: number;
  leaguePoints: number;
  losses: number;
};
