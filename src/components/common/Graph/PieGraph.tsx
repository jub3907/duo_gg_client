import styles from './PieGraph.module.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ReactElement, ReactNode, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

type Props = {
  red: number;
  blue: number;
  labels: string[];
  Center?: ReactNode;
};

const PieGraph = ({ red, blue, labels, Center }: Props) => {
  const data = useMemo(() => {
    return {
      labels: labels,
      datasets: [
        {
          data: [red, blue],
          backgroundColor: ['rgba(248, 89, 89, 0.7)', 'rgba(0, 162, 255, 0.5)'],
          borderColor: ['rgba(248, 89, 89, 1)', 'rgba(0, 162, 255, 1)'],
          borderWidth: 0.5,
        },
      ],
    };
  }, [red, blue, labels]);

  const options = { responsive: true, cutout: '80%' };

  return (
    <div className={styles.relative}>
      {Center}
      <div className={styles.graph}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default PieGraph;
