import SubHeader from '@common/Header/SubHeader';
import Layout from '@common/Layout/Layout';
import PageTitleLayout from '@common/Layout/PageTitleLayout';
import MultiSearchForm from '@pages/Multi/Form/MultiSearchForm';
import SummonerCard from '@pages/Summoner/Card/SummonerCard';
import styles from '@pages/Multi/MultiSearch.module.scss';
import MultiSummonerCard from '@pages/Multi/Card/MultiSummonerCard';

const names = ['Duo TOP', 'Duo MID', 'Duo JUG', 'Duo BOT', 'Duo SUP'];

const MultiSearchPage = () => {
  return (
    <Layout subHeader={<SubHeader />} activeMenu="multi">
      <PageTitleLayout title="멀티서치">
        <MultiSearchForm />
        <div className={styles.grid}>
          {names.map((name) => {
            return (
              <MultiSummonerCard name={name} key={`summoner-info-${name}`} />
            );
          })}
        </div>
      </PageTitleLayout>
    </Layout>
  );
};

export default MultiSearchPage;
