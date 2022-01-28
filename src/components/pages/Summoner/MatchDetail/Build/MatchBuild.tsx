import { MatchDetailType } from 'lib/types/match';
import styles from './MatchBuild.module.scss';

type Props = {
  matchDetail: MatchDetailType;
};

const matchBuild = {
  items: [
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6660.png',
      timestamp: 0,
    },
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1001.png',
      timestamp: 0,
    },
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1033.png',
      timestamp: 3,
    },
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3111.png',
      timestamp: 4,
    },
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1033.png',
      timestamp: 4,
    },
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/2031.png',
      timestamp: 4,
    },
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1029.png',
      timestamp: 5,
    },
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6662.png',
      timestamp: 7,
    },
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1028.png',
      timestamp: 7,
    },
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1028.png',
      timestamp: 7,
    },
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/4401.png',
      timestamp: 11,
    },
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3076.png',
      timestamp: 12,
    },
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1028.png',
      timestamp: 13,
    },
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1011.png',
      timestamp: 14,
    },
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3075.png',
      timestamp: 15,
    },
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1033.png',
      timestamp: 15,
    },
    {
      iconPath:
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3067.png',
      timestamp: 18,
    },
  ],
  skills: [3, 2, 1, 2, 2, 4, 2, 3, 2, 3, 4, 3, 3, 1, 1, 4, 1, 1],
};

const MatchBuild = ({ matchDetail }: Props) => {
  return (
    <div className={styles.layout}>
      <div></div>
      <div></div>
    </div>
  );
};

export default MatchBuild;
