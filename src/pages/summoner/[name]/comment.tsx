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
import { clearSummonerState, initSummonerState } from 'lib/slice/summonerSlice';
import CircularLoading from '@common/Loading/CircularLoading';
import apiPath from 'config/apiPath';

type Props = {
  basicSummonerInfo: SummonerBasicType;
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
  if (!params.name) {
    return {
      notFound: true,
    };
  }

  const uri = (apiPath.base + apiPath.summoner).replace(
    '[name]',
    params.name.toString(),
  );

  const postRes = await fetch(uri, {
    method: 'POST',
    next: { revalidate: 300 },
  });

  if (!postRes.ok) {
    return {
      notFound: true,
    };
  }

  const getRes = await fetch(uri, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300 },
  });

  if (!getRes.ok) {
    return {
      notFound: true,
    };
  }

  const data = await getRes.json();

  return {
    props: {
      basicSummonerInfo: data,
    },
  };
}

export default SummonerCommentPage;
