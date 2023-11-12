import styles from './RankingCard.module.scss';
import Image from '@common/Image/Image';
import WinRateGraph from '@common/Graph/WinRateGraph';
import NameLink from '@common/Link/NameLink';
import { RankingType } from 'lib/types/ranking';
import { getImagePath } from 'lib/utils/utils';

type Props = {
  ranking: RankingType;
};

const RankingCard = ({ ranking }: Props) => {
  //TODO: Profile Icon Id
  return (
    <div className={styles.card}>
      <>
        <div className={styles.image}>
          <Image
            src={getImagePath(ranking.profileIconId, 'profileicon')}
            alt="소환사아이콘"
            width={120}
            height={120}
            variant="circle"
          />
        </div>

        <div className={styles.info}>
          <div className={styles.name}>
            <NameLink name={ranking.summonerName} />
          </div>
          <div className={styles.rank}>
            <div>{ranking.tier}</div>
            <div>{ranking.leaguePoints} LP</div>
            <div>Lv. {ranking.summonerLevel ? ranking.summonerLevel : 100}</div>
          </div>
          <div className={styles.rate}>
            <WinRateGraph
              wins={ranking.wins}
              losses={ranking.losses}
              percent
              textVisible
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default RankingCard;
