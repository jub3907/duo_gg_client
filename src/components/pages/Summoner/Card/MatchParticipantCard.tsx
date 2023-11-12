import styles from './MatchParticipantCard.module.scss';
import { ParticipantDetailType } from 'lib/types/participant';
import Image from '@common/Image/Image';
import { getImagePath, getRate } from 'lib/utils/utils';
import NameLink from '@common/Link/NameLink';
import cn from 'classnames';
import { getChampionName } from 'config/championKey';
import { getSpellName } from 'config/spellKey';
type Props = {
  participant: ParticipantDetailType;
};
const MatchParticipantCard = ({ participant }: Props) => {
  return (
    <div
      className={cn(
        styles.layout,
        { [styles.red]: participant.teamId === 200 },
        { [styles.blue]: participant.teamId === 100 },
      )}
    >
      <div className={styles.header}>
        <Image
          src={getImagePath(
            participant.teamPosition ? participant.teamPosition : 'Invalid',
            'position',
          )}
          alt="포지션 이미지"
          width={20}
          height={20}
        />

        <div className={styles.name}>
          <NameLink name={participant.summonerName} />
        </div>
      </div>

      <div className={styles.ingame}>
        <Image
          src={getImagePath(
            getChampionName(participant.championId),
            'champion',
          )}
          alt="챔피언 아이콘"
          width={54}
          height={54}
          variant="circle"
        />
        <div className={styles.spell}>
          <Image
            src={getImagePath(getSpellName(participant.summoner1Id), 'spell')}
            alt={`스펠 아이콘 `}
            width={25}
            height={25}
          />
          <Image
            src={getImagePath(getSpellName(participant.summoner2Id), 'spell')}
            alt={`스펠 아이콘 `}
            width={25}
            height={25}
          />
        </div>

        <div className={styles.score}>
          <div className={styles.kill}>
            {participant.kills} / {participant.deaths} / {participant.assists}
          </div>
          <div className={styles.rate}>
            {getRate(
              participant.kills,
              participant.deaths,
              participant.assists,
            )}{' '}
            : 1 평점
          </div>
        </div>

        <div className={styles.meta}>
          <div className={styles.index}>
            <div>CS</div>
            <div>와드</div>
          </div>
          <div className={styles.value}>
            <div>{participant.totalMinionsKilled}</div>
            <div>
              <span className={styles.vision}>{participant.visionScore} </span>
              <span>
                {participant.wardsPlaced}/{participant.detectorWardsPlaced}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.items}>
          <Image
            src={getImagePath(participant.item0, 'item')}
            alt={`아이템 아이콘 ${participant.item0}`}
            width={34}
            height={34}
            key={`item-icon-${participant.puuid}-${participant.item0}`}
          />

          <Image
            src={getImagePath(participant.item1, 'item')}
            alt={`아이템 아이콘 ${participant.item1}`}
            width={34}
            height={34}
            key={`item-icon-${participant.puuid}-${participant.item1}`}
          />

          <Image
            src={getImagePath(participant.item2, 'item')}
            alt={`아이템 아이콘 ${participant.item2}`}
            width={34}
            height={34}
            key={`item-icon-${participant.puuid}-${participant.item2}`}
          />

          <Image
            src={getImagePath(participant.item3, 'item')}
            alt={`아이템 아이콘 ${participant.item3}`}
            width={34}
            height={34}
            key={`item-icon-${participant.puuid}-${participant.item3}`}
          />

          <Image
            src={getImagePath(participant.item4, 'item')}
            alt={`아이템 아이콘 ${participant.item4}`}
            width={34}
            height={34}
            key={`item-icon-${participant.puuid}-${participant.item4}`}
          />

          <Image
            src={getImagePath(participant.item5, 'item')}
            alt={`아이템 아이콘 ${participant.item5}`}
            width={34}
            height={34}
            key={`item-icon-${participant.puuid}-${participant.item5}`}
          />
          <Image
            src={getImagePath(participant.item6, 'item')}
            alt={`아이템 아이콘 ${participant.item6}`}
            width={34}
            height={34}
            key={`item-icon-${participant.puuid}-${participant.item6}`}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchParticipantCard;
