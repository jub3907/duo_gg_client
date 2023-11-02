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
import { SummonerBasic } from 'lib/types/summoner';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearSummonerState, initSummonerState } from 'lib/slice/summonerSlice';
import CircularLoading from '@common/Loading/CircularLoading';
import ErrorToast from '@common/Toast/ErrorToast';
import ReloadButton from '@common/Button/ReloadButton';

type Props = {
  basicSummonerInfo: SummonerBasic;
};

const SummonerPage = ({ basicSummonerInfo }: Props) => {
  const dispatch = useDispatch();
  const [matches, setMatches] = useState([]);
  // const [recentMatch, { loading, error }] = useMutation<{
  //   recentMatches: MatchBasicType[];
  // }>(RECENT_MATCHES, {
  //   variables: { count: 10, name: basicSummonerInfo.name },
  //   onCompleted: ({ recentMatches }) => {
  //     setMatches(recentMatches);
  //   },
  //   onError: (e) => {
  //     ErrorToast('매치 정보를 불러오는데 실패했어요.');
  //   },
  // });

  // useEffect(() => {
  //   dispatch(initSummonerState(basicSummonerInfo));

  //   recentMatch();
  // }, [basicSummonerInfo, dispatch, recentMatch]);

  useEffect(() => {
    return () => {
      dispatch(clearSummonerState());
      setMatches([]);
    };
  }, [basicSummonerInfo.name, dispatch]);

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
        {/* {loading && <CircularLoading />}
        {error && (
          <ReloadButton
            onClick={() => {
              recentMatch();
            }}
            loading={loading}
          />
        )} */}
        {matches && matches.length > 0 && (
          <>
            <div className={styles.summary}>
              <MatchSummaryCard matches={matches} />
            </div>

            <div className={styles.matches}>
              {matches.map((match: MatchBasicType, index) => {
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
  if (!params) {
    return {
      notFound: true,
    };
  }

  try {
    // const { data } = await apolloClient.mutate<Props>({
    //   mutation: BASIC_SUMMONER_INFO,
    //   variables: {
    //     name: params.name,
    //   },
    // });
    // if (!data) {
    //   return {
    //     notFound: true,
    //   };
    // }
    // return {
    //   props: {
    //     basicSummonerInfo: data.basicSummonerInfo,
    //   },
    // };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
}

export default SummonerPage;
