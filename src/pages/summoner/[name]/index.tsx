import SummonerCard from '@pages/Summoner/Card/SummonerCard';
import SubHeader from '@common/Header/SubHeader';
import Layout from '@common/Layout/Layout';
import PageTitleLayout from '@common/Layout/PageTitleLayout';
import { GetServerSidePropsContext } from 'next';
import SummonerMenu from '@common/Menu/SummonerMenu';
import styles from '@pages/Summoner/Summoner.module.scss';
import CommentList from '@pages/Summoner/List/CommentList';
import MasteryList from '@pages/Summoner/List/MasteryList';

const basicSummonerInfo = {
  freeRank: {
    leaguePoints: 17,
    losses: 17,
    rank: 'IV',
    tier: 'GOLD',
    wins: 20,
  },
  updatedAt: 1643245720678,
  iconPath:
    'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/0.png',
  id: 'cNzdPLFUnyV0RvH0HrIdLerm_DaOrYl-xpGPmBx0s0Zfyu67Z3cDDoYQHQ',
  name: '라이스케잌',
  profileIconId: 0,
  puuid:
    'KWxPJ8lfwiDvpyR9cQ_bpMRlvh_vfhFk4Fgi3WdW2a8OGloWCKjnagxD3vWoajQkBY9NAE3qOIbcnw',
  soleRank: {
    leaguePoints: 75,
    losses: 68,
    rank: 'II',
    tier: 'DIAMOND',
    wins: 84,
  },
  summonerLevel: 147,
};

const SummonerPage = ({ name }: { name: string }) => {
  return (
    <Layout subHeader={<SubHeader />} activeMenu="summoner">
      <PageTitleLayout title="전적 검색 결과">
        <SummonerCard summoner={basicSummonerInfo} />
        <div className={styles.menu}>
          <SummonerMenu activeMenu="index" name={name} />
        </div>
        <div className={styles.lists}>
          <CommentList name={basicSummonerInfo.name} />
          <MasteryList summonerId={basicSummonerInfo.id} />
        </div>
      </PageTitleLayout>
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const params = ctx.params;
  if (!params) {
    return;
  }

  return {
    props: {
      name: params.name,
    },
  };
}

export default SummonerPage;
