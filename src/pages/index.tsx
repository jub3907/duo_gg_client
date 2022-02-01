import Layout from '@common/Layout/Layout';
import Container from '@common/Container/Container';
import type { GetServerSidePropsContext, NextPage } from 'next';
import HomeSubHeader from '@pages/Home/HomeSubHeader/HomeSubHeader';
import PageTitleLayout from '@common/Layout/PageTitleLayout';
import Ranking from '@pages/Home/Ranking/Ranking';
import { initializeApollo, withApollo } from 'lib/apollo/apolloClient';
import { gql } from '@apollo/client';
import { SummonerBasic } from 'lib/types/summoner';

const RANKING = gql`
  mutation ranking {
    ranking {
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

export default withApollo(Home);

export async function getStaticProps(ctx: GetServerSidePropsContext) {
  const apolloClient = initializeApollo(ctx);
  const { data } = await apolloClient.mutate<Props>({
    mutation: RANKING,
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ranking: data.ranking,
    },
    revalidate: 300,
  };
}
