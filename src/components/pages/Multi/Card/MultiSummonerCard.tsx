import WinRateGraph from '@common/Graph/WinRateGraph';
import Image from '@common/Image/Image';
import { Entry } from 'lib/types/entry';
import { getImagePath } from 'lib/utils/utils';
import styles from './MultiSummonerCard.module.scss';
import cn from 'classnames';
import { getDateFromNow, getGameDuration } from 'lib/utils/date';
import List from '@common/List/List';
import { MatchBasicType } from 'lib/types/match';
import NameLink from '@common/Link/NameLink';
import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { BASIC_SUMMONER_INFO, MASTERY, RECENT_MATCHES } from 'lib/utils/query';
import { SummonerBasic } from 'lib/types/summoner';
import produce from 'immer';
import { MasteryType } from 'lib/types/mastery';
import CircularLoading from '@common/Loading/CircularLoading';
import ReloadButton from '@common/Button/ReloadButton';

type Props = {
  name: string;
};

const RankInfo = ({ rank: soleRank }: { rank: Entry }) => {
  return (
    <>
      <div className={styles.rank}>
        <Image
          src={getImagePath(soleRank.tier, 'emblems')}
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
        src={getImagePath('Unranked', 'emblems')}
        alt={`언랭크 티어 이미지`}
        width={24}
        height={24}
      />
      <div className={styles.tier}>Unranked</div>
    </div>
  );
};

const Masteries = ({ masteries }: { masteries: MasteryType[] }) => {
  return (
    <>
      {masteries &&
        masteries.length > 0 &&
        masteries.map((mastery, index) => {
          return (
            <div
              className={styles.flex}
              key={`mastery-${mastery.championId}-${index}`}
            >
              <Image
                src={mastery.iconPath}
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
        })}
    </>
  );
};

const Matches = ({ recentMatches }: { recentMatches: MatchBasicType[] }) => {
  return (
    <>
      {recentMatches &&
        recentMatches.length > 0 &&
        recentMatches.map((match, index) => {
          return (
            <div
              className={styles.flex}
              key={`match-${match.matchId}-${match.summonerInGameData.summonerName}`}
            >
              <div className={styles.result}>
                <Image
                  src={match.summonerInGameData.championIconPath}
                  alt="챔피언 아이콘"
                  width={25}
                  height={25}
                  variant="circle"
                />
                {match.summonerInGameData.win ? (
                  <div className={styles.win}>승리</div>
                ) : (
                  <div className={styles.loss}>패배</div>
                )}
              </div>

              <div className={styles.stat}>
                {match.summonerInGameData.kills} /{' '}
                {match.summonerInGameData.deaths} /{' '}
                {match.summonerInGameData.assists}
              </div>

              <div className={styles.position}>
                {match.summonerInGameData.individualPosition}
              </div>
            </div>
          );
        })}
    </>
  );
};

const MultiSummonerCard = ({ name }: Props) => {
  const [info, setInfo] = useState<{
    basicSummonerInfo: SummonerBasic;
    recentMatches: MatchBasicType[];
    mastery: MasteryType[];
  }>({
    basicSummonerInfo: null,
    recentMatches: null,
    mastery: null,
  });

  const [basicSummonerInfo, { loading: infoLoading, error: infoError }] =
    useMutation<{
      basicSummonerInfo: SummonerBasic;
    }>(BASIC_SUMMONER_INFO, {
      onCompleted: async ({ basicSummonerInfo }) => {
        console.log(basicSummonerInfo);
        setInfo(
          produce(info, (draft) => {
            draft.basicSummonerInfo = basicSummonerInfo;
          }),
        );

        await recentMatches({
          variables: { name: basicSummonerInfo.name, count: 3 },
        });

        await mastery({
          variables: { summonerId: basicSummonerInfo.id, count: 3 },
        });
      },
      onError: (e) => {
        console.log(e);
      },
    });

  const [recentMatches, { loading: matchLoading, error: matchError }] =
    useMutation<{
      recentMatches: MatchBasicType[];
    }>(RECENT_MATCHES, {
      onCompleted: ({ recentMatches }) => {
        setInfo(
          produce(info, (draft) => {
            draft.recentMatches = recentMatches;
          }),
        );
      },
      onError: (e) => {
        console.log(e);
      },
    });

  const [mastery, { loading: masteryLoading, error: masteryError }] =
    useLazyQuery<{
      mastery: MasteryType[];
    }>(MASTERY, {
      onCompleted: ({ mastery }) => {
        console.log(mastery);
        setInfo(
          produce(info, (draft) => {
            draft.mastery = mastery;
          }),
        );
      },
      onError: (e) => {
        console.log(e);
      },
    });

  useEffect(() => {
    basicSummonerInfo({ variables: { name } });
  }, [name]);

  return (
    <div className={styles.layout}>
      {infoLoading && <CircularLoading />}
      {info.basicSummonerInfo && (
        <>
          <div className={styles.name}>
            <NameLink name={info.basicSummonerInfo.name} />
          </div>
          <div className={styles.info}>
            {info.basicSummonerInfo.soleRank ? (
              <RankInfo rank={info.basicSummonerInfo.soleRank} />
            ) : (
              <UnRankInfo />
            )}
          </div>
          <div className={styles.mastery}>
            <List
              title="숙련도 정보"
              contents={<Masteries masteries={info.mastery} />}
              loading={masteryLoading}
              error={masteryError}
              reloadButton={
                <ReloadButton
                  onClick={() => {
                    recentMatches({
                      variables: {
                        name: info.basicSummonerInfo.name,
                        count: 3,
                      },
                    });
                  }}
                  loading={masteryLoading}
                />
              }
            />
          </div>
          {info.recentMatches && (
            <div className={styles.matches}>
              <List
                title="최근 플레이"
                contents={<Matches recentMatches={info.recentMatches} />}
                loading={matchLoading}
                error={matchError}
                reloadButton={
                  <ReloadButton
                    onClick={() => {
                      mastery({
                        variables: {
                          summonerId: info.basicSummonerInfo.id,
                          count: 3,
                        },
                      });
                    }}
                    loading={matchLoading}
                  />
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MultiSummonerCard;
