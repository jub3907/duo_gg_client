import ReloadButton from '@common/Button/ReloadButton';
import Image from '@common/Image/Image';
import List from '@common/List/List';
import ErrorToast from '@common/Toast/ErrorToast';
import { selectSummonerState } from 'lib/slice/summonerSlice';
import { MasteryType } from 'lib/types/mastery';
import { getDateFromNow } from 'lib/utils/date';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './MasteryList.module.scss';

// TODO: 챔피언 이름 받아오기

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
                  src={mastery.iconPath}
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
  const { id } = useSelector(selectSummonerState);
  // const [mastery, { data, loading, error }] = useLazyQuery<{
  //   mastery: MasteryType[];
  // }>(MASTERY, {
  //   variables: {
  //     summonerId: id,
  //     count: 3,
  //   },
  //   onError: (e) => {
  //     ErrorToast('숙련도 정보를 불러오는데 실패했어요.');
  //   },
  // });

  useEffect(() => {
    if (id !== '') {
      mastery();
    }
  }, [id, mastery]);

  return (
    <List
      title="숙련도 정보"
      contents={<Masteries masteries={data?.mastery} />}
      error={error}
      loading={loading}
      reloadButton={
        <ReloadButton
          onClick={() => {
            mastery();
          }}
          className={styles.reload}
          loading={loading}
        />
      }
    />
  );
};

export default MasteryList;
