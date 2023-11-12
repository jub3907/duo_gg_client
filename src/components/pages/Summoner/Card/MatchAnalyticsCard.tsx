import styles from './MatchAnalyticsCard.module.scss';
import { ParticipantDetailType } from 'lib/types/participant';
import Graph from '@common/Graph/Graph';
import PieGraph from '@common/Graph/PieGraph';
import { useMemo } from 'react';
import Image from '@common/Image/Image';
import { getImagePath } from 'lib/utils/utils';
import { getChampionName } from 'config/championKey';

type Props = {
  title: string;
  dataKey:
    | 'kills'
    | 'goldEarned'
    | 'totalDamageDealtToChampions'
    | 'wardsPlaced'
    | 'totalDamageTaken'
    | 'totalMinionsKilled';
  red: ParticipantDetailType[];
  blue: ParticipantDetailType[];
};
//
const MatchAnalyticsCard = ({ red, blue, title, dataKey }: Props) => {
  const redSummary = useMemo(
    () =>
      red.reduce((acc, val) => {
        acc += val[dataKey];
        return acc;
      }, 0),
    [red, dataKey],
  );

  const redMax = useMemo(
    () =>
      Math.max.apply(
        Math,
        red.map((participant) => {
          return participant[dataKey];
        }),
      ) * 1.2,
    [red, dataKey],
  );

  const blueSummary = useMemo(
    () =>
      blue.reduce((acc, val) => {
        acc += val[dataKey];
        return acc;
      }, 0),
    [blue, dataKey],
  );

  const blueMax = useMemo(
    () =>
      Math.max.apply(
        Math,
        blue.map((participant) => {
          return participant[dataKey];
        }),
      ) * 1.2,
    [blue, dataKey],
  );

  return (
    <div className={styles.layout}>
      <div className={styles.title}>{title}</div>
      <div className={styles.body}>
        <div className={styles.stat}>
          <div className={styles.team}>
            {blue.map((participant) => {
              return (
                <div
                  className={styles.participant}
                  key={`${participant.totalDamageDealtToChampions}-${participant.puuid}-${dataKey}`}
                >
                  <Image
                    src={getImagePath(
                      getChampionName(participant.championId),
                      'champion',
                    )}
                    alt="아이콘"
                    width={16}
                    height={16}
                  />
                  <Graph
                    color="#00a2ff"
                    width={`${(100 * participant[dataKey]) / blueMax}%`}
                    className={styles.bar}
                    text={participant[dataKey].toFixed()}
                  />
                </div>
              );
            })}
          </div>
          <div className={styles.graph}>
            <PieGraph
              red={redSummary}
              blue={blueSummary}
              labels={[`레드팀 ${title}`, `블루팀 ${title}`]}
              Center={
                <div className={styles.desc}>
                  <div className={styles.blue}>
                    {blueSummary.toLocaleString()}
                  </div>
                  <div className={styles.vs}>VS</div>
                  <div className={styles.red}>
                    {redSummary.toLocaleString()}
                  </div>
                </div>
              }
            />
          </div>
          <div className={styles.team}>
            {red.map((participant) => {
              return (
                <div
                  className={styles.participant}
                  key={`${participant.totalDamageDealtToChampions}-${participant.puuid}-${dataKey}`}
                >
                  <Image
                    src={getImagePath(
                      getChampionName(participant.championId),
                      'champion',
                    )}
                    alt="아이콘"
                    width={16}
                    height={16}
                  />
                  <Graph
                    color="#f85959"
                    width={`${(100 * participant[dataKey]) / redMax}%`}
                    className={styles.bar}
                    text={participant[dataKey].toFixed()}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchAnalyticsCard;
