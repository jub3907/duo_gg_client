import { MatchBasicType } from 'lib/types/match';
import styles from './MultiMatchCard.module.scss';
import Image from '@common/Image/Image';
import { getImagePath } from 'lib/utils/utils';
import { getChampionName } from 'config/championKey';
import { useEffect, useState } from 'react';
import apiPath from 'config/apiPath';
import List from '@common/List/List';
import ReloadButton from '@common/Button/ReloadButton';
import CircularLoading from '@common/Loading/CircularLoading';

const Matches = ({
  recentMatches,
  isLoading,
}: {
  recentMatches: MatchBasicType[];
  isLoading: boolean;
}) => {
  return (
    <>
      {isLoading ? (
        <CircularLoading />
      ) : (
        recentMatches &&
        recentMatches.map((match, index) => {
          return (
            <div
              className={styles.flex}
              key={`match-${match.matchId}-${match.championName}`}
            >
              <div className={styles.result}>
                <Image
                  src={getImagePath(
                    getChampionName(match.championId),
                    'champion',
                  )}
                  alt="챔피언 아이콘"
                  width={25}
                  height={25}
                  variant="circle"
                />
                {match.isWin ? (
                  <div className={styles.win}>승리</div>
                ) : (
                  <div className={styles.loss}>패배</div>
                )}
              </div>

              <div className={styles.stat}>
                {match.kills} / {match.deaths} / {match.assists}
              </div>

              <div className={styles.position}>{match.teamPosition}</div>
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

const MultiMatchCard = ({ puuid }: Props) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<MatchBasicType[]>(null);

  const getRecentMatches = (puuid: string) => {
    setIsLoading(true);

    const uri = (apiPath.base + apiPath.match + `?start=0&count=3`).replace(
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
      fetch(uri, {
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
        .then((data: MatchBasicType[]) => {
          setMatches(data);
          setIsLoading(false);
        });
    });
  };

  useEffect(() => {
    if (puuid) {
      getRecentMatches(puuid);
    }
  }, [puuid]);

  return (
    <List
      title="최근 플레이"
      contents={<Matches recentMatches={matches} isLoading={isLoading} />}
      loading={isLoading}
      error={null}
      reloadButton={
        <ReloadButton
          onClick={() => {
            getRecentMatches(puuid);
          }}
          loading={isLoading}
        />
      }
    />
  );
};

export default MultiMatchCard;
