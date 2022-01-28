export type ParticipantBasicType = {
  championIconPath: string;
  participantId: number;
  puuid: string;
  summonerName: string;
};

export type ParticipantType = {
  puuid: string;
  participantId: number;
  summonerName: string;
  teamId: number;
  win: boolean;
  individualPosition:
    | 'TOP'
    | 'MID'
    | 'JUNGLE'
    | 'BOTTOM'
    | 'UTILITY'
    | 'Invalid';
  champLevel: number;
  championId: number;
  championIconPath: string;
  dragonKills: number;
  baronKills: number;
  turretKills: number;
  goldEarned: number;
  kills: number;
  deaths: number;
  assists: number;
  totalMinionsKilled: number;
  wardsKilled: number;
  wardsPlaced: number;
  visionWardsBoughtInGame: number;
  totalDamageDealtToChampions: number;
  totalDamageTaken: number;
  items: {
    index: number;
    id: number;
    type: string;
    iconPath: string;
  }[];
  summoners: {
    index: number;
    id: number;
    type: string;
    iconPath: string;
  }[];
  perks: {
    flex: number;
    defense: number;
    offense: number;
    primaryStyle: number;
    primarySelections: number[];
    subStyle: number;
    subSelections: number[];
  };
};
