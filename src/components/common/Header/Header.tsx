import Container from '../Container/Container';
import HeaderLogo from './HeaderLogo';
import styles from './Header.module.scss';
import HeaderMenu from './HeaderMenu';
import { HeaderMenuType } from './HeaderMenuType';

type Props = {
  activeMenu?: HeaderMenuType;
};
const Header = ({ activeMenu }: Props) => {
  return (
    <div className={styles.layout}>
      <Container container={styles.container}>
        <div className={styles.logo}>
          <HeaderLogo />
        </div>

        <HeaderMenu activeMenu={activeMenu} />
      </Container>
    </div>
  );
};

export default Header;
