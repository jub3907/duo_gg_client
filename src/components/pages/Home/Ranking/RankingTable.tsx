import { Column } from 'lib/types/column';
import { SummonerBasic } from 'lib/types/summoner';
import { useMemo } from 'react';
import styles from './RankingTable.module.scss';
import cn from 'classnames';
import NameLink from '@common/Link/NameLink';
import WinRateGraph from '@common/Graph/WinRateGraph';
import Image from '@common/Image/Image';

type Props = {
  summoners: SummonerBasic[];
};

const Column = () => {
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

const row = (summoner: SummonerBasic, index: number) => {
  return (
    <div
      className={cn(styles.flex, styles.row)}
      key={`${summoner.name}-${index}`}
    >
      {summoner.soleRank && (
        <>
          <div className={styles.rank}>{index + 2}</div>
          <div className={styles.summoner}>
            <>
              <Image
                src={summoner.iconPath}
                alt="소환사아이콘"
                variant="circle"
                width={48}
                height={48}
                className={styles.image}
              />
              <NameLink name={summoner.name} />
            </>
          </div>
          <div className={styles.tier}>{summoner.soleRank.tier}</div>
          <div className={styles.lp}>{summoner.soleRank.leaguePoints}</div>
          <div className={styles.level}>{summoner.summonerLevel}</div>
          <div className={styles.rate}>
            <WinRateGraph
              wins={summoner.soleRank.wins}
              losses={summoner.soleRank.losses}
              percent
              textVisible
            />
          </div>
        </>
      )}
    </div>
  );
};

const RankingTable = ({ summoners }: Props) => {
  return (
    <>
      <Column />
      {summoners.map((summoner, index) => row(summoner, index))}
    </>
  );
};

export default RankingTable;
