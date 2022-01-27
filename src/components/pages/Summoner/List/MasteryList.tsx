import Image from '@common/Image/Image';
import List from '@common/List/List';
import { getDateFromNow } from 'lib/utils/date';
import styles from './MasteryList.module.scss';

type Props = {
  summonerId: string;
};

const mastery = [
  {
    championId: 412,
    championLevel: 7,
    championPoints: 613908,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Thresh.png',
    lastPlayTime: 1638076565000,
  },
  {
    championId: 117,
    championLevel: 7,
    championPoints: 213614,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Lulu.png',
    lastPlayTime: 1633737603000,
  },
  {
    championId: 267,
    championLevel: 7,
    championPoints: 158992,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Nami.png',
    lastPlayTime: 1633792976000,
  },
  {
    championId: 64,
    championLevel: 7,
    championPoints: 137923,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/LeeSin.png',
    lastPlayTime: 1642266610000,
  },
  {
    championId: 555,
    championLevel: 7,
    championPoints: 93051,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Pyke.png',
    lastPlayTime: 1642940134000,
  },
  {
    championId: 89,
    championLevel: 7,
    championPoints: 80544,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Leona.png',
    lastPlayTime: 1642948335000,
  },
  {
    championId: 41,
    championLevel: 6,
    championPoints: 63258,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Gangplank.png',
    lastPlayTime: 1632036575000,
  },
  {
    championId: 21,
    championLevel: 7,
    championPoints: 57680,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/MissFortune.png',
    lastPlayTime: 1638682852000,
  },
  {
    championId: 76,
    championLevel: 5,
    championPoints: 48850,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Nidalee.png',
    lastPlayTime: 1635426901000,
  },
  {
    championId: 142,
    championLevel: 6,
    championPoints: 47744,
    iconPath:
      'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/Zoe.png',
    lastPlayTime: 1636290800000,
  },
];

// TODO: 챔피언 이름 받아오기

const MasteryList = ({ summonerId }: Props) => {
  const Masteries = () => {
    return (
      <>
        {mastery
          .slice(0, 4)
          .map(
            (
              {
                championId,
                championLevel,
                championPoints,
                iconPath,
                lastPlayTime,
              },
              index,
            ) => {
              return (
                <div
                  className={styles.mastery}
                  key={`mastery-${championId}-${index}`}
                >
                  <div className={styles.flex}>
                    <Image
                      src={iconPath}
                      alt="챔피언 아이콘"
                      width={40}
                      height={40}
                      variant="circle"
                    />
                    <div className={styles.champ}>이름</div>
                  </div>

                  <div className={styles.flex}>
                    <div>{championPoints.toLocaleString()}점</div>
                    <div>Lv. {championLevel}</div>
                  </div>

                  <div className={styles.date}>
                    {getDateFromNow(lastPlayTime)}
                  </div>
                </div>
              );
            },
          )}
      </>
    );
  };

  return <List title="숙련도 정보" contents={<Masteries />} />;
};

export default MasteryList;
