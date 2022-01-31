import { gql } from '@apollo/client';

export const BASIC_SUMMONER_INFO = gql`
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

export const COMMENTS = gql`
  query comments($count: Float!, $name: String!) {
    comments(count: $count, name: $name) {
      _id
      createdAt
      nickname
      text
    }
  }
`;

export const MASTERY = gql`
  query mastery($summonerId: String!, $count: Float!) {
    mastery(summonerId: $summonerId, count: $count) {
      championId
      championLevel
      championPoints
      iconPath
      lastPlayTime
    }
  }
`;

export const RECENT_MATCHES = gql`
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

export const POSTS = gql`
  query posts($createdAt: Float!, $limit: Float!) {
    posts(createdAt: $createdAt, limit: $limit) {
      createdAt
      name
      text
      title
    }
  }
`;
