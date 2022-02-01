import Path from 'config/path';
import Link from 'next/link';
import styles from './HeaderLogo.module.scss';

const HeaderLogo = () => {
  return (
    <Link href={Path.home}>
      <a className={styles.logo}>Duo.gg</a>
    </Link>
  );
};

export default HeaderLogo;
