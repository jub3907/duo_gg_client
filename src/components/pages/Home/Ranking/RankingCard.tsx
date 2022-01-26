import styles from './RankingCard.module.scss';
import { SummonerBasic } from 'lib/types/summoner';
import Image from '@common/Image/Image';
import WinRateGraph from '@common/Graph/WinRateGraph';
import NameLink from '@common/Link/NameLink';

type Props = {
  summoner: SummonerBasic;
};

const RankingCard = ({ summoner }: Props) => {
  return (
    <div className={styles.card}>
      {summoner.soleRank && (
        <>
          <div className={styles.image}>
            <Image
              src={summoner.iconPath}
              alt="소환사아이콘"
              width={120}
              height={120}
              variant="circle"
            />
          </div>

          <div className={styles.info}>
            <div className={styles.name}>
              <NameLink name={summoner.name} />
            </div>
            <div className={styles.rank}>
              <div>{summoner.soleRank.tier}</div>
              <div>{summoner.soleRank.leaguePoints} LP</div>
              <div>{summoner.summonerLevel} Lv</div>
            </div>
            <div className={styles.rate}>
              <WinRateGraph
                wins={summoner.soleRank.wins}
                losses={summoner.soleRank.losses}
                percent
                textVisible
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RankingCard;
