import Image from '@common/Image/Image';
import { getDateFromNow } from 'lib/utils/date';
import { getImagePath, getWinRate } from 'lib/utils/utils';
import styles from './SummonerCard.module.scss';
import RefreshSummonerButton from '@common/Button/RefreshSummonerButton';
import WinRateGraph from '@common/Graph/WinRateGraph';
import { useSelector } from 'react-redux';
import { selectSummonerState } from 'lib/slice/summonerSlice';
import { useEffect, useState } from 'react';
import apiPath from 'config/apiPath';
import { LeagueType } from 'lib/types/league';

const RankInfo = ({ rank, title }: { rank: LeagueType; title: string }) => {
  return (
    <div className={styles.flex}>
      <Image
        src={getImagePath(rank.tier, 'tier')}
        alt={`${rank.tier} 티어 이미지`}
        width={102}
        height={116}
      />
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.tier}>
          {rank.tier} {rank.rank}, {rank.leaguePoints}LP
        </div>
        <WinRateGraph wins={rank.wins} losses={rank.losses} />
        <div className={styles.rate}>
          <div>
            {rank.wins}승 {rank.losses}패
          </div>
          <div>승률 {getWinRate(rank.wins, rank.losses)}%</div>
        </div>
      </div>
    </div>
  );
};

const UnrankedInfo = ({ title }: { title: string }) => {
  return (
    <div className={styles.flex}>
      <Image
        src={getImagePath('Unranked', 'tier')}
        alt={`언랭크 티어 이미지`}
        width={100}
        height={100}
      />
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.tier}>Unranked</div>
      </div>
    </div>
  );
};

const SummonerCard = () => {
  const { name, profileIconId, revisionDate } =
    useSelector(selectSummonerState);
  const [soloRank, setSoloRank] = useState<LeagueType>(null);
  const [freeRank, setFreeRank] = useState<LeagueType>(null);

  useEffect(() => {
    const uri = (apiPath.base + apiPath.league).replace('[name]', name);

    fetch(uri, {
      method: 'POST',
      next: { revalidate: 300 },
    }).then(() => {
      const soloUri = (apiPath.base + apiPath.leagueSolo).replace(
        '[name]',
        name,
      );

      const freeUri = (apiPath.base + apiPath.leagueFree).replace(
        '[name]',
        name,
      );

      fetch(soloUri, {
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
          setSoloRank(data);
        });

      fetch(freeUri, {
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
          setFreeRank(data);
        });
    });
  }, [name]);

  useEffect(() => {
    return () => {
      setSoloRank(null);
      setFreeRank(null);
    };
  }, [name]);

  return (
    <div className={styles.layout}>
      <div className={styles.flex}>
        <Image
          src={getImagePath(profileIconId ? profileIconId : 0, 'profileicon')}
          alt="소환사 아이콘"
          width={120}
          height={120}
          variant="circle"
        />
        <div className={styles.info}>
          <div className={styles.name}>{name}</div>

          <div className={styles.time}>
            <div>업데이트: {getDateFromNow(revisionDate)}</div>
            <RefreshSummonerButton />
          </div>
        </div>
      </div>
      {soloRank ? (
        <RankInfo rank={soloRank} title="솔로 랭크" />
      ) : (
        <UnrankedInfo title="솔로 랭크" />
      )}

      {freeRank ? (
        <RankInfo rank={freeRank} title="자유 5:5 랭크" />
      ) : (
        <UnrankedInfo title="자유 5:5 랭크" />
      )}
    </div>
  );
};

export default SummonerCard;
