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
