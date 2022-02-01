import Image from '@common/Image/Image';
import { Entry } from 'lib/types/entry';
import { SummonerBasic } from 'lib/types/summoner';
import { getDateFromNow } from 'lib/utils/date';
import { getImagePath, getWinRate } from 'lib/utils/utils';
import styles from './SummonerCard.module.scss';
import RefreshSummonerButton from '@common/Button/RefreshSummonerButton';
import WinRateGraph from '@common/Graph/WinRateGraph';

type Props = {
  summoner: SummonerBasic;
};

// const SummonerInfo = ({ summoner }: Props) => {
//   return (
//     <div className={styles.flex}>
//   <Image
//     src={summoner.iconPath}
//     alt="소환사 아이콘"
//     width={120}
//     height={120}
//   />
//   <div className = {styles.info}
//     </div>
//   );
// };

const RankInfo = ({ rank, title }: { rank: Entry; title: string }) => {
  return (
    <div className={styles.flex}>
      <Image
        src={getImagePath(rank.tier, 'emblems')}
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
        src={getImagePath('Unranked', 'emblems')}
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

const SummonerCard = ({ summoner }: Props) => {
  return (
    <div className={styles.layout}>
      <div className={styles.flex}>
        <Image
          src={summoner.iconPath}
          alt="소환사 아이콘"
          width={120}
          height={120}
          variant="circle"
        />
        <div className={styles.info}>
          <div className={styles.name}>{summoner.name}</div>

          <div className={styles.time}>
            <div>업데이트: {getDateFromNow(summoner.updatedAt)}</div>
            <RefreshSummonerButton />
          </div>
        </div>
      </div>
      {summoner.soleRank ? (
        <RankInfo rank={summoner.soleRank} title="솔로 랭크" />
      ) : (
        <UnrankedInfo title="솔로 랭크" />
      )}

      {summoner.freeRank ? (
        <RankInfo rank={summoner.freeRank} title="자유 5:5 랭크" />
      ) : (
        <UnrankedInfo title="자유 5:5 랭크" />
      )}
    </div>
  );
};

export default SummonerCard;
