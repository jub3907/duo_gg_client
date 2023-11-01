import SubHeader from '@common/Header/SubHeader';
import Layout from '@common/Layout/Layout';
import PageTitleLayout from '@common/Layout/PageTitleLayout';
import MultiSearchForm from '@pages/Multi/Form/MultiSearchForm';
import SummonerCard from '@pages/Summoner/Card/SummonerCard';
import styles from '@pages/Multi/MultiSearch.module.scss';
import MultiSummonerCard from '@pages/Multi/Card/MultiSummonerCard';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { parseMultiSearchInput, preventEvent } from 'lib/utils/utils';

const names = ['Duo TOP', 'Duo MID', 'Duo JUG', 'Duo BOT', 'Duo SUP'];

const MultiSearchPage = () => {
  const [text, setText] = useState('');
  const [names, setNames] = useState([]);
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: any) => {
      preventEvent(e);
      setNames(parseMultiSearchInput(text));
    },
    [text],
  );

  return (
    <Layout subHeader={<SubHeader />} activeMenu="multi">
      <PageTitleLayout title="멀티서치">
        <MultiSearchForm text={text} onChange={onChange} onSubmit={onSubmit} />
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
