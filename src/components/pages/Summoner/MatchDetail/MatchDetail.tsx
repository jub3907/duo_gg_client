import { MatchBasicType } from 'lib/types/match';
import { useEffect, useState } from 'react';
import styles from './MatchDetail.module.scss';
import MatchDetailMenu from './MatchDetailMenu';
import MatchTotal from './Total/MatchTotal';
import { MatchDetailType } from 'lib/types/match';
import MatchAnalytics from './Analytics/MatchAnalytics';
import MatchBuild from './Build/MatchBuild';
import { PerkType } from 'lib/types/participant';
import { gql, useLazyQuery } from '@apollo/client';
import CircularLoading from '@common/Loading/CircularLoading';
import ReloadButton from '@common/Button/ReloadButton';

const MATCH_DETAIL = gql`
  query matchDetail($matchId: String!) {
    matchDetail(matchId: $matchId) {
      blue {
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
      gameCreation
      gameDuration
      matchId
      matchType
      red {
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
  const [matchInfo, setMatchInfo] = useState<MatchDetailType>(null);

  const [matchDetail, { loading, error }] = useLazyQuery(MATCH_DETAIL, {
    onCompleted: ({ matchDetail }) => {
      setMatchInfo(matchDetail);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    matchDetail({ variables: { matchId } });
  }, [matchId]);

  useEffect(() => {
    return () => {
      setMatchInfo(null);
    };
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.menus}>
        <MatchDetailMenu activeMenu={tab} onClickTab={onClickTab} />
      </div>
      <div className={styles.tab}>
        {loading && <CircularLoading />}
        {error && (
          <ReloadButton
            onClick={() => matchDetail({ variables: { matchId } })}
            loading={loading}
          />
        )}
        {matchInfo && (
          <>
            {tab === 'total' && <MatchTotal matchDetail={matchInfo} />}
            {tab === 'analytics' && <MatchAnalytics matchDetail={matchInfo} />}
          </>
        )}
        {tab === 'build' && <MatchBuild matchId={matchId} perk={perk} />}
      </div>
    </div>
  );
};

export default MatchDetail;
