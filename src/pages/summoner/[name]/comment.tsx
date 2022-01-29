import styles from '@pages/Comment/Comment.module.scss';
import SubHeader from '@common/Header/SubHeader';
import Layout from '@common/Layout/Layout';
import PageTitleLayout from '@common/Layout/PageTitleLayout';
import SummonerMenu from '@common/Menu/SummonerMenu';
import SummonerCard from '@pages/Summoner/Card/SummonerCard';
import { GetServerSidePropsContext } from 'next';
import CreateCommentForm from '@pages/Comment/Form/CreateCommentForm';
import CommentCard from '@pages/Comment/Card/CommentCard';

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

const comments = [
  {
    _id: '61ef74afe397ccb38e4b4453',
    createdAt: 1643082927078,
    nickname: '패배1',
    text: '댓글이에요',
  },
  {
    _id: '61ef74b1e397ccb38e4b4457',
    createdAt: 1643082929931,
    nickname: '패배',
    text: '오우야2',
  },
  {
    _id: '61ef74b4e397ccb38e4b445c',
    createdAt: 1643082932068,
    nickname: '패배2',
    text: '오우야3',
  },
  {
    _id: '61ef74b5e397ccb38e4b4462',
    createdAt: 1643082933881,
    nickname: '패배',
    text: '오우야4',
  },
  {
    _id: '61ef74b7e397ccb38e4b4469',
    createdAt: 1643082935708,
    nickname: '패배',
    text: '오우야5',
  },
];

const SummonerCommentPage = ({ name }: { name: string }) => {
  return (
    <Layout subHeader={<SubHeader />} activeMenu="summoner">
      <PageTitleLayout title="전적 검색 결과">
        <SummonerCard summoner={basicSummonerInfo} />
        <div className={styles.menu}>
          <SummonerMenu activeMenu="comment" name={name} />
        </div>
        <div className={styles.form}>
          <CreateCommentForm name={basicSummonerInfo.name} />
        </div>

        <div className={styles.comments}>
          {comments.map((comment) => {
            return <CommentCard comment={comment} key={comment._id} />;
          })}
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

export default SummonerCommentPage;
