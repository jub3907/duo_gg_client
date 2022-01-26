import styles from './WinRateGraph.module.scss';
import Graph from './Graph';
import { useMemo } from 'react';

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
  const winRate = useMemo(
    () => ((100 * wins) / (wins + losses)).toFixed(),
    [wins, losses],
  );

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
      {percent && <div className={styles.percent}>{winRate} %</div>}
    </div>
  );
};

export default WinRateGraph;
