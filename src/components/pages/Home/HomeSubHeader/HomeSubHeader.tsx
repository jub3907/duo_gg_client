import Container from '@common/Container/Container';
import styles from './HomeSubHeader.module.scss';
import HomeLogo from './HomeLogo';
import SubHeaderSearchForm from '@common/Search/SummonerSearch';

const HomeSubHeader = () => {
  return (
    <div className={styles.background}>
      <Container container={styles.container} layout={styles.layout}>
        <div className={styles.logo}>
          <HomeLogo />
        </div>
        <SubHeaderSearchForm />
      </Container>
    </div>
  );
};

export default HomeSubHeader;
