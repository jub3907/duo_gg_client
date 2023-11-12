import { ChampionKey } from 'config/championKey';

export type MasteryType = {
  championId: ChampionKey;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
};
