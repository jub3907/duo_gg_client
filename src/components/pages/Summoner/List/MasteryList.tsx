import { gql, useMutation, useQuery } from '@apollo/client';
import Image from '@common/Image/Image';
import List from '@common/List/List';
import { selectSummonerState } from 'lib/slice/summonerSlice';
import { MasteryType } from 'lib/types/mastery';
import { getDateFromNow } from 'lib/utils/date';
import { MASTERY } from 'lib/utils/query';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './MasteryList.module.scss';

// TODO: 챔피언 이름 받아오기

const MasteryList = () => {
  const { id } = useSelector(selectSummonerState);
  const { data } = useQuery<{ mastery: MasteryType[] }>(MASTERY, {
    skip: !id,
    variables: {
      summonerId: id,
      count: 3,
    },
  });

  const Masteries = ({ masteries }: { masteries: MasteryType[] }) => {
    if (!masteries) {
      return <div>Loading</div>;
    }

    return (
      <>
        {masteries.map(
          (
            {
              championId,
              championLevel,
              championPoints,
              iconPath,
              lastPlayTime,
            },
            index,
          ) => {
            return (
              <div
                className={styles.mastery}
                key={`mastery-${championId}-${index}`}
              >
                <div className={styles.flex}>
                  <Image
                    src={iconPath}
                    alt="챔피언 아이콘"
                    width={40}
                    height={40}
                    variant="circle"
                  />
                </div>
                <div className={styles.info}>
                  <div className={styles.score}>
                    {championPoints.toLocaleString()}점
                  </div>
                  <div className={styles.level}>Lv. {championLevel}</div>

                  <div className={styles.date}>
                    {getDateFromNow(lastPlayTime)}
                  </div>
                </div>
              </div>
            );
          },
        )}
      </>
    );
  };

  return (
    <List
      title="숙련도 정보"
      contents={<Masteries masteries={data?.mastery} />}
    />
  );
};

export default MasteryList;
