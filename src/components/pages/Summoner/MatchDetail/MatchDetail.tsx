import { MatchBasicType } from 'lib/types/match';
import { useState } from 'react';
import styles from './MatchDetail.module.scss';
import MatchDetailMenu from './MatchDetailMenu';
import MatchTotal from './Total/MatchTotal';
import { MatchDetailType } from 'lib/types/match';
import MatchAnalytics from './Analytics/MatchAnalytics';
import MatchBuild from './Build/MatchBuild';
import { PerkType } from 'lib/types/participant';

const matchDetail = {
  blue: [
    {
      assists: 20,
      baronKills: 0,
      champLevel: 18,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Gnar.png',
      championId: 150,
      deaths: 10,
      dragonKills: 0,
      goldEarned: 11986,
      individualPosition: 'Invalid',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6632.png',
          id: 6632,
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
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3053.png',
          id: 3053,
          index: 2,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3065.png',
          id: 3065,
          index: 3,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1057.png',
          id: 1057,
          index: 4,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1028.png',
          id: 1028,
          index: 5,
          type: 'item',
        },
        {
          iconPath: '',
          id: 0,
          index: 6,
          type: 'item',
        },
      ],
      kills: 4,
      participantId: 1,
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
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/RavenousHunter/RavenousHunter.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png',
        ],
        subStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png',
      },
      puuid:
        'ytA_wKinAR2xlijQkDveG2PO_7tu2M2acxp-OK128zUHfW26nYPm57XQnRK9g-OriajLEG9mtCG9aQ',
      summonerName: 'Morpious',
      summoners: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/SummonerSnowball.png',
          id: 32,
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
      totalDamageDealtToChampions: 23816,
      totalDamageTaken: 39251,
      totalMinionsKilled: 37,
      turretKills: 0,
      visionWardsBoughtInGame: 0,
      wardsKilled: 0,
      wardsPlaced: 0,
      win: false,
    },
    {
      assists: 31,
      baronKills: 0,
      champLevel: 17,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Seraphine.png',
      championId: 147,
      deaths: 11,
      dragonKills: 0,
      goldEarned: 12749,
      individualPosition: 'Invalid',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6653.png',
          id: 6653,
          index: 0,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3116.png',
          id: 3116,
          index: 1,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3070.png',
          id: 3070,
          index: 2,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3020.png',
          id: 3020,
          index: 3,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3135.png',
          id: 3135,
          index: 4,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3916.png',
          id: 3916,
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
      kills: 6,
      participantId: 2,
      perks: {
        defense: 5001,
        flex: 5008,
        offense: 5007,
        primarySelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/CheapShot/CheapShot.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png',
        ],
        primaryStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png',
        subSelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png',
        ],
        subStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png',
      },
      puuid:
        'WEQOIHrAPC-W95OqZpLfRf4xp6xpGH77RJT0FxSuMVeWwj5DL4sAw_eetEm6zlvqSlD_ci0pQBXqPQ',
      summonerName: '붕어는 밥 안먹어',
      summoners: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/SummonerExhaust.png',
          id: 3,
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
      totalDamageDealtToChampions: 22051,
      totalDamageTaken: 21318,
      totalMinionsKilled: 25,
      turretKills: 0,
      visionWardsBoughtInGame: 0,
      wardsKilled: 0,
      wardsPlaced: 0,
      win: false,
    },
    {
      assists: 15,
      baronKills: 0,
      champLevel: 18,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Akali.png',
      championId: 84,
      deaths: 11,
      dragonKills: 0,
      goldEarned: 14786,
      individualPosition: 'Invalid',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/4633.png',
          id: 4633,
          index: 0,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3157.png',
          id: 3157,
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
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3102.png',
          id: 3102,
          index: 3,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3135.png',
          id: 3135,
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
      kills: 22,
      participantId: 3,
      perks: {
        defense: 5002,
        flex: 5008,
        offense: 5008,
        primarySelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/RavenousHunter/RavenousHunter.png',
        ],
        primaryStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png',
        subSelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png',
        ],
        subStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png',
      },
      puuid:
        'Lgh-FGSF0uBxhrmcxVglhFTh-TdEhMZYUOiSrrcB2POnm8Q6jQhzQRsUoDZcWKelQ7ue-FgRr8DzeQ',
      summonerName: '사과주스좋아요',
      summoners: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/SummonerSnowball.png',
          id: 32,
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
      totalDamageDealtToChampions: 33853,
      totalDamageTaken: 26185,
      totalMinionsKilled: 11,
      turretKills: 0,
      visionWardsBoughtInGame: 0,
      wardsKilled: 0,
      wardsPlaced: 0,
      win: false,
    },
    {
      assists: 23,
      baronKills: 0,
      champLevel: 17,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Draven.png',
      championId: 119,
      deaths: 9,
      dragonKills: 0,
      goldEarned: 12775,
      individualPosition: 'Invalid',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6673.png',
          id: 6673,
          index: 0,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3031.png',
          id: 3031,
          index: 1,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3033.png',
          id: 3033,
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
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1018.png',
          id: 1018,
          index: 4,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1053.png',
          id: 1053,
          index: 5,
          type: 'item',
        },
        {
          iconPath: '',
          id: 0,
          index: 6,
          type: 'item',
        },
      ],
      kills: 4,
      participantId: 4,
      perks: {
        defense: 5002,
        flex: 5008,
        offense: 5005,
        primarySelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/RavenousHunter/RavenousHunter.png',
        ],
        primaryStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png',
        subSelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png',
        ],
        subStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png',
      },
      puuid:
        'opWbbQNLsluI99w2oU73GJZgABwk4jtimfRDM_51Y6qFLRCTlKzzLx4j-Dd1-MyGRLpqDREy8OruGg',
      summonerName: '구십육',
      summoners: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/SummonerBoost.png',
          id: 1,
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
      totalDamageDealtToChampions: 21361,
      totalDamageTaken: 27187,
      totalMinionsKilled: 81,
      turretKills: 0,
      visionWardsBoughtInGame: 0,
      wardsKilled: 0,
      wardsPlaced: 0,
      win: false,
    },
    {
      assists: 19,
      baronKills: 0,
      champLevel: 18,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Azir.png',
      championId: 268,
      deaths: 7,
      dragonKills: 0,
      goldEarned: 15033,
      individualPosition: 'Invalid',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6653.png',
          id: 6653,
          index: 0,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3020.png',
          id: 3020,
          index: 1,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3115.png',
          id: 3115,
          index: 2,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/4645.png',
          id: 4645,
          index: 3,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3089.png',
          id: 3089,
          index: 4,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3916.png',
          id: 3916,
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
      kills: 12,
      participantId: 5,
      perks: {
        defense: 5003,
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
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/RavenousHunter/RavenousHunter.png',
        ],
        subStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png',
      },
      puuid:
        'Cy4MRJcQMuUy-4h7raDY4N2tjwQbq4C7QRHxN3UGiz-vc9OWTAWcBLvajd23ipa3Sfm-pJJVEGGdMg',
      summonerName: '시즌 임시닉네임',
      summoners: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/SummonerSnowball.png',
          id: 32,
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
      totalDamageDealtToChampions: 28514,
      totalDamageTaken: 18527,
      totalMinionsKilled: 88,
      turretKills: 1,
      visionWardsBoughtInGame: 0,
      wardsKilled: 0,
      wardsPlaced: 0,
      win: false,
    },
  ],
  gameCreation: 1642947055000,
  gameDuration: 1222,
  matchId: 'KR_5711151803',
  matchType: '무작위 총력전',
  red: [
    {
      assists: 24,
      baronKills: 0,
      champLevel: 18,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Ziggs.png',
      championId: 115,
      deaths: 9,
      dragonKills: 0,
      goldEarned: 14626,
      individualPosition: 'Invalid',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3040.png',
          id: 3040,
          index: 0,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6653.png',
          id: 6653,
          index: 1,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3020.png',
          id: 3020,
          index: 2,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3165.png',
          id: 3165,
          index: 3,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/4637.png',
          id: 4637,
          index: 4,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1052.png',
          id: 1052,
          index: 5,
          type: 'item',
        },
        {
          iconPath: '',
          id: 0,
          index: 6,
          type: 'item',
        },
      ],
      kills: 10,
      participantId: 6,
      perks: {
        defense: 5001,
        flex: 5008,
        offense: 5007,
        primarySelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/Transcendence/Transcendence.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png',
        ],
        primaryStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png',
        subSelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png',
        ],
        subStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png',
      },
      puuid:
        'Z2pj8UILgusfUO7Cvp9vbtVSYQ0EBrVOSVJulHIHuJYrMNOJP_IjbZIsRavEvZieron6p1nEP1QEnw',
      summonerName: '루별이',
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
      totalDamageDealtToChampions: 26961,
      totalDamageTaken: 19082,
      totalMinionsKilled: 59,
      turretKills: 5,
      visionWardsBoughtInGame: 0,
      wardsKilled: 0,
      wardsPlaced: 0,
      win: true,
    },
    {
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
    {
      assists: 23,
      baronKills: 0,
      champLevel: 18,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/DrMundo.png',
      championId: 36,
      deaths: 9,
      dragonKills: 0,
      goldEarned: 14845,
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
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3083.png',
          id: 3083,
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
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3065.png',
          id: 3065,
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
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1057.png',
          id: 1057,
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
      kills: 10,
      participantId: 8,
      perks: {
        defense: 5003,
        flex: 5002,
        offense: 5008,
        primarySelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png',
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
        'Q5iXLrFSuCDDe_OTWIgl-w0T_9qb35KJL1oWS400Of4vmGkf3yijWao4puE6nSb0yc1kOb5YQjg21Q',
      summonerName: '내가하면올라감',
      summoners: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/SummonerFlash.png',
          id: 4,
          index: 0,
          type: 'summoner',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/SummonerSnowball.png',
          id: 32,
          index: 1,
          type: 'summoner',
        },
      ],
      teamId: 200,
      totalDamageDealtToChampions: 27870,
      totalDamageTaken: 57008,
      totalMinionsKilled: 83,
      turretKills: 1,
      visionWardsBoughtInGame: 0,
      wardsKilled: 0,
      wardsPlaced: 0,
      win: true,
    },
    {
      assists: 16,
      baronKills: 0,
      champLevel: 18,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Khazix.png',
      championId: 121,
      deaths: 11,
      dragonKills: 0,
      goldEarned: 16044,
      individualPosition: 'Invalid',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6695.png',
          id: 6695,
          index: 0,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6691.png',
          id: 6691,
          index: 1,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3042.png',
          id: 3042,
          index: 2,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3156.png',
          id: 3156,
          index: 3,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3158.png',
          id: 3158,
          index: 4,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3133.png',
          id: 3133,
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
      kills: 20,
      participantId: 9,
      perks: {
        defense: 5002,
        flex: 5008,
        offense: 5008,
        primarySelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/CheapShot/CheapShot.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/RavenousHunter/RavenousHunter.png',
        ],
        primaryStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png',
        subSelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png',
        ],
        subStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png',
      },
      puuid:
        'S_PDroaGS1OLhQfqdwBmb1-vuReUwJ2CL_QHCb-HLHvtCrOFn6lyNjwcH-im62Sa21alFCntnzgJ5w',
      summonerName: '지뉴은퇴좀',
      summoners: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/SummonerFlash.png',
          id: 4,
          index: 0,
          type: 'summoner',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/SummonerSnowball.png',
          id: 32,
          index: 1,
          type: 'summoner',
        },
      ],
      teamId: 200,
      totalDamageDealtToChampions: 36860,
      totalDamageTaken: 23577,
      totalMinionsKilled: 38,
      turretKills: 0,
      visionWardsBoughtInGame: 0,
      wardsKilled: 0,
      wardsPlaced: 0,
      win: true,
    },
    {
      assists: 36,
      baronKills: 0,
      champLevel: 18,
      championIconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Morgana.png',
      championId: 25,
      deaths: 9,
      dragonKills: 0,
      goldEarned: 13822,
      individualPosition: 'Invalid',
      items: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3158.png',
          id: 3158,
          index: 0,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3116.png',
          id: 3116,
          index: 1,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3157.png',
          id: 3157,
          index: 2,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3165.png',
          id: 3165,
          index: 3,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/2420.png',
          id: 2420,
          index: 4,
          type: 'item',
        },
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6653.png',
          id: 6653,
          index: 5,
          type: 'item',
        },
        {
          iconPath: '',
          id: 0,
          index: 6,
          type: 'item',
        },
      ],
      kills: 4,
      participantId: 10,
      perks: {
        defense: 5003,
        flex: 5008,
        offense: 5007,
        primarySelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/CheapShot/CheapShot.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/RavenousHunter/RavenousHunter.png',
        ],
        primaryStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png',
        subSelections: [
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png',
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png',
        ],
        subStyle:
          'http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png',
      },
      puuid:
        'TLcoEDuI--jUWvsSOeLgqOplkK-nmCExrT4u757mHbPZe2jB1EV5S3FrnxdPMS4dkwjYqfnSezUDvg',
      summonerName: '후다닭치킨',
      summoners: [
        {
          iconPath:
            'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/SummonerSnowball.png',
          id: 32,
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
      totalDamageDealtToChampions: 19576,
      totalDamageTaken: 23026,
      totalMinionsKilled: 57,
      turretKills: 1,
      visionWardsBoughtInGame: 0,
      wardsKilled: 0,
      wardsPlaced: 0,
      win: true,
    },
  ],
} as MatchDetailType;

type Props = {
  matchId: string;
  perk: PerkType;
};

export type MatchDetailMenu = 'total' | 'analytics' | 'build';

const MatchDetail = ({ matchId, perk }: Props) => {
  const [tab, setTab] = useState<MatchDetailMenu>('total');
  const onClickTab = (tab: MatchDetailMenu) => {
    setTab(tab);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.menus}>
        <MatchDetailMenu activeMenu={tab} onClickTab={onClickTab} />
      </div>
      <div className={styles.tab}>
        {tab === 'total' && <MatchTotal matchDetail={matchDetail} />}
        {tab === 'analytics' && <MatchAnalytics matchDetail={matchDetail} />}
        {tab === 'build' && (
          <MatchBuild matchId={matchDetail.matchId} perk={perk} />
        )}
      </div>
    </div>
  );
};

export default MatchDetail;
