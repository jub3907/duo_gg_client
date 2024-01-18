import WinRateGraph from '@common/Graph/WinRateGraph';
import Image from '@common/Image/Image';
import { getImagePath } from 'lib/utils/utils';
import styles from './MultiSummonerCard.module.scss';
import cn from 'classnames';
import { getDateFromNow, getGameDuration } from 'lib/utils/date';
import List from '@common/List/List';
import { MatchBasicType } from 'lib/types/match';
import NameLink from '@common/Link/NameLink';
import { useEffect, useState } from 'react';
import { SummonerBasicType } from 'lib/types/summoner';
import produce from 'immer';
import { MasteryType } from 'lib/types/mastery';
import CircularLoading from '@common/Loading/CircularLoading';
import ReloadButton from '@common/Button/ReloadButton';
import apiPath from 'config/apiPath';
import { LeagueType } from 'lib/types/league';
import { getChampionName } from 'config/championKey';
import MultiLeagueCard from './MultiLeagueCard';
import MultiMasteryCard from './MultiMasteryCard';
import MultiMatchCard from './MultiMatchCard';

type Props = {
  name: string;
};

const MultiSummonerCard = ({ name }: Props) => {
  const [summoner, setSummoner] = useState<SummonerBasicType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getSummonerInfo = (name: string) => {
    setIsLoading(true);
    //TODO: 수정
    const uri = (apiPath.base + apiPath.summonerByPuuid).replace(
      '[name]',
      name,
    );

    fetch(uri, {
      method: 'POST',
      next: { revalidate: 300 },
    })
      .then((res) => {
        if (!res.ok) {
          setIsError(true);
          setIsLoading(false);
          return null;
        }
      })
      .then((data) => {
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
          .then((data: SummonerBasicType) => {
            setSummoner(data);
            setIsLoading(false);
          });
      });
  };

  useEffect(() => {
    if (name) {
      getSummonerInfo(name);
    }
  }, [name]);

  return (
    <div className={styles.layout}>
      {isLoading ? (
        <CircularLoading />
      ) : isError ? (
        <ReloadButton
          onClick={() => {
            getSummonerInfo(name);
          }}
          loading={isLoading}
        />
      ) : (
        summoner && (
          <>
            <div className={styles.name}>
              <NameLink name={summoner.name} />
            </div>
            <div className={styles.info}>
              <MultiLeagueCard name={name} />
            </div>
            <div className={styles.mastery}>
              <MultiMasteryCard summonerId={summoner.summonerId} />
            </div>
            <div className={styles.matches}>
              <MultiMatchCard puuid={summoner.puuid} />
            </div>
          </>
        )
      )}
    </div>
  );
};

export default MultiSummonerCard;
