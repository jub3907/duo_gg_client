import WinRateGraph from '@common/Graph/WinRateGraph';
import Image from '@common/Image/Image';
import { Entry } from 'lib/types/entry';
import { getImagePath } from 'lib/utils/utils';
import styles from './MultiSummonerCard.module.scss';
import cn from 'classnames';
import { getDateFromNow, getGameDuration } from 'lib/utils/date';
import List from '@common/List/List';
import { MatchBasicType } from 'lib/types/match';
import NameLink from '@common/Link/NameLink';

type Props = {
  name: string;
};

const basicSummonerInfo = {
  freeRank: {
    leaguePoints: 17,
    losses: 17,
    rank: 'IV',
    tier: 'GOLD',
    wins: 20,
  },
  updatedAt: 1643245720678,
  iconPath:
    'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/0.png',
  id: 'cNzdPLFUnyV0RvH0HrIdLerm_DaOrYl-xpGPmBx0s0Zfyu67Z3cDDoYQHQ',
  name: '라이스케잌',
  profileIconId: 0,
  puuid:
    'KWxPJ8lfwiDvpyR9cQ_bpMRlvh_vfhFk4Fgi3WdW2a8OGloWCKjnagxD3vWoajQkBY9NAE3qOIbcnw',
  soleRank: {
    leaguePoints: 17,
    losses: 17,
    rank: 'IV',
    tier: 'GOLD',
    wins: 20,
  },
  summonerLevel: 147,
};

const mastery = [
  {
    championId: 412,
    championLevel: 7,
    championPoints: 613908,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Thresh.png',
    lastPlayTime: 1638076565000,
  },
  {
    championId: 117,
    championLevel: 7,
    championPoints: 213614,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Lulu.png',
    lastPlayTime: 1633737603000,
  },
  {
    championId: 267,
    championLevel: 7,
    championPoints: 15899,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Nami.png',
    lastPlayTime: 1633792976000,
  },
  {
    championId: 64,
    championLevel: 7,
    championPoints: 137923,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/LeeSin.png',
    lastPlayTime: 1642266610000,
  },
  {
    championId: 555,
    championLevel: 7,
    championPoints: 93051,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Pyke.png',
    lastPlayTime: 1642940134000,
  },
  {
    championId: 89,
    championLevel: 7,
    championPoints: 80544,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Leona.png',
    lastPlayTime: 1642948335000,
  },
  {
    championId: 41,
    championLevel: 6,
    championPoints: 63258,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Gangplank.png',
    lastPlayTime: 1632036575000,
  },
  {
    championId: 21,
    championLevel: 7,
    championPoints: 57680,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/MissFortune.png',
    lastPlayTime: 1638682852000,
  },
  {
    championId: 76,
    championLevel: 5,
    championPoints: 48850,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Nidalee.png',
    lastPlayTime: 1635426901000,
  },
  {
    championId: 142,
    championLevel: 6,
    championPoints: 47744,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Zoe.png',
    lastPlayTime: 1636290800000,
  },
];

