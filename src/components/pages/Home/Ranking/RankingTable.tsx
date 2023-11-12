import { Column } from 'lib/types/column';
import { SummonerBasicType } from 'lib/types/summoner';
import { useMemo } from 'react';
import styles from './RankingTable.module.scss';
import cn from 'classnames';
import NameLink from '@common/Link/NameLink';
import WinRateGraph from '@common/Graph/WinRateGraph';
import Image from '@common/Image/Image';
import { RankingType } from 'lib/types/ranking';
import { getImagePath } from 'lib/utils/utils';

type Props = {
  rankings: RankingType[];
};

const TableColumn = () => {
  return (
    <div className={cn(styles.flex, styles.column)}>
      <div className={styles.rank}>랭킹</div>
      <div className={styles.summoner}>소환사</div>
      <div className={styles.tier}>티어</div>
      <div className={styles.lp}>LP</div>
      <div className={styles.level}>레벨</div>
      <div className={styles.rate}>승률</div>
    </div>
  );
};

//TODO: Profile Icon Id
const row = (ranking: RankingType, index: number) => {
  return (
    <div
      className={cn(styles.flex, styles.row)}
      key={`${ranking.summonerName}-${index}`}
    >
      <>
        <div className={styles.rank}>{index + 2}</div>
        <div className={styles.summoner}>
          <>
            <Image
              src={getImagePath(ranking.profileIconId, 'profileicon')}
              alt="소환사아이콘"
              variant="circle"
              width={48}
              height={48}
              className={styles.image}
            />
            <NameLink name={ranking.summonerName} />
          </>
        </div>
        <div className={styles.tier}>{ranking.tier}</div>
        <div className={styles.lp}>{ranking.leaguePoints}</div>
        <div className={styles.level}>
          {ranking.summonerLevel ? ranking.summonerLevel : 100}
        </div>
        <div className={styles.rate}>
          <WinRateGraph
            wins={ranking.wins}
            losses={ranking.losses}
            percent
            textVisible
          />
        </div>
      </>
    </div>
  );
};

const RankingTable = ({ rankings }: Props) => {
  return (
    <>
      <TableColumn />
      {rankings.map((ranking, index) => row(ranking, index))}
    </>
  );
};

export default RankingTable;
