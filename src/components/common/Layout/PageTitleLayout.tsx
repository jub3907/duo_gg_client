import styles from './PageTitleLayout.module.scss';
import Container from '@common/Container/Container';
import { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

const PageTitleLayout = ({ title, children }: Props) => {
  return (
    <Container>
      <div className={styles.title}>{title}</div>
      <div className={styles.divider} />
      <div className={styles.layout}>{children}</div>
    </Container>
  );
};

export default PageTitleLayout;
