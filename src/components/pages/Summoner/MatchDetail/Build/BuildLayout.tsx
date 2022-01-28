import styles from './BuildLayout.module.scss';
import { ReactElement } from 'react';

type Props = {
  title: string;
  children: ReactElement | ReactElement[];
};
const BuildLayout = ({ title, children }: Props) => {
  return (
    <div>
      <div className={styles.title}>{title}</div>
      {children}
    </div>
  );
};

export default BuildLayout;
