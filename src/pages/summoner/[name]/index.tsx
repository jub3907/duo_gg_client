import SummonerCard from '@pages/Summoner/Card/SummonerCard';
import SubHeader from '@common/Header/SubHeader';
import Layout from '@common/Layout/Layout';
import PageTitleLayout from '@common/Layout/PageTitleLayout';
import { GetServerSidePropsContext } from 'next';
import SummonerMenu from '@common/Menu/SummonerMenu';
import styles from '@pages/Summoner/Summoner.module.scss';
import CommentList from '@pages/Summoner/List/CommentList';
import MasteryList from '@pages/Summoner/List/MasteryList';
import MatchSummaryCard from '@pages/Summoner/Card/MatchSummaryCard';
import { MatchBasicType } from 'lib/types/match';
import { style } from '@mui/system';
import MatchBasicInfoCard from '@pages/Summoner/Card/MatchBasicInfoCard';
import { gql, useMutation } from '@apollo/client';
import { initializeApollo, withApollo } from 'lib/apollo/apolloClient';
import { SummonerBasic } from 'lib/types/summoner';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearSummonerState, initSummonerState } from 'lib/slice/summonerSlice';

const BASIC_SUMMONER_INFO = gql`
  mutation basicSummonerInfo($name: String!) {
    basicSummonerInfo(name: $name) {
      freeRank {
        leaguePoints
        losses
        rank
        tier
        wins
      }
      iconPath
      id
      name
      profileIconId
      puuid
      soleRank {
        leaguePoints
        losses
        rank
        tier
        wins
      }
      summonerLevel
      updatedAt
    }
  }
`;

