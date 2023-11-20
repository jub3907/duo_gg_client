import { MatchBasicType } from 'lib/types/match';
import { useEffect, useState } from 'react';
import styles from './MatchDetail.module.scss';
import MatchTotal from './Total/MatchTotal';
import { MatchDetailType } from 'lib/types/match';
import MatchAnalytics from './Analytics/MatchAnalytics';
import MatchBuild from './Build/MatchBuild';
import { PerkType } from 'lib/types/participant';
import CircularLoading from '@common/Loading/CircularLoading';
import ReloadButton from '@common/Button/ReloadButton';
import apiPath from 'config/apiPath';
import { match } from 'assert';
import { useSelector } from 'react-redux';
import { selectSummonerState } from 'lib/slice/summonerSlice';
import MatchDetailMenu from './MatchDetailMenu';

type Props = {
  matchId: string;
};

export type MatchDetailMenuType = 'total' | 'analytics' | 'build';

//TODO: MatchBuild 구현
const MatchDetail = ({ matchId }: Props) => {
  const { puuid } = useSelector(selectSummonerState);
  const [tab, setTab] = useState<MatchDetailMenuType>('total');
  const onClickTab = (tab: MatchDetailMenuType) => {
    setTab(tab);
  };
  const [matchDetail, setMatchDetail] = useState<MatchDetailType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = (matchId: string, puuid: string) => {
    setIsLoading(true);
    const uri =
      apiPath.base + apiPath.matchDetail + `?matchId=${matchId}&puuid=${puuid}`;

    fetch(uri, {
      method: 'GET',
      next: { revalidate: 300 },
    })
      .then((res) => {
        if (!res.ok) {
          setIsError(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setMatchDetail(data);
      });
  };

  useEffect(() => {
    fetchData(matchId, puuid);
  }, [matchId, puuid]);

  useEffect(() => {
    return () => {
      setIsLoading(true);
      setMatchDetail(null);
    };
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.menus}>
        <MatchDetailMenu activeMenu={tab} onClickTab={onClickTab} />
      </div>
      <div className={styles.tab}>
        {isLoading && <CircularLoading />}
        {isError && (
          <ReloadButton
            onClick={() => {
              fetchData(matchId, puuid);
            }}
            loading={isLoading}
          />
        )}
        {matchDetail && (
          <>
            {tab === 'total' && <MatchTotal matchDetail={matchDetail} />}
            {tab === 'analytics' && (
              <MatchAnalytics matchDetail={matchDetail} />
            )}
          </>
        )}
        {tab === 'build' && (
          <MatchBuild matchId={matchId} perk={matchDetail.perk} />
        )}
      </div>
    </div>
  );
};

export default MatchDetail;
