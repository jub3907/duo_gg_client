import { CircularProgress } from '@mui/material';
import styles from './CircularLoading.module.scss';

const CircularLoading = () => {
  return (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  );
};

export default CircularLoading;
