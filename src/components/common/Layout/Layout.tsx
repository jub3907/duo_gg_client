import { ReactNode } from 'react';
import Header from '../Header/Header';
import { HeaderMenuType } from '../Header/HeaderMenuType';
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode;
  subHeader: ReactNode;
  activeMenu: HeaderMenuType;
};

const Layout = ({ children, subHeader, activeMenu }: Props) => {
  return (
    <>
      <Header activeMenu={activeMenu} />
      <div className={styles.layout}>
        <div className={styles.scroll}>
          {subHeader}
          <div className={styles.container}>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
