import { ParticipantBasicType, ParticipantType } from './participant';

export type MatchBasicType = {
  gameCreation: number;
  gameDuration: number;
  matchId: string;
  matchType: string;
  puuid: string;
  participants: ParticipantBasicType[];
  summonerInGameData: ParticipantType;
};

export type MatchDetailType = {
  gameCreation: number;
  gameDuration: number;
  matchId: string;
  matchType: string;
  red: ParticipantType[];
  blue: ParticipantType[];
};

export type MatchBuildType = {
  items: {
    iconPathes: string[];
    timestamp: number;
  }[];
  skills: number[];
};
