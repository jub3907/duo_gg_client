import PieGraph from '@common/Graph/PieGraph';
import WinRatePieGraph from '@common/Graph/WinRatePieGraph';
import Image from '@common/Image/Image';
import { MatchBasicType } from 'lib/types/match';
import { getImagePath, getMatchSummary, getWinRate } from 'lib/utils/utils';
import styles from './MatchSummaryCard.module.scss';

type Props = {
  matches: MatchBasicType[];
};

type PostionInfoProps = {
  total: number;
  data: {
    total: number;
    wins: number;
    losses: number;
  };
  type: 'TOP' | 'MID' | 'JUNGLE' | 'BOTTOM' | 'UTILITY' | 'Invalid';
};

const PositionInfo = ({ total, data, type }: PostionInfoProps) => {
  return (
    <div className={styles.row} key={`${type}`}>
      <Image
        src={getImagePath(type, 'positions')}
        alt={`${type} 이미지`}
        width={40}
        height={40}
      />
      <div>
        <div>픽률 {(100 * data.total) / total} %</div>
        <div>
          승률 {data.total === 0 ? 0 : getWinRate(data.wins, data.losses)} %
        </div>
      </div>
    </div>
  );
};

const MatchSummaryCard = ({ matches }: Props) => {
  const {
    total,
    wins,
    losses,
    kills,
    deaths,
    assists,
    TOP,
    JUNGLE,
    MID,
    BOTTOM,
    UTILITY,
    Invalid,
  } = getMatchSummary(matches);

  return (
    <div className={styles.layout}>
      <div className={styles.flex}>
        <div className={styles.title}>최근 게임 승률</div>
        <div className={styles.ingame}>
          <div className={styles.graph}>
            <WinRatePieGraph wins={wins} losses={losses} />
          </div>
          <div className={styles.score}>
            <div className={styles.win}>
              {total}전 {wins}승 {losses}패
            </div>
            <div className={styles.kill}>
              {(kills / total).toFixed(1)} / {(deaths / total).toFixed(1)} /{' '}
              {(assists / total).toFixed(1)}
            </div>
            <div className={styles.rate}>
              {((kills + assists) / deaths).toFixed(1)} : 1
            </div>
          </div>
        </div>
      </div>

      <div className={styles.flex}>
        <div className={styles.title}>포지션 정보</div>

        <div className={styles.grid}>
          <div className={styles.column}>
            <PositionInfo total={total} data={TOP} type="TOP" />
            <PositionInfo total={total} data={MID} type="MID" />
            <PositionInfo total={total} data={JUNGLE} type="JUNGLE" />
          </div>
          <div className={styles.column}>
            <PositionInfo total={total} data={BOTTOM} type="TOP" />
            <PositionInfo total={total} data={UTILITY} type="UTILITY" />
            {/* <PositionInfo total={total} data={Invalid} type="Invalid" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchSummaryCard;
