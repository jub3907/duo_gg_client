import Layout from '@common/Layout/Layout';
import type { GetServerSidePropsContext } from 'next';
import HomeSubHeader from '@pages/Home/HomeSubHeader/HomeSubHeader';
import PageTitleLayout from '@common/Layout/PageTitleLayout';
import Ranking from '@pages/Home/Ranking/Ranking';
import apiPath from 'config/apiPath';
import { RankingType } from 'lib/types/ranking';

type Props = {
  rankings: RankingType[];
};

const Home = ({ rankings }: Props) => {
  return (
    <Layout subHeader={<HomeSubHeader />} activeMenu="summoner">
      <PageTitleLayout title="소환사 랭킹">
        <Ranking rankings={rankings} />
      </PageTitleLayout>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const uri = apiPath.base + apiPath.ranking + '?offset=0&limit=10';

  const res = await fetch(uri, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const data = await res.json();

  return {
    props: {
      rankings: data,
    },
  };
}
