import ReloadButton from '@common/Button/ReloadButton';
import Image from '@common/Image/Image';
import List from '@common/List/List';
import { selectSummonerState } from 'lib/slice/summonerSlice';
import { MasteryType } from 'lib/types/mastery';
import { getDateFromNow } from 'lib/utils/date';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './MasteryList.module.scss';
import apiPath from 'config/apiPath';
import { getImagePath } from 'lib/utils/utils';

const Masteries = ({ masteries }: { masteries: MasteryType[] }) => {
  return (
    <>
      {masteries &&
        masteries.length > 0 &&
        masteries.map((mastery, index) => {
          return (
            <div
              className={styles.mastery}
              key={`mastery-${mastery.championId}-${index}`}
            >
              <div className={styles.flex}>
                <Image
                  src={getImagePath(mastery.championId, 'champion')}
                  alt="챔피언 아이콘"
                  width={40}
                  height={40}
                  variant="circle"
                />
              </div>
              <div className={styles.info}>
                <div className={styles.score}>
                  {mastery.championPoints.toLocaleString()}점
                </div>
                <div className={styles.level}>Lv. {mastery.championLevel}</div>

                <div className={styles.date}>
                  {getDateFromNow(mastery.lastPlayTime)}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

const MasteryList = () => {
  const { summonerId } = useSelector(selectSummonerState);
  const [masteries, setMasteries] = useState<MasteryType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const uri = (apiPath.base + apiPath.masteryBySummoner).replace(
    '[summonerId]',
    summonerId,
  );

  const fetchData = () => {
    fetch(uri, {
      method: 'POST',
      next: { revalidate: 300 },
    }).then(() => {
      const getUri = uri + '?offset=0&limit=3';

      fetch(getUri, {
        method: 'GET',
        next: { revalidate: 300 },
      })
        .then((res) => {
          if (!res.ok) {
            return null;
          }
          return res.json();
        })
        .then((data) => {
          setMasteries(data);
          setLoading(false);
        });
    });
  };

  useEffect(() => {
    if (summonerId !== '') {
      fetchData();
    }
  }, [summonerId]);

  return (
    <List
      title="숙련도 정보"
      contents={<Masteries masteries={masteries} />}
      error={null}
      loading={isLoading}
      reloadButton={
        <ReloadButton
          onClick={() => {
            fetchData();
          }}
          className={styles.reload}
          loading={isLoading}
        />
      }
    />
  );
};

export default MasteryList;
