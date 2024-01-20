import { LeagueType } from 'lib/types/league';
import styles from './MultiLeagueCard.module.scss';
import Image from '@common/Image/Image';
import { getImagePath } from 'lib/utils/utils';
import WinRateGraph from '@common/Graph/WinRateGraph';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import apiPath from 'config/apiPath';
import CircularLoading from '@common/Loading/CircularLoading';

const RankInfo = ({ rank: soleRank }: { rank: LeagueType }) => {
  return (
    <>
      <div className={styles.rank}>
        <Image
          src={getImagePath(soleRank.tier, 'tier')}
          alt={`티어 이미지`}
          width={21}
          height={24}
        />
        <div className={styles.tier}>
          {soleRank.tier} {soleRank.rank}, {soleRank.leaguePoints}LP
        </div>
      </div>
      <WinRateGraph wins={soleRank.wins} losses={soleRank.losses} textVisible />
    </>
  );
};

const UnRankInfo = () => {
  return (
    <div className={cn(styles.rank, styles.unrank)}>
      <Image
        src={getImagePath('Unranked', 'tier')}
        alt={`언랭크 티어 이미지`}
        width={24}
        height={24}
      />
      <div className={styles.tier}>Unranked</div>
    </div>
  );
};

type Props = {
  puuid: string;
};

const MultiLeagueCard = ({ puuid }: Props) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [league, setLeague] = useState<LeagueType>(null);

  const getLeague = (puuid: string) => {
    setIsLoading(true);
    const postUri = (apiPath.base + apiPath.league).replace('[puuid]', puuid);

    fetch(postUri, {
      method: 'POST',
      next: { revalidate: 300 },
    }).then((res) => {
      if (!res.ok) {
        setIsError(true);
        setIsLoading(false);
        return null;
      }

      const getUri = (apiPath.base + apiPath.leagueSolo).replace(
        '[puuid]',
        puuid,
      );

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
        .then((data: LeagueType) => {
          setLeague(data);
          setIsLoading(false);
        });
    });
  };

  useEffect(() => {
    if (puuid) {
      getLeague(puuid);
    }
  }, [puuid]);

  return isLoading ? (
    <CircularLoading />
  ) : league ? (
    <RankInfo rank={league} />
  ) : (
    <UnRankInfo />
  );
};

export default MultiLeagueCard;
