import Path from 'config/path';
import Link from 'next/link';
import styles from './HeaderMenu.module.scss';
import { HeaderMenuType } from './HeaderMenuType';
import cn from 'classnames';

type Props = {
  activeMenu?: HeaderMenuType;
};

const HeaderMenu = ({ activeMenu }: Props) => {
  return (
    <div className={styles.menus}>
      <Link href={Path.home}>
        <a
          className={cn(styles.menu, {
            [styles.active]: activeMenu === 'summoner',
          })}
        >
          전적 검색
        </a>
      </Link>

      <Link href={Path.multi}>
        <a
          className={cn(styles.menu, {
            [styles.active]: activeMenu === 'multi',
          })}
        >
          멀티 서치
        </a>
      </Link>

      <Link href={Path.duo}>
        <a
          className={cn(styles.menu, {
            [styles.active]: activeMenu === 'duo',
          })}
        >
          듀오 신청
        </a>
      </Link>
    </div>
  );
};

export default HeaderMenu;
