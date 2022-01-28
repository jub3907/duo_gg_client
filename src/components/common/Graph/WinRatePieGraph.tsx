import styles from './WinRatePieGraph.module.scss';
import { useMemo } from 'react';
import PieGraph from './PieGraph';

type Props = {
  wins: number;
  losses: number;
};

const WinRatePieGraph = ({ wins, losses }: Props) => {
  const data = useMemo(() => {
    return {
      labels: ['패', '승'],
      datasets: [
        {
          data: [losses, wins],
          backgroundColor: ['rgba(248, 89, 89, 0.7)', 'rgba(0, 162, 255, 0.5)'],
          borderColor: ['rgba(248, 89, 89, 1)', 'rgba(0, 162, 255, 1)'],
          borderWidth: 0.5,
        },
      ],
    };
  }, [wins, losses]);

  return (
    <div className={styles.relative}>
      <div className={styles.percent}>
        <div>{(wins / (wins + losses)) * 100} %</div>
      </div>
      <div className={styles.graph}>
        <PieGraph data={data} />
      </div>
    </div>
  );
};

export default WinRatePieGraph;
