import styles from '@pages/Comment/Comment.module.scss';
import SubHeader from '@common/Header/SubHeader';
import Layout from '@common/Layout/Layout';
import PageTitleLayout from '@common/Layout/PageTitleLayout';
import SummonerMenu from '@common/Menu/SummonerMenu';
import SummonerCard from '@pages/Summoner/Card/SummonerCard';
import { GetServerSidePropsContext } from 'next';
import CreateCommentForm from '@pages/Comment/Form/CreateCommentForm';
import CommentCard from '@pages/Comment/Card/CommentCard';
import { SummonerBasicType } from 'lib/types/summoner';
import { CommentType } from 'lib/types/comment';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  SummonerSliceType,
  clearSummonerState,
  initSummonerState,
} from 'lib/slice/summonerSlice';
import CircularLoading from '@common/Loading/CircularLoading';
import apiPath from 'config/apiPath';
import { AccountType } from 'lib/types/account';

type Props = {
  basicSummonerInfo: SummonerSliceType;
};

const SummonerCommentPage = ({ basicSummonerInfo }: Props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentType[]>([]);

  const getComments = (offset: number, limit: number) => {
    setIsLoading(true);
    const uri = (
      apiPath.base +
      apiPath.comment +
      `?offset=${offset}&limit=${limit}`
    ).replace('[puuid]', basicSummonerInfo.puuid);

    fetch(uri, {
      method: 'GET',
      next: { revalidate: 300 },
    })
      .then((res) => {
        if (!res.ok) {
          setIsError(true);
        }
        setIsLoading(false);
        return res.json();
      })
      .then((data: CommentType[]) => {
        setComments(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    dispatch(initSummonerState(basicSummonerInfo));
    getComments(0, 10);
  }, [basicSummonerInfo, dispatch]);

  useEffect(() => {
    return () => {
      setComments([]);
      dispatch(clearSummonerState());
    };
  }, [dispatch]);

  return (
    <Layout subHeader={<SubHeader />} activeMenu="summoner">
      <PageTitleLayout title="전적 검색 결과">
        <SummonerCard />
        <div className={styles.menu}>
          <SummonerMenu activeMenu="comment" />
        </div>
        <div className={styles.form}>
          <CreateCommentForm refetchComments={getComments} />
        </div>

        {isLoading ? (
          <CircularLoading />
        ) : (
          <div className={styles.comments}>
            {comments.map((comment) => {
              return (
                <CommentCard
                  refetchComments={getComments}
                  comment={comment}
                  key={comment.commentId}
                />
              );
            })}
          </div>
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

    const data: SummonerBasicType = await summonerGet.json();

    const accountUri =
      apiPath.base + apiPath.accountByPuuid + `?puuid=${data.puuid}`;

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

    const accountData: AccountType = await accountGet.json();

    return {
      props: {
        basicSummonerInfo: {
          ...data,
          gameName: accountData.gameName,
          tagLine: accountData.tagLine,
        },
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

    const accountData: AccountType = await accountGet.json();

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
        basicSummonerInfo: {
          gameName,
          tagLine,
          ...data,
        },
      },
    };
  }
}

export default SummonerCommentPage;
