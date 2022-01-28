import styles from './MatchDetailMenu.module.scss';
import { MatchDetailMenu } from './MatchDetail';
import { Button } from '@mui/material';
import cn from 'classnames';

type Props = {
  activeMenu: 'total' | 'analytics' | 'build';
  onClickTab: (tab: MatchDetailMenu) => void;
};
const MatchDetailMenu = ({ activeMenu, onClickTab }: Props) => {
  return (
    <div className={styles.menus}>
      <Button
        onClick={() => {
          onClickTab('total');
        }}
        className={cn(styles.button, {
          [styles.active]: activeMenu === 'total',
        })}
        variant="outlined"
      >
        전적 총합
      </Button>

      <Button
        onClick={() => {
          onClickTab('analytics');
        }}
        className={cn(styles.button, {
          [styles.active]: activeMenu === 'analytics',
        })}
        variant="outlined"
      >
        팀 분석
      </Button>

      <Button
        onClick={() => {
          onClickTab('build');
        }}
        className={cn(styles.button, {
          [styles.active]: activeMenu === 'build',
        })}
        variant="outlined"
      >
        빌드
      </Button>
    </div>
  );
};

export default MatchDetailMenu;
