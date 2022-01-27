import Container from '@common/Container/Container';
import styles from './HomeSubHeader.module.scss';
import HomeLogo from './HomeLogo';
import SubHeaderSearch from '@common/Search/SummonerSearch';

const HomeSubHeader = () => {
  return (
    <div className={styles.background}>
      <Container layout={styles.layout}>
        <div className={styles.logo}>
          <HomeLogo />
        </div>
        <SubHeaderSearch />
      </Container>
    </div>
  );
};

export default HomeSubHeader;
