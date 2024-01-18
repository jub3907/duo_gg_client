import styles from './MatchBasicInfoCard.module.scss';
import { MatchBasicType } from 'lib/types/match';
import { getDateFromNow, getGameDuration } from 'lib/utils/date';
import Image from '@common/Image/Image';
import cn from 'classnames';
import { Button } from '@mui/material';
import { style } from '@mui/system';
import NameLink from '@common/Link/NameLink';
import { useCallback, useState } from 'react';
import { ImageType, getImagePath, getRate } from 'lib/utils/utils';
import { IoIosArrowDown } from 'react-icons/io';
import { getChampionName } from 'config/championKey';
import { getSpellName } from 'config/spellKey';
import MatchDetail from '../MatchDetail/MatchDetail';

type Props = {
  match: MatchBasicType;
};

type ImageComponentType = {
  item: number | string;
  type: ImageType;
  keyValue: string;
};

const ImageComponent = ({ item, type, keyValue }: ImageComponentType) => {
  return (
    <Image
      src={getImagePath(item, type)}
      alt={`${type} Icon ${item}`}
      width={34}
      height={34}
      key={keyValue}
    />
  );
};

const MatchBasicInfoCard = ({ match }: Props) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const onClick = useCallback(() => {
    setDetailOpen(!detailOpen);
  }, [detailOpen]);

  return (
    <div>
      <div className={cn(styles.layout, { [styles.blue]: match.isWin })}>
        <div className={styles.summary}>
          <div className={styles.type}>{match.gameMode}</div>
          <div className={styles.date}>
            {getDateFromNow(match.gameCreation)}
          </div>
          {match.isWin ? (
            <div className={styles.win}>승리</div>
          ) : (
            <div className={styles.loss}>패배</div>
          )}
          <div className={styles.date}>
            {getGameDuration(match.gameDuration)}
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.ingame}>
          <Image
            src={getImagePath(getChampionName(match.championId), 'champion')}
            alt="챔피언 아이콘"
            width={81}
            height={81}
            variant="circle"
            key={`chmapion-icon-${match.matchId}-${match.championId}`}
          />
          <div className={styles.spell}>
            <ImageComponent
              item={getSpellName(match.summoner1Id)}
              type={'spell'}
              keyValue={`spell-icon-${match.matchId}-${0}`}
            />
            <ImageComponent
              item={getSpellName(match.summoner2Id)}
              type={'spell'}
              keyValue={`spell-icon-${match.matchId}-${1}`}
            />
          </div>

          <div className={styles.score}>
            <div className={styles.kill}>
              {match.kills} / {match.deaths} / {match.assists}
            </div>
            <div className={styles.rate}>
              {getRate(match.kills, match.deaths, match.assists)} : 1 평점
            </div>
          </div>

          <div className={styles.items}>
            <ImageComponent
              item={match.item0}
              type={'item'}
              keyValue={`item-icon-${match.matchId}-${0}`}
            />
            <ImageComponent
              item={match.item1}
              type={'item'}
              keyValue={`item-icon-${match.matchId}-${1}`}
            />
            <ImageComponent
              item={match.item2}
              type={'item'}
              keyValue={`item-icon-${match.matchId}-${2}`}
            />
            <ImageComponent
              item={match.item3}
              type={'item'}
              keyValue={`item-icon-${match.matchId}-${3}`}
            />
            <ImageComponent
              item={match.item4}
              type={'item'}
              keyValue={`item-icon-${match.matchId}-${4}`}
            />
            <ImageComponent
              item={match.item5}
              type={'item'}
              keyValue={`item-icon-${match.matchId}-${5}`}
            />
            <ImageComponent
              item={match.item6}
              type={'item'}
              keyValue={`item-icon-${match.matchId}-${6}`}
            />
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
            <div>{match.totalDamageDealtToChampions}</div>
            <div>{match.goldEarned}</div>
            <div>
              {match.totalMinionsKilled} (
              {((match.totalMinionsKilled * 60) / match.gameDuration).toFixed(
                1,
              )}
              )
            </div>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.participants}>
          {match.blue.map((participant, index) => {
            return (
              <div
                className={styles.participant}
                key={`${match.matchId}-${participant.championId}-${participant.puuid}`}
              >
                <Image
                  src={getImagePath(
                    getChampionName(participant.championId),
                    'champion',
                  )}
                  alt="챔피언 아이콘"
                  width={17}
                  height={17}
                  variant="circle"
                />
                <div className={styles.name}>
                  <NameLink
                    name={`${participant.summonerName}-${participant.summonerTag}`}
                  >
                    {participant.summonerName}
                  </NameLink>
                </div>
              </div>
            );
          })}

          {match.red.map((participant, index) => {
            return (
              <div
                className={styles.participant}
                key={`${match.matchId}-${participant.championId}-${participant.puuid}`}
              >
                <Image
                  src={getImagePath(
                    getChampionName(participant.championId),
                    'champion',
                  )}
                  alt="챔피언 아이콘"
                  width={17}
                  height={17}
                  variant="circle"
                />
                <div className={styles.name}>
                  <NameLink
                    name={`${participant.summonerName}-${participant.summonerTag}`}
                  >
                    {participant.summonerName}
                  </NameLink>
                </div>
              </div>
            );
          })}
        </div>
        <Button variant="text" onClick={onClick}>
          <IoIosArrowDown />
        </Button>
      </div>
      {detailOpen && <MatchDetail matchId={match.matchId} />}
    </div>
  );
};

export default MatchBasicInfoCard;
