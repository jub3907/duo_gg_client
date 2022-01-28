import styles from './MatchTatal.module.scss';
import { MatchDetailType } from 'lib/types/match';
import { getMatchDetailSummary } from 'lib/utils/utils';
import cn from 'classnames';
import { Icon } from '@mui/material';
import CellTowerIcon from '@mui/icons-material/CellTower';
import WinRateGraph from '@common/Graph/WinRateGraph';
import MatchParticipantCard from '../Card/MatchParticipantCard';

type Props = {
  matchDetail: MatchDetailType;
};

const Winner = ({ wins, teamId }: { wins: number; teamId: number }) => {
  if (wins === teamId) {
    return <div className={styles.win}>승</div>;
  }
  return <div className={styles.loss}>패</div>;
};

const MatchTotal = ({
  matchDetail: { gameCreation, gameDuration, matchId, matchType, red, blue },
}: Props) => {
  const { wins, blueSummary, redSummary } = getMatchDetailSummary(red, blue);

  return (
    <div className={styles.layout}>
      <div className={styles.flex}>
        <div className={cn(cn(styles.summary, styles.flex), styles.flex)}>
          <Winner wins={wins} teamId={100} />

          <div className={styles.team}>블루팀</div>
          <div className={cn(styles.icons, styles.flex)}>
            <div className={cn(styles.icon, styles.flex)}>
              <CellTowerIcon fontSize="small" />
              <div>{blueSummary.baronKills}</div>
            </div>
            <div className={cn(styles.icon, styles.flex)}>
              <CellTowerIcon fontSize="small" />
              <div>{blueSummary.dragonKills}</div>
            </div>
            <div className={cn(styles.icon, styles.flex)}>
              <CellTowerIcon fontSize="small" />
              <div>{blueSummary.turretKills}</div>
            </div>
          </div>
        </div>
        <div className={cn(styles.info, styles.flex)}>
          <div className={cn(styles.summary, styles.flex)}>
            <div className={styles.head}>TOTAL KILL</div>
            <div className={styles.count}>{blueSummary.kills}</div>
            <div className={styles.graph}>
              <WinRateGraph
                wins={blueSummary.kills}
                losses={redSummary.kills}
              />
            </div>
            <div className={styles.count}>{redSummary.kills}</div>
          </div>

          <div className={cn(styles.summary, styles.flex)}>
            <div className={styles.head}>TOTAL GOLD</div>
            <div className={styles.count}>
              {blueSummary.goldEarned.toLocaleString()}
            </div>
            <div className={styles.graph}>
              <WinRateGraph
                wins={blueSummary.goldEarned}
                losses={redSummary.goldEarned}
              />
            </div>
            <div className={styles.count}>
              {redSummary.goldEarned.toLocaleString()}
            </div>
          </div>
        </div>

        <div className={cn(styles.summary, styles.flex)}>
          <div className={cn(styles.icons, styles.flex)}>
            <div className={cn(styles.icon, styles.flex)}>
              <CellTowerIcon fontSize="small" />
              <div>{blueSummary.baronKills}</div>
            </div>
            <div className={cn(styles.icon, styles.flex)}>
              <CellTowerIcon fontSize="small" />
              <div>{blueSummary.dragonKills}</div>
            </div>
            <div className={cn(styles.icon, styles.flex)}>
              <CellTowerIcon fontSize="small" />
              <div>{blueSummary.turretKills}</div>
            </div>
          </div>

          <div className={styles.team}>레드팀</div>

          <Winner wins={wins} teamId={200} />
        </div>
      </div>

      <div className={styles.grid}>
        {blue.map((participant, index) => {
          return (
            <MatchParticipantCard
              key={`${matchId}-${participant.participantId}`}
              participant={participant}
            />
          );
        })}

        {red.map((participant, index) => {
          return (
            <MatchParticipantCard
              key={`${matchId}-${participant.participantId}`}
              participant={participant}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MatchTotal;
