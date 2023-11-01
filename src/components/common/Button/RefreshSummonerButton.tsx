import styles from './RefreshSummonerButton.module.scss';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const RefreshSummonerButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="outlined"
      fullWidth
      onClick={() => {
        router.reload();
      }}
    >
      전적 갱신
    </Button>
  );
};

export default RefreshSummonerButton;
