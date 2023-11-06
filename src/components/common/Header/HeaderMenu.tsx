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
      <Link
        href={Path.home}
        className={cn(styles.menu, {
          [styles.active]: activeMenu === 'summoner',
        })}
      >
        전적 검색
      </Link>

      <Link
        href={Path.multi}
        className={cn(styles.menu, {
          [styles.active]: activeMenu === 'multi',
        })}
      >
        멀티 서치
      </Link>

      <Link
        href={Path.duo}
        className={cn(styles.menu, {
          [styles.active]: activeMenu === 'duo',
        })}
      >
        듀오 신청
      </Link>
    </div>
  );
};

export default HeaderMenu;
