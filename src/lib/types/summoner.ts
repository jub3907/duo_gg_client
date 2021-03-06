import { Entry } from './entry';

export type SummonerBasic = {
  id: string;
  puuid: string;
  iconPath: string;
  name: string;
  profileIconId: number;
  summonerLevel: number;
  updatedAt: number;
  freeRank: Entry | null;
  soleRank: Entry | null;
};
