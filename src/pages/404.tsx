import SubHeader from '@common/Header/SubHeader';
import Layout from '@common/Layout/Layout';
import PageTitleLayout from '@common/Layout/PageTitleLayout';
import styles from '@pages/404/404Page.module.scss';

const Custom404Page = () => {
  return (
    <Layout subHeader={<SubHeader />} activeMenu="summoner">
      <PageTitleLayout title="전적 검색 결과">
        <div className={styles.title}>
          리그오브레전드에 등록되지 않은 소환사입니다.
        </div>
        <div className={styles.caption}>
          오타를 확인하고 다시 검색해 주세요!
        </div>
      </PageTitleLayout>
    </Layout>
  );
};

export default Custom404Page;