const recentMatches: MatchBasicType[] = [
  {
    gameCreation: 1642947055000,
    gameDuration: 1222,
    matchId: 'KR_5711151803',
    matchType: '무작위 총력전',
    participants: [
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Gnar.png',
        participantId: 1,
        puuid:
          'ytA_wKinAR2xlijQkDveG2PO_7tu2M2acxp-OK128zUHfW26nYPm57XQnRK9g-OriajLEG9mtCG9aQ',
        summonerName: 'Morpious',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Seraphine.png',
        participantId: 2,
        puuid:
          'WEQOIHrAPC-W95OqZpLfRf4xp6xpGH77RJT0FxSuMVeWwj5DL4sAw_eetEm6zlvqSlD_ci0pQBXqPQ',
        summonerName: '붕어는 밥 안먹어',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Akali.png',
        participantId: 3,
        puuid:
          'Lgh-FGSF0uBxhrmcxVglhFTh-TdEhMZYUOiSrrcB2POnm8Q6jQhzQRsUoDZcWKelQ7ue-FgRr8DzeQ',
        summonerName: '사과주스좋아요',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Draven.png',
        participantId: 4,
        puuid:
          'opWbbQNLsluI99w2oU73GJZgABwk4jtimfRDM_51Y6qFLRCTlKzzLx4j-Dd1-MyGRLpqDREy8OruGg',
        summonerName: '구십육',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Azir.png',
        participantId: 5,
        puuid:
          'Cy4MRJcQMuUy-4h7raDY4N2tjwQbq4C7QRHxN3UGiz-vc9OWTAWcBLvajd23ipa3Sfm-pJJVEGGdMg',
        summonerName: '시즌 임시닉네임',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Ziggs.png',
        participantId: 6,
        puuid:
          'Z2pj8UILgusfUO7Cvp9vbtVSYQ0EBrVOSVJulHIHuJYrMNOJP_IjbZIsRavEvZieron6p1nEP1QEnw',
        summonerName: '루별이',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Leona.png',
        participantId: 7,
        puuid:
          'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
        summonerName: '21세기광부',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/DrMundo.png',
        participantId: 8,
        puuid:
          'Q5iXLrFSuCDDe_OTWIgl-w0T_9qb35KJL1oWS400Of4vmGkf3yijWao4puE6nSb0yc1kOb5YQjg21Q',
        summonerName: '내가하면올라감',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Khazix.png',
        participantId: 9,
        puuid:
          'S_PDroaGS1OLhQfqdwBmb1-vuReUwJ2CL_QHCb-HLHvtCrOFn6lyNjwcH-im62Sa21alFCntnzgJ5w',
        summonerName: '지뉴은퇴좀',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Morgana.png',
        participantId: 10,
        puuid:
          'TLcoEDuI--jUWvsSOeLgqOplkK-nmCExrT4u757mHbPZe2jB1EV5S3FrnxdPMS4dkwjYqfnSezUDvg',
        summonerName: '후다닭치킨',
      },
    ],
    puuid:
      'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
    summonerInGameData: {
      assists: 28,
      baronKills: 0,
      champLevel: 18,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Leona.png',
      championId: 89,
      deaths: 10,
      dragonKills: 0,
      goldEarned: 12648,
      individualPosition: 'Invalid',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6662.png',
          id: 6662,
          index: 0,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3111.png',
          id: 3111,
          index: 1,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/4401.png',
          id: 4401,
          index: 2,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3067.png',
          id: 3067,
          index: 3,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3075.png',
          id: 3075,
          index: 4,
          type: 'item',
        },
        {
          iconPath: '',
          id: 0,
          index: 5,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/2052.png',
          id: 2052,
          index: 6,
          type: 'item',
        },
      ],
      kills: 4,
      participantId: 7,
      perks: {
        defense: 5002,
        flex: 5003,
        offense: 5007,
        primarySelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/FontOfLife/FontOfLife.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/BonePlating/BonePlating.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/Unflinching/Unflinching.png',
        ],
        primaryStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png',
        subSelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendTenacity/LegendTenacity.png',
        ],
        subStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png',
      },
      puuid:
        'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
      summonerName: '21세기광부',
      summoners: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/SummonerMana.png',
          id: 13,
          index: 0,
          type: 'summoner',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/SummonerFlash.png',
          id: 4,
          index: 1,
          type: 'summoner',
        },
      ],
      teamId: 200,
      totalDamageDealtToChampions: 13041,
      totalDamageTaken: 27127,
      totalMinionsKilled: 16,
      turretKills: 0,
      visionWardsBoughtInGame: 0,
      wardsKilled: 0,
      wardsPlaced: 0,
      win: true,
    },
  },
  {
    gameCreation: 1642938417000,
    gameDuration: 1691,
    matchId: 'KR_5710747181',
    matchType: '자유 5:5 랭크',
    participants: [
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Rengar.png',
        participantId: 1,
        puuid:
          'q1mMZqSECEBwXeh-v7zuEf7Y3ALsVeG-11_7sEofO8jxo_Ia5xzpD7A2l0p5dwcFEzARbp7kLQZUhA',
        summonerName: '멘탈이 깨진 사람',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Graves.png',
        participantId: 2,
        puuid:
          'ioiRg38v_sr0rrTalz8-btnFxxTnNdE2hdCa7_vfvh-aFVnrCy-VnJvaqu2HcD_TXMtAgEJRF8HaTg',
        summonerName: '아야해요',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Talon.png',
        participantId: 3,
        puuid:
          '3FYBzjZmxNTyI8hYzyOtMv7fNcTHDDLd4AIQtht7sGssud2oti5txCd91bxWv9GPbYjlpFDDEHrzbA',
        summonerName: 'qmffkelcnd',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Zeri.png',
        participantId: 4,
        puuid:
          'QFbDtLVipxEubKzhhI61DKQAILVdfzb0IkUjcMKdps4hjPw0JTfYDyCYsk0N_XVEmEpmN0zOgieHJw',
        summonerName: '까불면다죽여팬다',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Pyke.png',
        participantId: 5,
        puuid:
          'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
        summonerName: '21세기광부',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Blitzcrank.png',
        participantId: 6,
        puuid:
          'FsMTS8VPt-nad3iJ0wY0hFSFbwhgaj40gHaN7HEx5aa-FymCRgnAKfC13V_BcFpiWMoO9y2kcsCULg',
        summonerName: 'Tic Tac Toe',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Hecarim.png',
        participantId: 7,
        puuid:
          'uzRLnLNbrjc62H_6vZ7-EhAQ2rqhiHigDwpi7nAytBSlW_YldrzZwn_CdT0vXMJbEG_ZjwO_XWcJ7Q',
        summonerName: '흑인랩퍼김수현',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Orianna.png',
        participantId: 8,
        puuid:
          'U5cdlrJT4UGYzGpRqfMLUHa4UT5pAqSlvOnUXd8c_0QFJmroVh_gL8gwK1lPLX9x0X3k45x2wUiIaA',
        summonerName: '특공연대미남',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Ezreal.png',
        participantId: 9,
        puuid:
          'SAuag_FocCCkiLNPgWninyjBoo9QpF4fwT1M0giyD_zMGEW_U8LhBIQjmbd0CUFkIRSSVa6_z-ZX0w',
        summonerName: '나는민씨',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Yasuo.png',
        participantId: 10,
        puuid:
          'guHIjD0oe2CuQjOFoJbAIpadQKlujprqBiGLiPjOZWwOXpSbRXgC8ZaTYouNdGs4csJvBJ9a0GlYUg',
        summonerName: '아보보',
      },
    ],
    puuid:
      'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
    summonerInGameData: {
      assists: 7,
      baronKills: 0,
      champLevel: 12,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Pyke.png',
      championId: 555,
      deaths: 8,
      dragonKills: 0,
      goldEarned: 10100,
      individualPosition: 'UTILITY',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6696.png',
          id: 6696,
          index: 0,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3142.png',
          id: 3142,
          index: 1,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3857.png',
          id: 3857,
          index: 2,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/2055.png',
          id: 2055,
          index: 3,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3117.png',
          id: 3117,
          index: 4,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3134.png',
          id: 3134,
          index: 5,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3364.png',
          id: 3364,
          index: 6,
          type: 'item',
        },
      ],
      kills: 5,
      participantId: 5,
      perks: {
        defense: 5002,
        flex: 5008,
        offense: 5008,
        primarySelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png',
        ],
        primaryStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png',
        subSelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/BonePlating/BonePlating.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/Revitalize/Revitalize.png',
        ],
        subStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png',
      },
      puuid:
        'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
      summonerName: '21세기광부',
      summoners: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/SummonerDot.png',
          id: 14,
          index: 0,
          type: 'summoner',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/SummonerFlash.png',
          id: 4,
          index: 1,
          type: 'summoner',
        },
      ],
      teamId: 100,
      totalDamageDealtToChampions: 10095,
      totalDamageTaken: 15619,
      totalMinionsKilled: 32,
      turretKills: 0,
      visionWardsBoughtInGame: 6,
      wardsKilled: 8,
      wardsPlaced: 30,
      win: false,
    },
  },
  {
    gameCreation: 1642264874000,
    gameDuration: 1683,
    matchId: 'KR_5694161398',
    matchType: '자유 5:5 랭크',
    participants: [
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Garen.png',
        participantId: 1,
        puuid:
          'ltUOQZShs__52YOUJJpoeqlGsITXZXzClLm6LyGRJKqVsK9O9asCcDRIW5KLBw_2Up-fb-CwEjZDJQ',
        summonerName: 'Neora',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Diana.png',
        participantId: 2,
        puuid:
          '-6DD9terLZ8ftVjznF7gRdws12xwCgH0GkiGQtBD1OP9VUP5_cJzvppjpNP7f64Hn_YvBX32q88qNA',
        summonerName: '각시콘',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Corki.png',
        participantId: 3,
        puuid:
          'tqj_p35CwhTCipvGInmgtWyxSW0XXkKIUvlUzb-BluJgEr6pmlKtr_sqn2aoENymv6bnv8VYoP962g',
        summonerName: '이기셨도다',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Varus.png',
        participantId: 4,
        puuid:
          'ZPR3kGbhHT84sBtvEoh4rvZSagJWAArr6ZBWwjbUQz0KerYJHNQUmGEQp8PhnF6ekZhHs4b2CSsi4A',
        summonerName: '미래에셋생명본부',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Yuumi.png',
        participantId: 5,
        puuid:
          'hMugLsJuY_n3QE-dQBvCB-crhhrA_bBWo7sYyTQOQErn0ZSxs8uS1YNMjfTT_eu6iE5Rd4kra7FKuQ',
        summonerName: '김형주짱123',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Sion.png',
        participantId: 6,
        puuid:
          'bdJFX8kYQSTgyrhcezYIhSgxUq_uPFsneGLzPUbPx4K6yXhvOZ8iZJgW56B7g9o65kWYJ4rdo2-c_w',
        summonerName: '우후우꾸우후흐우',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/LeeSin.png',
        participantId: 7,
        puuid:
          'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
        summonerName: '21세기광부',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Akshan.png',
        participantId: 8,
        puuid:
          '5P36y61Gw2H2zutYr05Gw-2YPi8S884d89mwJNpaYu1s5q8gBjRv1tjcfAdBfZ74kVBrglWTcrAEfQ',
        summonerName: '닉네임이름아님',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Vayne.png',
        participantId: 9,
        puuid:
          'neRw_ZaBqW2j8juHwcVWhBx4uXvmjPH5yFE7rkCjmaq4ETbKJKmouptvBk99r8ISxMOhHlDkxUqJnA',
        summonerName: '맛차이짬뽕',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Pyke.png',
        participantId: 10,
        puuid:
          '1nhzCRzKGfVpgxG-wRSrfxM0KBX3CWUPWU_K866Pcwq3O7wClF9Jv5OHLpife2j6yRlJH3GqNri8_Q',
        summonerName: '유혜아',
      },
    ],
    puuid:
      'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
    summonerInGameData: {
      assists: 18,
      baronKills: 0,
      champLevel: 16,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/LeeSin.png',
      championId: 64,
      deaths: 1,
      dragonKills: 3,
      goldEarned: 14194,
      individualPosition: 'JUNGLE',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3026.png',
          id: 3026,
          index: 0,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3814.png',
          id: 3814,
          index: 1,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3111.png',
          id: 3111,
          index: 2,
          type: 'item',
        },
        {
          iconPath: '',
          id: 0,
          index: 3,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6692.png',
          id: 6692,
          index: 4,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6696.png',
          id: 6696,
          index: 5,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3340.png',
          id: 3340,
          index: 6,
          type: 'item',
        },
      ],
      kills: 10,
      participantId: 7,
      perks: {
        defense: 5002,
        flex: 5008,
        offense: 5005,
        primarySelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Conqueror/Conqueror.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Triumph.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png',
        ],
        primaryStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png',
        subSelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png',
        ],
        subStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7203_Whimsy.png',
      },
      puuid:
        'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
      summonerName: '21세기광부',
      summoners: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/SummonerSmite.png',
          id: 11,
          index: 0,
          type: 'summoner',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/SummonerFlash.png',
          id: 4,
          index: 1,
          type: 'summoner',
        },
      ],
      teamId: 200,
      totalDamageDealtToChampions: 23172,
      totalDamageTaken: 24576,
      totalMinionsKilled: 21,
      turretKills: 2,
      visionWardsBoughtInGame: 4,
      wardsKilled: 0,
      wardsPlaced: 11,
      win: true,
    },
  },
];

