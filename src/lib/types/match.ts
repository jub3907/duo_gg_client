import { ChampionKey } from 'config/championKey';
import {
  ParticipantBasicType,
  ParticipantDetailType,
  PerkType,
} from './participant';
import { SpellKey } from 'config/spellKey';

const PositionType = <const>[
  'TOP',
  'MIDDLE',
  'JUNGLE',
  'BOTTOM',
  'UTILITY',
  'Invalid',
  '',
];
export type PositionType = (typeof PositionType)[number];

export type MatchBasicType = {
  matchId: string;

  // 플레이타임
  gameDuration: number;
  // 언제 플레이 했는지
  gameCreation: number;
  // 랭크 타입
  gameType: string;
  gameMode: string;
  // 승패 여부
  isWin: boolean;

  // 챔피언 이름
  championName: string;
  // 챔피언 아이디
  championId: ChampionKey;
  // 챔피언 레벨
  champLevel: number;

  // 라인
  teamPosition: PositionType;
  // 킬,
  // 데스
  // 어시
  kills: number;
  deaths: number;
  assists: number;

  // 아이템 0 ~ 6
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  // 스펠 1, 2
  summoner1Id: SpellKey;
  summoner2Id: SpellKey;

  // 팀 전체 킬
  // 골드 획득량
  goldEarned: number;
  // CS
  totalMinionsKilled: number;
  totalDamageDealtToChampions: number;

  blue: ParticipantBasicType[];
  red: ParticipantBasicType[];
};

export type MatchDetailType = {
  matchId: string;
  gameCreation: number;
  gameDuration: number;
  winner: number;

  red: ParticipantDetailType[];
  blue: ParticipantDetailType[];

  perk: PerkType;
};
