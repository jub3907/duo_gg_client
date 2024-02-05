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
import { SummonerBasicType } from 'lib/types/summoner';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSummonerState, initSummonerState } from 'lib/slice/summonerSlice';
import {
  initMatchBasics,
  addMatchBasics,
  selectMatchBasicState,
  clearMatchBasicState,
} from 'lib/slice/matchBasicSlice';
import CircularLoading from '@common/Loading/CircularLoading';
import ErrorToast from '@common/Toast/ErrorToast';
import ReloadButton from '@common/Button/ReloadButton';
import apiPath from 'config/apiPath';
import { LoadingButton } from '@mui/lab';
import { Account } from 'lib/types/account';

type Props = {
  basicSummonerInfo: SummonerBasicType;
};

const SummonerPage = ({ basicSummonerInfo }: Props) => {
  const dispatch = useDispatch();
  const { count, matches } = useSelector(selectMatchBasicState);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = (start: number, count: number, reducer: 'add' | 'init') => {
    setIsLoading(true);

    const uri = (
      apiPath.base +
      apiPath.match +
      `?start=${start}&count=${count}`
    ).replace('[puuid]', basicSummonerInfo.puuid);

    fetch(uri, {
      method: 'POST',
      next: { revalidate: 300 },
    }).then((res) => {
      if (!res.ok) {
        setIsError(true);
        return null;
      }
      fetch(uri, {
        method: 'GET',
        next: { revalidate: 300 },
      })
        .then((res) => {
          if (!res.ok) {
            setIsError(true);
            return null;
          }
          return res.json();
        })
        .then((data: MatchBasicType[]) => {
          if (reducer == 'init') {
            dispatch(initMatchBasics(data));
          } else {
            dispatch(addMatchBasics(data));
          }
          setIsLoading(false);
        });
    });
  };

  useEffect(() => {
    dispatch(initSummonerState(basicSummonerInfo));
    fetchData(0, 10, 'init');
  }, [basicSummonerInfo.name]);

  useEffect(() => {
    return () => {
      dispatch(clearSummonerState());
      dispatch(clearMatchBasicState());
    };
  }, [basicSummonerInfo.name]);

  return (
    <Layout subHeader={<SubHeader />} activeMenu="summoner">
      <PageTitleLayout title="전적 검색 결과">
        <SummonerCard />
        <div className={styles.menu}>
          <SummonerMenu activeMenu="index" />
        </div>
        <div className={styles.lists}>
          <CommentList />
          <MasteryList />
        </div>
        {isLoading && <CircularLoading />}
        {isError && (
          <ReloadButton
            onClick={() => {
              fetchData(0, 10, 'init');
            }}
            loading={isLoading}
          />
        )}
        {matches && matches.length > 0 && (
          <>
            <div className={styles.summary}>
              <MatchSummaryCard matches={matches} />
            </div>

            <div className={styles.matches}>
              {matches.map((match: MatchBasicType, index) => {
                return <MatchBasicInfoCard match={match} key={match.matchId} />;
              })}

              <LoadingButton
                variant="outlined"
                className={styles.button}
                fullWidth
                loading={isLoading}
                onClick={() => {
                  fetchData(count, 5, 'add');
                }}
              >
                더보기
              </LoadingButton>
            </div>
          </>
        )}
      </PageTitleLayout>
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const params = ctx.params;

  if (!params.name || typeof params.name != 'string') {
    return {
      notFound: true,
    };
  }

  if (params.name.length > 40) {
    const summonerId = params.name;
    const summonerUri = (apiPath.base + apiPath.summonerById).replace(
      '[summonerId]',
      summonerId,
    );

    const summonerPost = await fetch(summonerUri, {
      method: 'POST',
      next: { revalidate: 300 },
    });

    if (!summonerPost.ok) {
      return {
        notFound: true,
      };
    }

    const summonerGet = await fetch(summonerUri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 },
    });

    if (!summonerGet.ok) {
      return {
        notFound: true,
      };
    }

    const data = await summonerGet.json();

    return {
      props: {
        basicSummonerInfo: data,
      },
    };
  } else {
    const arr = params.name.split('-');
    const gameName = params.name.includes('-') ? arr[0] : params.name;
    const tagLine = params.name.includes('-') ? arr[1] : 'KR1';

    const accountUri =
      apiPath.base +
      apiPath.accountByRiotId +
      `?gameName=${gameName}&tagLine=${tagLine}`;

    const accountPost = await fetch(accountUri, {
      method: 'POST',
      next: { revalidate: 300 },
    });

    if (!accountPost.ok) {
      return {
        notFound: true,
      };
    }

    const accountGet = await fetch(accountUri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 },
    });

    if (!accountGet.ok) {
      return {
        notFound: true,
      };
    }

    const accountData: Account = await accountGet.json();

    const summonerUri = (apiPath.base + apiPath.summonerByPuuid).replace(
      '[puuid]',
      accountData.puuid,
    );

    const summonerPost = await fetch(summonerUri, {
      method: 'POST',
      next: { revalidate: 300 },
    });

    if (!summonerPost.ok) {
      return {
        notFound: true,
      };
    }

    const summonerGet = await fetch(summonerUri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 },
    });

    if (!summonerGet.ok) {
      return {
        notFound: true,
      };
    }

    const data = await summonerGet.json();

    return {
      props: {
        basicSummonerInfo: data,
      },
    };
  }
}

export default SummonerPage;
