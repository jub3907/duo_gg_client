import Layout from '@common/Layout/Layout';
import Container from '@common/Container/Container';
import type { NextPage } from 'next';
import HomeSubHeader from '@pages/Home/HomeSubHeader/HomeSubHeader';

const Home: NextPage = () => {
  return (
    <Layout subHeader={<HomeSubHeader />} activeMenu="summoner">
      <Container>home</Container>
      <Container>home2</Container>
    </Layout>
  );
};

export default Home;