const RECENT_MATCHES = gql`
  mutation recentMatches($count: Float!, $name: String!) {
    recentMatches(count: $count, name: $name) {
      gameCreation
      gameDuration
      matchId
      matchType
      participants {
        championIconPath
        participantId
        puuid
        summonerName
      }
      puuid
      summonerInGameData {
        assists
        baronKills
        champLevel
        championIconPath
        championId
        deaths
        dragonKills
        goldEarned
        individualPosition
        items {
          iconPath
          id
          index
          type
        }
        kills
        participantId
        perks {
          defense
          flex
          offense
          primarySelections
          primaryStyle
          subSelections
          subStyle
        }
        puuid
        summonerName
        summoners {
          iconPath
          id
          index
          type
        }
        teamId
        totalDamageDealtToChampions
        totalDamageTaken
        totalMinionsKilled
        turretKills
        visionWardsBoughtInGame
        wardsKilled
        wardsPlaced
        win
      }
    }
  }
`;

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
  {
    gameCreation: 1641718223000,
    gameDuration: 2266,
    matchId: 'KR_5680478845',
    matchType: '자유 5:5 랭크',
    participants: [
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Caitlyn.png',
        participantId: 1,
        puuid:
          '719YUhOsoyzSnfkDzIykjLt4jBypIhLx9TfTpWHg9jI7EZye5U2_BE3uLRKgvXusHWp0625F9RMbgw',
        summonerName: '화학공학 잠만보',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Zilean.png',
        participantId: 2,
        puuid:
          'ZFOLDjljDn2e-BSZN16_WA3g5CaROyHfArlSTYi2DLfyo-rMgv0a5WmjPVLnOWZoGo_8YA7zbBtkUw',
        summonerName: 'Bellis perennis',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Zac.png',
        participantId: 3,
        puuid:
          'btOzBKaUYry-JD-Y6FxFbHOxykgGHVWJimlCp4ukY2n_Cqg3fa8JptoGLj_DkbGDCCzRDeQuFOEXXQ',
        summonerName: '킴스까이',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Trundle.png',
        participantId: 4,
        puuid:
          'fIxzw532rkj22kfHPG2-iqBEF3d0E4ETYj4TMf5_9HjqxBoYRpnKxnTfLwHBfQlOz_ME_7SgssTU6g',
        summonerName: 'LazyAnts',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Pyke.png',
        participantId: 5,
        puuid:
          'DXTAspWq9mwukLQr9GYdlAMvKgkPGcMd0ty4sdJ-ut97CeCqq1v1y917-EwsEByY2T0q1XZv5R90Og',
        summonerName: '밟혀죽은개미',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Irelia.png',
        participantId: 6,
        puuid:
          'HuHyEqtK_pAOmUWk43sRayzisLXIsZxayEj3LEOFM6lXLZbLmadEYemCYlVQrt6U0qzq5fRTNIwPPA',
        summonerName: '건강한 멘탈',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Lux.png',
        participantId: 7,
        puuid:
          'JleZ9mizz7yCJ196UyeE2yBvZ1tpQoo7-IMBKmKsGR-7mNoMmNgwswQ_VD_t-jJL9tptn13FBw5fkQ',
        summonerName: '대방동송아지',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Sylas.png',
        participantId: 8,
        puuid:
          'P88GrZqDJDyefZLNXANIuEbTGxsR9qurRVo3yOJgm99jI-K-zI4fsELoiL1tw36ESA1ClXTlWUWxmg',
        summonerName: '밤도꼐비',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/LeeSin.png',
        participantId: 9,
        puuid:
          'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
        summonerName: '21세기광부',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Kaisa.png',
        participantId: 10,
        puuid:
          's-zfOjF2-t8_rkHh6W4lAc5S_gqmBwf_rsd0uY8_mk3ZQ-BnIpExW5pjIFtWQkgKxJZmO2luztUpqQ',
        summonerName: '벙삼이',
      },
    ],
    puuid:
      'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
    summonerInGameData: {
      assists: 12,
      baronKills: 1,
      champLevel: 16,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/LeeSin.png',
      championId: 64,
      deaths: 8,
      dragonKills: 1,
      goldEarned: 12824,
      individualPosition: 'JUNGLE',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6692.png',
          id: 6692,
          index: 0,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3123.png',
          id: 3123,
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
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/2055.png',
          id: 2055,
          index: 3,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6333.png',
          id: 6333,
          index: 4,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3053.png',
          id: 3053,
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
      kills: 2,
      participantId: 9,
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
      totalDamageDealtToChampions: 21113,
      totalDamageTaken: 32426,
      totalMinionsKilled: 21,
      turretKills: 0,
      visionWardsBoughtInGame: 4,
      wardsKilled: 9,
      wardsPlaced: 10,
      win: true,
    },
  },
  {
    gameCreation: 1641640575000,
    gameDuration: 1750,
    matchId: 'KR_5678101792',
    matchType: '자유 5:5 랭크',
    participants: [
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Riven.png',
        participantId: 1,
        puuid:
          'P88GrZqDJDyefZLNXANIuEbTGxsR9qurRVo3yOJgm99jI-K-zI4fsELoiL1tw36ESA1ClXTlWUWxmg',
        summonerName: '밤도꼐비',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Nocturne.png',
        participantId: 2,
        puuid:
          'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
        summonerName: '21세기광부',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Xerath.png',
        participantId: 3,
        puuid:
          'fxmsqK_oTfQZcBkT8Qid74R7eSfDyld3xGUKxec9oMgeOCOn7GNFRFsFBhqJljJmDhtqXh8RMH5E5Q',
        summonerName: 'Utopia Ray',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Nautilus.png',
        participantId: 4,
        puuid:
          'gRGkjGmS57P6kdT6CvVqSO-2d-H189vVtgrXQWsxIgKbXNqWgAaii1mcs8VOtRmU623gfwlk_5eHVw',
        summonerName: '플랑슈',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Jhin.png',
        participantId: 5,
        puuid:
          'Pp24wsc4v4dBKEMEqcx33smwJ1hm7jvvOD-V8WCsAScOI9ERTQebdiZ5YQqt7ZWhxHtdznGJMrbKcg',
        summonerName: '아랑아랑김아랑',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Jax.png',
        participantId: 6,
        puuid:
          'Qo8EgQsyw0c-ziLPFcEiOag8KesqPJf6zLm9RwrB2uwAFWXAuZ9XZh5YfHq2de9-bAe-wQemlFMq0g',
        summonerName: 'agqk',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/MasterYi.png',
        participantId: 7,
        puuid:
          '1gGrYggbtFWdqxLwpj4nCsfWoxx4_0JoOt4sMnaOQ69xHAmsHBdUzOwYcXdXsHHV7CrNTjVEoBLirA',
        summonerName: '최보길',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Zilean.png',
        participantId: 8,
        puuid:
          'jfaNvUskgqb9MAbLnRA6ZMCs88Mpo-OChMkA1w8kxTXgjpuXYRYucxfs1REkwk_EaB9CVFRWP5WbfQ',
        summonerName: 'The GunB',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Brand.png',
        participantId: 9,
        puuid:
          '-jiLhA6p4gs2uwc_l484xKBzY4a5T1Hat2tOVk1blgc7cWFULfHz07loMiosopnLIvIDgiqPxYK9sw',
        summonerName: 'Lifesum',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Jinx.png',
        participantId: 10,
        puuid:
          'buvORHCdZSqrcag0ivr3cAl1XzyJqxpx-qROPc02vS9RV7QhbRZZwuP6ubJRZxXDlnN5OVL346jBFg',
        summonerName: 'WRZ Aspirin',
      },
    ],
    puuid:
      'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
    summonerInGameData: {
      assists: 6,
      baronKills: 0,
      champLevel: 15,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Nocturne.png',
      championId: 56,
      deaths: 8,
      dragonKills: 1,
      goldEarned: 12480,
      individualPosition: 'JUNGLE',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3053.png',
          id: 3053,
          index: 0,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6632.png',
          id: 6632,
          index: 1,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3047.png',
          id: 3047,
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
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3071.png',
          id: 3071,
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
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3364.png',
          id: 3364,
          index: 6,
          type: 'item',
        },
      ],
      kills: 12,
      participantId: 2,
      perks: {
        defense: 5002,
        flex: 5008,
        offense: 5005,
        primarySelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png',
        ],
        primaryStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png',
        subSelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png',
        ],
        subStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png',
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
      teamId: 100,
      totalDamageDealtToChampions: 19673,
      totalDamageTaken: 36050,
      totalMinionsKilled: 30,
      turretKills: 0,
      visionWardsBoughtInGame: 5,
      wardsKilled: 11,
      wardsPlaced: 4,
      win: false,
    },
  },
  {
    gameCreation: 1641640010000,
    gameDuration: 194,
    matchId: 'KR_5678048435',
    matchType: '자유 5:5 랭크',
    participants: [
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Sett.png',
        participantId: 1,
        puuid:
          'P88GrZqDJDyefZLNXANIuEbTGxsR9qurRVo3yOJgm99jI-K-zI4fsELoiL1tw36ESA1ClXTlWUWxmg',
        summonerName: '밤도꼐비',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/LeeSin.png',
        participantId: 2,
        puuid:
          'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
        summonerName: '21세기광부',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Vladimir.png',
        participantId: 3,
        puuid:
          '8wurvuEpfwTNeNgSs1C85EivgnB2VCxbmhcm7UXbqfrNa3f65oBkSxyZoQ-ddaUsRJYVCn85oBAEdA',
        summonerName: '취사대장',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Kaisa.png',
        participantId: 4,
        puuid:
          'TPQJTkPdawl2Or3qdK7tn24LP-W3uOJ2HsZf86DDT52MpClQTA-vha87wwsNEt0bzk5zys74ac-buw',
        summonerName: '꼴받을시뮤트올',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Janna.png',
        participantId: 5,
        puuid:
          'FX3Gf5hyd0BGE-L8OUZd_hs5s0oYq8qh8hzieMi4X7EkukkEHrgRTE8f0APpJRUAkYuVYW7DsDj8sg',
        summonerName: '정말 끔찍해',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Viktor.png',
        participantId: 6,
        puuid:
          'lNjLb6qkqkaFifeaA5MKmNhSF3MEQI4BjUbqg5dgRTadvs7qHugaIAU8nxK3kHW5FAh_OPPWPZ_08g',
        summonerName: '자아비판',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Jax.png',
        participantId: 7,
        puuid:
          'Avx8Vy4pCY-QyD_9QthLW19Cw1yM_T0Ac2YSXDOWqLim_Y_cx9SJNN6RzqhnWDfct5IzqW00eGbkeg',
        summonerName: '석 욱',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Yasuo.png',
        participantId: 8,
        puuid:
          'OlK3nEMUo2hmfxVkTQrsrDTKYN8nXPCypOY4cwzAZrcknkE2JMA3AtRIZDJef_uo0aZbkg3l72JDKg',
        summonerName: 'winiron',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Jhin.png',
        participantId: 9,
        puuid:
          'MerOH1T9dF-dCqGi6fxhFpf54TjeBF2YJRMYNKvVSgLHQxTkwPN0BACeDtWqMMmTgT2Ggh-oEkedYQ',
        summonerName: '끈 호',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Gragas.png',
        participantId: 10,
        puuid:
          'c3u89G0HMdD_uG43Qv7Yrjl3Pd9rtYpQBBZFPtF8mNID8pf99cZPwJBVvDczB4qDNjmUolb82zgf2A',
        summonerName: 'ni jiaren',
      },
    ],
    puuid:
      'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
    summonerInGameData: {
      assists: 0,
      baronKills: 0,
      champLevel: 2,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/LeeSin.png',
      championId: 64,
      deaths: 0,
      dragonKills: 0,
      goldEarned: 1698,
      individualPosition: 'JUNGLE',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1035.png',
          id: 1035,
          index: 0,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/2031.png',
          id: 2031,
          index: 1,
          type: 'item',
        },
        {
          iconPath: '',
          id: 0,
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
          iconPath: '',
          id: 0,
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
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3340.png',
          id: 3340,
          index: 6,
          type: 'item',
        },
      ],
      kills: 2,
      participantId: 2,
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
      teamId: 100,
      totalDamageDealtToChampions: 787,
      totalDamageTaken: 1467,
      totalMinionsKilled: 0,
      turretKills: 0,
      visionWardsBoughtInGame: 0,
      wardsKilled: 0,
      wardsPlaced: 0,
      win: true,
    },
  },
  {
    gameCreation: 1641559085000,
    gameDuration: 1442,
    matchId: 'KR_5676021027',
    matchType: '자유 5:5 랭크',
    participants: [
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Camille.png',
        participantId: 1,
        puuid:
          'oTEGL3AcDb4653KreNttw3EMAKf7VggFmjpY6HMAB6xG6KpeovKpYm_Fo2lZReXKMfsa8tfTkRSkhA',
        summonerName: '종팀장',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Zac.png',
        participantId: 2,
        puuid:
          'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
        summonerName: '도구의 한계',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/TwistedFate.png',
        participantId: 3,
        puuid:
          '4RVWDEsA1wm8Pt0VdSOWXCGNqz5lC1SCc75JCinWpRh942DHzO0_JFJy3X3cfnvW_GhnBESyjbj1OQ',
        summonerName: 'Blue Sentinels',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Kaisa.png',
        participantId: 4,
        puuid:
          'VWXpgIcx-cx4H8sS5KN7eDnE422KQplva17jxiH3aNJCyEb6eAUeViAMLazkNyqMjNAJU8HfxR6lvw',
        summonerName: '조 망',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Thresh.png',
        participantId: 5,
        puuid:
          'NKjR6QunF7u5-qhrhnmmdMsKKeVMpypNJYhLgu7IaCYKnNQ5jsw75mEngrKZjMqGriCIJI__ysurzA',
        summonerName: '조항규',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/TahmKench.png',
        participantId: 6,
        puuid:
          'W-yXP8tN20Geb8LAXZ6SBrGEi_Q6w2AjObiv5e9FsZsoeiFNLNktx3FcBm2SZ7G-u83rhJN_LDd5ug',
        summonerName: '까루까루까까루',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Fizz.png',
        participantId: 7,
        puuid:
          '2eKLbyphkGTpjEK9LynMwkhzWHXCsY-PN_gCYqUkGgZsiYVarMgFs6CsOJD0B68ie2nyBoAOZkK_bA',
        summonerName: '심얀보',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/LeeSin.png',
        participantId: 8,
        puuid:
          'lUtsrHB_Aa8_bHC-OClYAngWrwnWe6BcVPZLNyx0shVV656pwnKYceWGjIrw2BDwfwTF6FghqgiIAw',
        summonerName: 'Voyan',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Xerath.png',
        participantId: 9,
        puuid:
          'tsrsPegXbLN6tLiZy6VBERmAFYQB9Ae6iToS6fN0LbKVEVwd9Y3kBeG9XSB6mfexx3AV5ZJF3fo5FQ',
        summonerName: '우창룸',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Jhin.png',
        participantId: 10,
        puuid:
          'Pgb01geVCi2r3CjfAEjShLmr6ITA-UTYHJfNrzAFYt2GsgSrLlKU3auN3AjXQSbn9rhcqx94-czfFw',
        summonerName: '입대2주전',
      },
    ],
    puuid:
      'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
    summonerInGameData: {
      assists: 8,
      baronKills: 0,
      champLevel: 11,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Zac.png',
      championId: 154,
      deaths: 5,
      dragonKills: 0,
      goldEarned: 6251,
      individualPosition: 'JUNGLE',
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
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/2031.png',
          id: 2031,
          index: 1,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3076.png',
          id: 3076,
          index: 2,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3111.png',
          id: 3111,
          index: 3,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1011.png',
          id: 1011,
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
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3364.png',
          id: 3364,
          index: 6,
          type: 'item',
        },
      ],
      kills: 0,
      participantId: 2,
      perks: {
        defense: 5002,
        flex: 5008,
        offense: 5007,
        primarySelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/FontOfLife/FontOfLife.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/Conditioning/Conditioning.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/Revitalize/Revitalize.png',
        ],
        primaryStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png',
        subSelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Triumph.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendTenacity/LegendTenacity.png',
        ],
        subStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png',
      },
      puuid:
        'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
      summonerName: '도구의 한계',
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
      teamId: 100,
      totalDamageDealtToChampions: 7455,
      totalDamageTaken: 24675,
      totalMinionsKilled: 20,
      turretKills: 0,
      visionWardsBoughtInGame: 1,
      wardsKilled: 4,
      wardsPlaced: 1,
      win: false,
    },
  },
  {
    gameCreation: 1641102291000,
    gameDuration: 2486,
    matchId: 'KR_5665366217',
    matchType: '자유 5:5 랭크',
    participants: [
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Riven.png',
        participantId: 1,
        puuid:
          'oTEGL3AcDb4653KreNttw3EMAKf7VggFmjpY6HMAB6xG6KpeovKpYm_Fo2lZReXKMfsa8tfTkRSkhA',
        summonerName: '종팀장',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/LeeSin.png',
        participantId: 2,
        puuid:
          'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
        summonerName: '도구의 한계',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Yasuo.png',
        participantId: 3,
        puuid:
          'Ph_VJGevRi6oBNUR2XVzk2IC0sHSU4KR6hrMUrbGe2QD4VzDFR8rtnqVJxpHaDR-vZF-yuTURDUbNA',
        summonerName: '안양코로나',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Twitch.png',
        participantId: 4,
        puuid:
          '2tbif6swcgXnSUmmGBANB5i5DUYghk-4x_SONrWt_PT6cLJ1JkwTmNIAL-DeX039WdwQnk3WbTtZvQ',
        summonerName: '트윗취',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Zilean.png',
        participantId: 5,
        puuid:
          'WptIil9sDIR26peG_j5mgzACuFLXtdTRgluHuaqdpF3DEHiNzQNBdcwRuQ6-W-bOR1ctV2uBmNfRtg',
        summonerName: '필름대장',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Illaoi.png',
        participantId: 6,
        puuid:
          'ZgyiJXCyv1Tn58FDLOtujMXQOjjhbayrfBKfGKGM8asVd7DMt_Rm9yDuB2LZBhHbw4BiQEeqSXGRPA',
        summonerName: '김준0임',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Elise.png',
        participantId: 7,
        puuid:
          'Xp5nLHLcYUcZ9hh1krt0JF9Kmu-Es0VIXOL8xTHmD__oq-BNM4KZ6IyeGFH-K5rOVTO8C9ie_aYTmQ',
        summonerName: 'secscexsex',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Nautilus.png',
        participantId: 8,
        puuid:
          '8sr0Lo9tXnC95JuzheTP3UtSnncjoSuslcmvB_HAM2W67RH2jzC_-p1zS2QPUE6UGUAUxl8C6NXayg',
        summonerName: '집에서맛집여행중',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Corki.png',
        participantId: 9,
        puuid:
          'WcSEjoRRPrzx6u_cvslrPsOdLvv3RFptri7JxEek9MvhhEzED8v2zvWX9MBdySFwWMwBdHaxnAtaPQ',
        summonerName: 'Perceive',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Kaisa.png',
        participantId: 10,
        puuid:
          'VEg8jZyArz1XN1FRI50wgjal221neCuyX2Ds8n6brwB9EqPE0exc5ICp0Lh5kQGfEy0lg1iGRfnM2w',
        summonerName: '응애 겜 이겨줘',
      },
    ],
    puuid:
      'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
    summonerInGameData: {
      assists: 14,
      baronKills: 1,
      champLevel: 18,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/LeeSin.png',
      championId: 64,
      deaths: 12,
      dragonKills: 3,
      goldEarned: 16951,
      individualPosition: 'JUNGLE',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6692.png',
          id: 6692,
          index: 0,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3044.png',
          id: 3044,
          index: 1,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6696.png',
          id: 6696,
          index: 2,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/4401.png',
          id: 4401,
          index: 3,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6676.png',
          id: 6676,
          index: 4,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3111.png',
          id: 3111,
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
      kills: 14,
      participantId: 2,
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
      summonerName: '도구의 한계',
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
      teamId: 100,
      totalDamageDealtToChampions: 26136,
      totalDamageTaken: 44340,
      totalMinionsKilled: 40,
      turretKills: 2,
      visionWardsBoughtInGame: 4,
      wardsKilled: 4,
      wardsPlaced: 14,
      win: true,
    },
  },
  {
    gameCreation: 1641100844000,
    gameDuration: 1139,
    matchId: 'KR_5665343028',
    matchType: '자유 5:5 랭크',
    participants: [
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Renekton.png',
        participantId: 1,
        puuid:
          'o1ZPkq_t00QVEGWTakhOW5jdmB7lSeyyMmNtNBUhEbcmtVQ9UAyN182klaXin54Wm3zBLTHn4YUPDA',
        summonerName: '전수찬 사냥개',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Nidalee.png',
        participantId: 2,
        puuid:
          'N5283PBXt9YFbFsl5W1tLs5ToSDvlGmHBlfLXHe5l3fBmsQWMvYo2uRBp8vMACTqUJzX-V-Mvp-oAA',
        summonerName: '휘 둘 림',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Katarina.png',
        participantId: 3,
        puuid:
          'VMhlHt3CHDVRxPMCpnV6_6qo_mpwhOIRw2H6R3RUEOCQHjzawiA1UNVp3Czl4dlSKQakqaAfyv3rBg',
        summonerName: '이제플레가야지',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Caitlyn.png',
        participantId: 4,
        puuid:
          'AvcMh-4bseo94DZLJ2QITbJRFmyjDi8JSY7WQd-cyWtjAEsFlsi-lHk5QNDzQ7an9pxkJxBl1I5NBw',
        summonerName: '이잔훈',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Braum.png',
        participantId: 5,
        puuid:
          '573CXs-bw460s3IBsi7TrCamOoIXm7UaKJREmjYAufX6s7EDvD5dRwqvu9QtLD9U1RbiAlKk1Vbsvw',
        summonerName: '정애퉁',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Sylas.png',
        participantId: 6,
        puuid:
          'oTEGL3AcDb4653KreNttw3EMAKf7VggFmjpY6HMAB6xG6KpeovKpYm_Fo2lZReXKMfsa8tfTkRSkhA',
        summonerName: '종팀장',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Zac.png',
        participantId: 7,
        puuid:
          'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
        summonerName: '도구의 한계',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Yone.png',
        participantId: 8,
        puuid:
          'Ph_VJGevRi6oBNUR2XVzk2IC0sHSU4KR6hrMUrbGe2QD4VzDFR8rtnqVJxpHaDR-vZF-yuTURDUbNA',
        summonerName: '안양코로나',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Jinx.png',
        participantId: 9,
        puuid:
          '2tbif6swcgXnSUmmGBANB5i5DUYghk-4x_SONrWt_PT6cLJ1JkwTmNIAL-DeX039WdwQnk3WbTtZvQ',
        summonerName: '트윗취',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Alistar.png',
        participantId: 10,
        puuid:
          'WptIil9sDIR26peG_j5mgzACuFLXtdTRgluHuaqdpF3DEHiNzQNBdcwRuQ6-W-bOR1ctV2uBmNfRtg',
        summonerName: '필름대장',
      },
    ],
    puuid:
      'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
    summonerInGameData: {
      assists: 0,
      baronKills: 0,
      champLevel: 9,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Zac.png',
      championId: 154,
      deaths: 5,
      dragonKills: 0,
      goldEarned: 4987,
      individualPosition: 'JUNGLE',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3111.png',
          id: 3111,
          index: 0,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/2031.png',
          id: 2031,
          index: 1,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6662.png',
          id: 6662,
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
          iconPath: '',
          id: 0,
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
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3364.png',
          id: 3364,
          index: 6,
          type: 'item',
        },
      ],
      kills: 1,
      participantId: 7,
      perks: {
        defense: 5002,
        flex: 5008,
        offense: 5007,
        primarySelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/FontOfLife/FontOfLife.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/Conditioning/Conditioning.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/Revitalize/Revitalize.png',
        ],
        primaryStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png',
        subSelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Triumph.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendTenacity/LegendTenacity.png',
        ],
        subStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png',
      },
      puuid:
        'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
      summonerName: '도구의 한계',
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
      totalDamageDealtToChampions: 6048,
      totalDamageTaken: 17221,
      totalMinionsKilled: 14,
      turretKills: 0,
      visionWardsBoughtInGame: 2,
      wardsKilled: 0,
      wardsPlaced: 3,
      win: false,
    },
  },
  {
    gameCreation: 1641043735000,
    gameDuration: 1506,
    matchId: 'KR_5664115374',
    matchType: '궁극기 주문서',
    participants: [
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Vayne.png',
        participantId: 1,
        puuid:
          '42_37XqcMSufc4FjSkHd0UrN0Nz-veBNAlIQ8VIAXOdY7lfCTLQ074TpJwTehebEOQlVcvxUc_QNlw',
        summonerName: '저시커',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Lillia.png',
        participantId: 2,
        puuid:
          'oKq6sPMYWZmQ7EIH7-We2_Vk6sz1uEVNptUufpJMA5QujTWWCtzQGcdV1ss_1TgfjN6EM4ZB7kuocA',
        summonerName: '광고문의',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Neeko.png',
        participantId: 3,
        puuid:
          'a3HhF8SrjSL5MKuek2YQFEEgBj1_cOhDXfLw7TclxoPjir_85e73JdGLSNNClCSWNErgGu_8UFxYbA',
        summonerName: '김짱쎄',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Caitlyn.png',
        participantId: 4,
        puuid:
          'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
        summonerName: '도구의 한계',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Lux.png',
        participantId: 5,
        puuid:
          '-Y6xwW0tWUkljRp6NR-ejRILLxUNhfCXM7_kCd0bz07UzMZCIDABiwfsGlQfMGkiHKF_fOCLPISTVg',
        summonerName: 'Fangs',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Trundle.png',
        participantId: 6,
        puuid:
          'T6y5PjyTRwtapnpUptcyYOzo62EIpMnfNTHjHO0WZ7UamZsOnKq7jNt48rsCNdZVOzCaPhlOK94uww',
        summonerName: '방울킥',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Nunu.png',
        participantId: 7,
        puuid:
          'hO2zzVEfD8rDJRy1s0V2bzPE6sypCpRIdGLBej0wVl_h-x3BhJF6p3-h4l7U7KB3DDGrttOn2h7sdA',
        summonerName: '중국집CEO',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Jayce.png',
        participantId: 8,
        puuid:
          'GwKCbj5WXINmwB_EACcOORC8kIT9KSqIbB2Lmh-CnKPG-9t4xDwJAnihNDKI6vFY5DDclg6DOs8jCw',
        summonerName: 'Warphon',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Ashe.png',
        participantId: 9,
        puuid:
          'oIUGZEGXsKhkrpTTv0qxTTuKspR6teW_6zmrHwJE4zJ8zx7V3iqKEbwqr7LIc5z6VDF-3TDWeS0YWA',
        summonerName: '행복곰돌이',
      },
      {
        championIconPath:
          'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Leblanc.png',
        participantId: 10,
        puuid:
          'JXcLbHpNbiXGqeH_bLJAecyjke3sBwF3Ci7Ec_ljT2-_PZs_Z0Ff055nanxurG_Bdqkgq2wxHSoz3Q',
        summonerName: '사스광',
      },
    ],
    puuid:
      'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
    summonerInGameData: {
      assists: 14,
      baronKills: 0,
      champLevel: 17,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Caitlyn.png',
      championId: 51,
      deaths: 5,
      dragonKills: 1,
      goldEarned: 19533,
      individualPosition: 'BOTTOM',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3036.png',
          id: 3036,
          index: 0,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6671.png',
          id: 6671,
          index: 1,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3031.png',
          id: 3031,
          index: 2,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3006.png',
          id: 3006,
          index: 3,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3095.png',
          id: 3095,
          index: 4,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3094.png',
          id: 3094,
          index: 5,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3363.png',
          id: 3363,
          index: 6,
          type: 'item',
        },
      ],
      kills: 16,
      participantId: 4,
      perks: {
        defense: 5002,
        flex: 5008,
        offense: 5005,
        primarySelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png',
        ],
        primaryStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png',
        subSelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/RavenousHunter/RavenousHunter.png',
        ],
        subStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png',
      },
      puuid:
        'WhX0_L0SzY-UpxFTZFvHASktCbDc-loiJln6RnMNU5Ptwj_6lw98sE-iOPamqp_GNs71T37LFIndLg',
      summonerName: '도구의 한계',
      summoners: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/Summoner_UltBookPlaceholder.png',
          id: 54,
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
      totalDamageDealtToChampions: 50686,
      totalDamageTaken: 22270,
      totalMinionsKilled: 149,
      turretKills: 5,
      visionWardsBoughtInGame: 0,
      wardsKilled: 0,
      wardsPlaced: 8,
      win: true,
    },
  },
];

