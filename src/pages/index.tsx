import Layout from '@common/Layout/Layout';
import Container from '@common/Container/Container';
import type { GetServerSidePropsContext, NextPage } from 'next';
import HomeSubHeader from '@pages/Home/HomeSubHeader/HomeSubHeader';
import PageTitleLayout from '@common/Layout/PageTitleLayout';
import Ranking from '@pages/Home/Ranking/Ranking';
import { SummonerBasic } from 'lib/types/summoner';

type Props = {
  ranking: SummonerBasic[];
};

const Home = ({ ranking }: Props) => {
  return (
    <Layout subHeader={<HomeSubHeader />} activeMenu="summoner">
      <PageTitleLayout title="소환사 랭킹">
        <Ranking summoners={ranking} />
      </PageTitleLayout>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  //TODO: Basic Summoner Info Rest API

  // if (!data) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    // props: {
    //   ranking: data.ranking,
    // },
    // revalidate: 300,
  };
}
