import styles from './MatchParticipantCard.module.scss';
import { ParticipantType } from 'lib/types/participant';
import Image from '@common/Image/Image';
import { getImagePath, getRate } from 'lib/utils/utils';
import NameLink from '@common/Link/NameLink';
import cn from 'classnames';
type Props = {
  participant: ParticipantType;
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
          src={getImagePath(participant.individualPosition, 'positions')}
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
          src={participant.championIconPath}
          alt="챔피언 아이콘"
          width={54}
          height={54}
          variant="circle"
        />
        <div className={styles.spell}>
          <Image
            src={participant.summoners[0].iconPath}
            alt={`스펠 아이콘 `}
            width={25}
            height={25}
          />
          <Image
            src={participant.summoners[1].iconPath}
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
              <span className={styles.vision}>
                {participant.visionWardsBoughtInGame}{' '}
              </span>
              <span>
                {participant.wardsPlaced}/{participant.wardsKilled}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.items}>
          {participant.items.map((item, index) => {
            return item.iconPath === '' ? (
              <div
                key={`item-icon-${item.id}-${item.index}`}
                className={styles.blank}
              ></div>
            ) : (
              <Image
                src={item.iconPath}
                alt={`아이템 ${index}`}
                width={25}
                height={25}
                key={`item-icon-${item.id}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatchParticipantCard;
