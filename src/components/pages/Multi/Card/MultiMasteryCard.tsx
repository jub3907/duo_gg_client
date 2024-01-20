import { MasteryType } from 'lib/types/mastery';
import styles from './MultiMasteryCard.module.scss';
import { getImagePath } from 'lib/utils/utils';
import { getChampionName } from 'config/championKey';
import Image from '@common/Image/Image';
import { getDateFromNow } from 'lib/utils/date';
import { useEffect, useState } from 'react';
import apiPath from 'config/apiPath';
import CircularLoading from '@common/Loading/CircularLoading';
import List from '@common/List/List';
import ReloadButton from '@common/Button/ReloadButton';

const Masteries = ({
  masteries,
  isLoading,
}: {
  masteries: MasteryType[];
  isLoading: boolean;
}) => {
  return (
    <>
      {isLoading ? (
        <CircularLoading />
      ) : (
        masteries &&
        masteries.map((mastery, index) => {
          return (
            <div
              className={styles.flex}
              key={`mastery-${mastery.championId}-${index}`}
            >
              <Image
                src={getImagePath(
                  getChampionName(mastery.championId),
                  'champion',
                )}
                alt="챔피언 아이콘"
                width={30}
                height={30}
                variant="circle"
              />

              <div className={styles.score}>
                {mastery.championPoints.toLocaleString()}점
              </div>
              <div className={styles.date}>
                {getDateFromNow(mastery.lastPlayTime)}
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

type Props = {
  puuid: string;
};

const MultiMasteryCard = ({ puuid }: Props) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [masteries, setMasteries] = useState<MasteryType[]>(null);

  const getMastery = (puuid: string) => {
    setIsLoading(true);
    const uri = (apiPath.base + apiPath.masteryByPuuid).replace(
      '[puuid]',
      puuid,
    );

    fetch(uri, {
      method: 'POST',
      next: { revalidate: 300 },
    }).then((res) => {
      if (!res.ok) {
        setIsError(true);
        setIsLoading(false);
        return null;
      }

      const getUri = uri + '?offset=0&limit=3';

      fetch(getUri, {
        method: 'GET',
        next: { revalidate: 300 },
      })
        .then((res) => {
          if (!res.ok) {
            setIsError(true);
            setIsLoading(false);
            return null;
          }
          return res.json();
        })
        .then((data: MasteryType[]) => {
          setMasteries(data);
          setIsLoading(false);
        });
    });
  };

  useEffect(() => {
    if (puuid) {
      getMastery(puuid);
    }
  }, [puuid]);

  return (
    <>
      <List
        title="숙련도 정보"
        contents={<Masteries masteries={masteries} isLoading={isLoading} />}
        loading={isLoading}
        error={null}
        reloadButton={
          <ReloadButton
            onClick={() => {
              getMastery(puuid);
            }}
            loading={isLoading}
          />
        }
      />
    </>
  );
};

export default MultiMasteryCard;
