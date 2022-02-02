import Image from '@common/Image/Image';
import { MatchBuildType, MatchDetailType } from 'lib/types/match';
import React, { useEffect, useState } from 'react';
import BuildLayout from './BuildLayout';
import styles from './MatchBuild.module.scss';
import SkillBuild from './SkillBuild';
import ItemBuild from './ItemBuild';
import { PerkType } from 'lib/types/participant';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import { getImagePath } from 'lib/utils/utils';
import { gql, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { selectSummonerState } from 'lib/slice/summonerSlice';
import CircularLoading from '@common/Loading/CircularLoading';
import ReloadButton from '@common/Button/ReloadButton';

type Props = {
  matchId: string;
  perk: PerkType;
};

const MATCH_BUILD = gql`
  mutation matchBuild($matchId: String!, $puuid: String!) {
    matchBuild(matchId: $matchId, puuid: $puuid) {
      items {
        iconPathes
        timestamp
      }
      skills
    }
  }
`;

const matchBuild = {
  items: [
    {
      iconPathes: [
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6660.png',
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1001.png',
      ],
      timestamp: 0,
    },
    {
      iconPathes: [
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1033.png',
      ],
      timestamp: 3,
    },
    {
      iconPathes: [
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3111.png',
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1033.png',
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/2031.png',
      ],
      timestamp: 4,
    },
    {
      iconPathes: [
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1029.png',
      ],
      timestamp: 5,
    },
    {
      iconPathes: [
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/6662.png',
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1028.png',
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1028.png',
      ],
      timestamp: 7,
    },
    {
      iconPathes: [
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/4401.png',
      ],
      timestamp: 11,
    },
    {
      iconPathes: [
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3076.png',
      ],
      timestamp: 12,
    },
    {
      iconPathes: [
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1028.png',
      ],
      timestamp: 13,
    },
    {
      iconPathes: [
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1011.png',
      ],
      timestamp: 14,
    },
    {
      iconPathes: [
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3075.png',
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/1033.png',
      ],
      timestamp: 15,
    },
    {
      iconPathes: [
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/3067.png',
      ],
      timestamp: 18,
    },
  ],
  skills: [3, 2, 1, 2, 2, 4, 2, 3, 2, 3, 4, 3, 3, 1, 1, 4, 1, 1],
};

const MatchBuild = ({ matchId, perk }: Props) => {
  const [build, setBuild] = useState<MatchBuildType>(null);
  const { puuid } = useSelector(selectSummonerState);

  const [matchBuild, { loading, error }] = useMutation<{
    matchBuild: MatchBuildType;
  }>(MATCH_BUILD, {
    onCompleted: ({ matchBuild }) => {
      setBuild(matchBuild);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    matchBuild({ variables: { matchId, puuid } });
  }, [matchBuild, matchId, puuid]);

  useEffect(() => {
    return () => {
      setBuild(null);
    };
  }, []);

  return (
    <>
      {loading && <CircularLoading />}
      {error && (
        <ReloadButton
          onClick={() => matchBuild({ variables: { matchId, puuid } })}
          loading={loading}
        />
      )}
      {build && (
        <div className={styles.layout}>
          <div className={styles.build}>
            <BuildLayout title="아이템 빌드">
              <div className={styles.list}>
                {build.items.map(({ iconPathes, timestamp }, index) => {
                  return (
                    <ItemBuild
                      iconPathes={iconPathes}
                      timestamp={timestamp}
                      key={`item-builds-${index}`}
                    />
                  );
                })}
              </div>
            </BuildLayout>
            <BuildLayout title="스킬 빌드">
              <SkillBuild skillId={1} skillName="Q" skills={build.skills} />
              <SkillBuild skillId={2} skillName="W" skills={build.skills} />
              <SkillBuild skillId={3} skillName="E" skills={build.skills} />
              <SkillBuild skillId={4} skillName="R" skills={build.skills} />
            </BuildLayout>
          </div>
          <div className={styles.build}>
            <BuildLayout title="룬">
              <div className={styles.main}>
                <Image
                  src={perk.primaryStyle}
                  alt="메인룬 이미지"
                  width={40}
                  height={40}
                />
                <ArrowRightRoundedIcon className={styles.icon} />
                {perk.primarySelections.map((path, index) => {
                  return (
                    <Image
                      src={path}
                      alt="메인룬2 이미지"
                      width={30}
                      height={30}
                      key={`rune-image-${index}`}
                    />
                  );
                })}
              </div>

              <div className={styles.sub}>
                <Image
                  src={perk.subStyle}
                  alt="서브룬 이미지"
                  width={40}
                  height={40}
                />
                <ArrowRightRoundedIcon className={styles.icon} />
                {perk.subSelections.map((path, index) => {
                  return (
                    <Image
                      src={path}
                      alt="서브룬2 이미지"
                      width={30}
                      height={30}
                      key={`rune-image-${index}`}
                    />
                  );
                })}
              </div>
            </BuildLayout>

            <BuildLayout title="스텟">
              <div className={styles.stats}>
                {[5008, 5005, 5007].map((id, index) => {
                  return (
                    <Image
                      src={getImagePath(id.toString(), 'stats')}
                      alt="스탯 이미지"
                      width={30}
                      height={30}
                      key={`offence-stat-${index}`}
                      className={
                        perk.offense !== id ? styles.gray : styles.stat
                      }
                    />
                  );
                })}
              </div>

              <div className={styles.stats}>
                {[5008, 5002, 5003].map((id, index) => {
                  return (
                    <Image
                      src={getImagePath(id.toString(), 'stats')}
                      alt="스탯 이미지"
                      width={30}
                      height={30}
                      key={`offence-stat-${index}`}
                      className={perk.flex !== id ? styles.gray : styles.stat}
                    />
                  );
                })}
              </div>

              <div className={styles.stats}>
                {[5001, 5002, 5003].map((id, index) => {
                  return (
                    <Image
                      src={getImagePath(id.toString(), 'stats')}
                      alt="스탯 이미지"
                      width={30}
                      height={30}
                      key={`offence-stat-${index}`}
                      className={
                        perk.defense !== id ? styles.gray : styles.stat
                      }
                    />
                  );
                })}
              </div>
            </BuildLayout>
          </div>
        </div>
      )}
    </>
  );
};

export default MatchBuild;
