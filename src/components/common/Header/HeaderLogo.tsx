import Path from 'config/path';
import Link from 'next/link';
import styles from './HeaderLogo.module.scss';

const HeaderLogo = () => {
  return (
    <Link href={Path.home} className={styles.logo}>
      Duo.gg
    </Link>
  );
};

export default HeaderLogo;
