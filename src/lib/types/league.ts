export type LeagueType = {
  queueType: string;
  tier: string;
  rank: string;

  freshBlood: boolean;
  inactive: boolean;
  veteran: boolean;
  hotStreak: boolean;

  wins: number;
  leaguePoints: number;
  losses: number;
};
