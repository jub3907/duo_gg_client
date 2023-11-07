import { getSummonerCommentUrl, getSummonerUrl } from 'config/path';
import Link from 'next/link';
import styles from './SummonerMenu.module.scss';
import cn from 'classnames';
import { selectSummonerState } from 'lib/slice/summonerSlice';
import { useSelector } from 'react-redux';

type MenuType = 'index' | 'statistic' | 'comment';

type Props = {
  activeMenu: MenuType;
};
const SummonerMenu = ({ activeMenu }: Props) => {
  const { name } = useSelector(selectSummonerState);

  return (
    <>
      <div className={styles.menus}>
        <Link
          href={getSummonerUrl(name)}
          className={cn(styles.menu, {
            [styles.active]: activeMenu === 'index',
          })}
        >
          전적 종합
        </Link>

        {/* <Link href={getSummonerStatUrl(name)}>
          <a
            className={cn(styles.menu, {
              [styles.active]: activeMenu === 'statistic',
            })}
          >
            통계
          </a>
        </Link> */}

        <Link
          href={getSummonerCommentUrl(name)}
          className={cn(styles.menu, {
            [styles.active]: activeMenu === 'comment',
          })}
        >
          소환사에게 한마디
        </Link>
      </div>

      <div className={styles.divider} />
    </>
  );
};

export default SummonerMenu;
