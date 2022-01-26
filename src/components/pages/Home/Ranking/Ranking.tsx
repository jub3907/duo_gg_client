import { SummonerBasic } from 'lib/types/summoner';
import styles from './Ranking.module.scss';
import RankingCard from './RankingCard';
import RankingTable from './RankingTable';

type Props = {
  summoners: SummonerBasic[];
};

const Ranking = ({ summoners }: Props) => {
  return (
    <>
      <div className={styles.card}>
        <RankingCard summoner={summoners[0]} />
      </div>
      <RankingTable summoners={summoners.slice(1)} />
    </>
  );
};

export default Ranking;