const RankInfo = ({ rank }: { rank: Entry }) => {
  return (
    <>
      <div className={styles.rank}>
        <Image
          src={getImagePath(rank.tier, 'emblems')}
          alt={`티어 이미지`}
          width={21}
          height={24}
        />
        <div className={styles.tier}>
          {rank.tier} {rank.rank}, {rank.leaguePoints}LP
        </div>
      </div>
      <WinRateGraph wins={rank.wins} losses={rank.losses} textVisible />
    </>
  );
};

const UnRankInfo = () => {
  return (
    <div className={cn(styles.rank, styles.unrank)}>
      <Image
        src={getImagePath('Unranked', 'emblems')}
        alt={`언랭크 티어 이미지`}
        width={24}
        height={24}
      />
      <div className={styles.tier}>Unranked</div>
    </div>
  );
};

const Masteries = () => {
  return (
    <>
      {mastery.slice(0, 3).map((mastery, index) => {
        return (
          <div
            className={styles.flex}
            key={`mastery-${mastery.championId}-${index}`}
          >
            <Image
              src={mastery.iconPath}
              alt="챔피언 아이콘"
              width={30}
              height={30}
              variant="circle"
            />

            <div className={styles.score}>
              {mastery.championPoints.toLocaleString()}점
            </div>
            <div className={styles.date}>
              {getDateFromNow(mastery.lastPlayTime)}
            </div>
          </div>
        );
      })}
    </>
  );
};

