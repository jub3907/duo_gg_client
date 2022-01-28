import styles from './MatchAnalytics.module.scss';
import { MatchDetailType } from 'lib/types/match';
import MatchAnalyticsCard from '../Card/MatchAnalyticsCard';

type Props = {
  matchDetail: MatchDetailType;
};

const MatchAnalytics = ({ matchDetail }: Props) => {
  return (
    <div className={styles.layout}>
      <div className={styles.grid}>
        <MatchAnalyticsCard
          title="챔피언 처치"
          dataKey="kills"
          red={matchDetail.red}
          blue={matchDetail.blue}
        />

        <MatchAnalyticsCard
          title="골드 획득량"
          dataKey="goldEarned"
          red={matchDetail.red}
          blue={matchDetail.blue}
        />

        <MatchAnalyticsCard
          title="챔피언에게 가한 피해량"
          dataKey="totalDamageDealtToChampions"
          red={matchDetail.red}
          blue={matchDetail.blue}
        />
      </div>

      <div className={styles.grid}>
        <MatchAnalyticsCard
          title="와드 설치"
          dataKey="wardsPlaced"
          red={matchDetail.red}
          blue={matchDetail.blue}
        />

        <MatchAnalyticsCard
          title="받은 피해량"
          dataKey="totalDamageTaken"
          red={matchDetail.red}
          blue={matchDetail.blue}
        />

        <MatchAnalyticsCard
          title="미니언 처치"
          dataKey="totalMinionsKilled"
          red={matchDetail.red}
          blue={matchDetail.blue}
        />
      </div>
    </div>
  );
};

export default MatchAnalytics;
