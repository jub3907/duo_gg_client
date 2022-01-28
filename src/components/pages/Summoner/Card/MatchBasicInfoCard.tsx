import styles from './MatchBasicInfoCard.module.scss';
import { MatchBasicType } from 'lib/types/match';
import { getDateFromNow, getGameDuration } from 'lib/utils/date';
import Image from '@common/Image/Image';
import cn from 'classnames';
import { Button } from '@mui/material';
import { style } from '@mui/system';
import NameLink from '@common/Link/NameLink';
import { useCallback, useState } from 'react';
import MatchDetail from '../MatchDetail/MatchDetail';
import { getRate } from 'lib/utils/utils';

type Props = {
  match: MatchBasicType;
};

const MatchBasicInfoCard = ({
  match: {
    gameCreation,
    gameDuration,
    matchId,
    matchType,
    participants,
    puuid,
    summonerInGameData,
  },
}: Props) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const onClick = useCallback(() => {
    setDetailOpen(!detailOpen);
  }, [detailOpen]);

  return (
    <div>
      <div
        className={cn(styles.layout, { [styles.blue]: summonerInGameData.win })}
      >
        <div className={styles.summary}>
          <div className={styles.type}>{matchType}</div>
          <div className={styles.date}>{getDateFromNow(gameCreation)}</div>
          {summonerInGameData.win ? (
            <div className={styles.win}>승리</div>
          ) : (
            <div className={styles.loss}>패배</div>
          )}
          <div className={styles.date}>{getGameDuration(gameDuration)}</div>
        </div>
        <div className={styles.divider} />
        <div className={styles.ingame}>
          <Image
            src={summonerInGameData.championIconPath}
            alt="챔피언 아이콘"
            width={81}
            height={81}
            variant="circle"
            key={`${matchId}-${summonerInGameData.championId}`}
          />
          <div className={styles.spell}>
            {summonerInGameData.summoners.map((spell, index) => {
              return (
                <Image
                  src={spell.iconPath}
                  alt={`스펠 아이콘 ${index}`}
                  width={34}
                  height={34}
                  key={`spell-icon-${matchId}-${spell.index}`}
                />
              );
            })}
          </div>

          <div className={styles.score}>
            <div className={styles.kill}>
              {summonerInGameData.kills} / {summonerInGameData.deaths} /{' '}
              {summonerInGameData.assists}
            </div>
            <div className={styles.rate}>
              {getRate(
                summonerInGameData.kills,
                summonerInGameData.deaths,
                summonerInGameData.assists,
              )}{' '}
              : 1 평점
            </div>
          </div>

          <div className={styles.items}>
            {summonerInGameData.items.map((item, index) => {
              return item.iconPath === '' ? (
                <div
                  key={`item-icon-${matchId}-${item.id}-${item.index}`}
                  className={styles.blank}
                ></div>
              ) : (
                <Image
                  src={item.iconPath}
                  alt={`아이템 ${index}`}
                  width={34}
                  height={34}
                  key={`item-icon-${matchId}-${item.id}`}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.meta}>
          <div className={styles.index}>
            <div>딜량</div>
            <div>골드</div>
            <div>CS</div>
          </div>

          <div className={styles.value}>
            <div>
              {summonerInGameData.totalDamageDealtToChampions.toLocaleString()}
            </div>
            <div>{summonerInGameData.goldEarned.toLocaleString()}</div>
            <div>
              {summonerInGameData.totalMinionsKilled} (
              {(
                (summonerInGameData.totalMinionsKilled * 60) /
                gameDuration
              ).toFixed(1)}
              )
            </div>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.participants}>
          {participants.map((participant, index) => {
            return (
              <div
                className={styles.participant}
                key={`${matchId}-${summonerInGameData.championId}-${participant.participantId}`}
              >
                <Image
                  src={participant.championIconPath}
                  alt="챔피언 아이콘"
                  width={17}
                  height={17}
                  variant="circle"
                />
                <div className={styles.name}>
                  <NameLink name={participant.summonerName} />
                </div>
              </div>
            );
          })}
        </div>
        <Button onClick={onClick}>1</Button>
      </div>
      {detailOpen && <MatchDetail matchId={matchId} />}
    </div>
  );
};

export default MatchBasicInfoCard;