const Matches = () => {
  return (
    <>
      {recentMatches.map((match, index) => {
        return (
          <div
            className={styles.flex}
            key={`match-${match.matchId}-${match.summonerInGameData.summonerName}`}
          >
            <div className={styles.result}>
              <Image
                src={match.summonerInGameData.championIconPath}
                alt="챔피언 아이콘"
                width={25}
                height={25}
                variant="circle"
              />
              {match.summonerInGameData.win ? (
                <div className={styles.win}>승리</div>
              ) : (
                <div className={styles.loss}>패배</div>
              )}
            </div>

            <div className={styles.stat}>
              {match.summonerInGameData.kills} /{' '}
              {match.summonerInGameData.deaths} /{' '}
              {match.summonerInGameData.assists}
            </div>

            <div className={styles.position}>
              {match.summonerInGameData.individualPosition}
            </div>
          </div>
        );
      })}
    </>
  );
};

const MultiSummonerCard = ({ name }: Props) => {
  return (
    <div className={styles.layout}>
      <div className={styles.name}>
        <NameLink name={basicSummonerInfo.name} />
      </div>
      <div className={styles.info}>
        {basicSummonerInfo.soleRank ? (
          <RankInfo rank={basicSummonerInfo.soleRank} />
        ) : (
          <UnRankInfo />
        )}
      </div>
      <div className={styles.mastery}>
        <List title="숙련도 정보" contents={<Masteries />} />
      </div>

      <div className={styles.matches}>
        <List title="최근 플레이" contents={<Matches />} />
      </div>
    </div>
  );
};

export default MultiSummonerCard;
