import styles from './WinRateGraph.module.scss';
import Graph from './Graph';
import { useMemo } from 'react';
import { getWinRate } from 'lib/utils/utils';

type Props = {
  wins: number;
  losses: number;
  percent?: boolean;
  textVisible?: boolean;
};

const WinRateGraph = ({
  wins,
  losses,
  percent = false,
  textVisible = false,
}: Props) => {
  return (
    <div className={styles.layout}>
      <div className={styles.graph}>
        <Graph
          flexLength={wins}
          text={textVisible ? `${wins} 승` : ''}
          color="#00A2FF"
        />

        <Graph
          flexLength={losses}
          text={textVisible ? `${losses} 패` : ''}
          color="#F85959"
        />
      </div>
      {percent && (
        <div className={styles.percent}>{getWinRate(wins, losses)} %</div>
      )}
    </div>
  );
};

export default WinRateGraph;
