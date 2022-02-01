import styles from '@pages/Comment/Comment.module.scss';
import SubHeader from '@common/Header/SubHeader';
import Layout from '@common/Layout/Layout';
import PageTitleLayout from '@common/Layout/PageTitleLayout';
import SummonerMenu from '@common/Menu/SummonerMenu';
import SummonerCard from '@pages/Summoner/Card/SummonerCard';
import { GetServerSidePropsContext } from 'next';
import CreateCommentForm from '@pages/Comment/Form/CreateCommentForm';
import CommentCard from '@pages/Comment/Card/CommentCard';
import { initializeApollo, withApollo } from 'lib/apollo/apolloClient';
import { BASIC_SUMMONER_INFO, COMMENTS } from 'lib/utils/query';
import { SummonerBasic } from 'lib/types/summoner';
import { useQuery } from '@apollo/client';
import { CommentType } from 'lib/types/comment';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { clearSummonerState, initSummonerState } from 'lib/slice/summonerSlice';
import CircularLoading from '@common/Loading/CircularLoading';

type Props = {
  basicSummonerInfo: SummonerBasic;
};

const SummonerCommentPage = ({ basicSummonerInfo }: Props) => {
  const dispatch = useDispatch();

  const { data, loading, error } = useQuery<{ comments: CommentType[] }>(
    COMMENTS,
    {
      skip: !basicSummonerInfo,
      variables: { name: basicSummonerInfo.name, count: 10 },
      onError: (e) => {
        console.log('error', e);
      },
    },
  );

  useEffect(() => {
    dispatch(initSummonerState(basicSummonerInfo));
  }, [basicSummonerInfo, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearSummonerState());
    };
  }, [dispatch]);

  return (
    <Layout subHeader={<SubHeader />} activeMenu="summoner">
      <PageTitleLayout title="전적 검색 결과">
        <SummonerCard summoner={basicSummonerInfo} />
        <div className={styles.menu}>
          <SummonerMenu activeMenu="comment" />
        </div>
        <div className={styles.form}>
          <CreateCommentForm />
        </div>

        {loading && <CircularLoading />}
        {data && data.comments && (
          <div className={styles.comments}>
            {data.comments.map((comment) => {
              return <CommentCard comment={comment} key={comment._id} />;
            })}
          </div>
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

export default withApollo(SummonerCommentPage);
