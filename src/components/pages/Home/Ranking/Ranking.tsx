import styles from './Ranking.module.scss';
import RankingCard from './RankingCard';
import RankingTable from './RankingTable';
import { RankingType } from 'lib/types/ranking';

type Props = {
  rankings: RankingType[];
};

const Ranking = ({ rankings }: Props) => {
  return (
    <>
      <div className={styles.card}>
        <RankingCard ranking={rankings[0]} />
      </div>
      <RankingTable rankings={rankings.slice(1)} />
    </>
  );
};

export default Ranking;