type Props = {
  basicSummonerInfo: SummonerBasic;
};

const SummonerPage = ({ basicSummonerInfo }: Props) => {
  const dispatch = useDispatch();
  const [recentMatches, setRecentMatches] = useState([]);
  const [recentMatch, { loading }] = useMutation<{
    recentMatches: MatchBasicType[];
  }>(RECENT_MATCHES, {
    onCompleted: ({ recentMatches }) => {
      console.log(recentMatches);
      setRecentMatches(recentMatches);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    dispatch(initSummonerState(basicSummonerInfo));

    recentMatch({
      variables: { count: 10, name: basicSummonerInfo.name },
    });
  }, [basicSummonerInfo]);

  useEffect(() => {
    return () => {
      dispatch(clearSummonerState());
    };
  }, []);

  return (
    <Layout subHeader={<SubHeader />} activeMenu="summoner">
      <PageTitleLayout title="전적 검색 결과">
        <SummonerCard summoner={basicSummonerInfo} />
        <div className={styles.menu}>
          <SummonerMenu activeMenu="index" />
        </div>
        <div className={styles.lists}>
          <CommentList />
          <MasteryList />
        </div>
        {loading ? (
          <div>Loading</div>
        ) : (
          <>
            <div className={styles.summary}>
              <MatchSummaryCard matches={recentMatches} />
            </div>

            <div className={styles.matches}>
              {recentMatches.map((match: MatchBasicType, index) => {
                return <MatchBasicInfoCard match={match} key={match.matchId} />;
              })}
            </div>
          </>
        )}
      </PageTitleLayout>
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const params = ctx.params;
  const apolloClient = initializeApollo(ctx);
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { data } = await apolloClient.mutate<Props>({
    mutation: BASIC_SUMMONER_INFO,
    variables: {
      name: params.name,
    },
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      basicSummonerInfo: data.basicSummonerInfo,
    },
  };
}

export default withApollo(SummonerPage);
