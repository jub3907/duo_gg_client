import SubHeader from '@common/Header/SubHeader';
import Layout from '@common/Layout/Layout';
import PageTitleLayout from '@common/Layout/PageTitleLayout';
import MultiSearchForm from '@pages/Multi/Form/MultiSearchForm';
import SummonerCard from '@pages/Summoner/Card/SummonerCard';

const MultiSearchPage = () => {
  return (
    <Layout subHeader={<SubHeader />} activeMenu="multi">
      <PageTitleLayout title="멀티서치">
        <MultiSearchForm />
      </PageTitleLayout>
    </Layout>
  );
};

export default MultiSearchPage;
