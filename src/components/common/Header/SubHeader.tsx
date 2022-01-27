import Container from '@common/Container/Container';
import SubHeaderSearch from '@common/Search/SummonerSearch';
import styles from './SubHeader.module.scss';

const SubHeader = () => {
  return (
    <div className={styles.background}>
      <Container layout={styles.layout}>
        <SubHeaderSearch />
      </Container>
    </div>
  );
};

export default SubHeader;
