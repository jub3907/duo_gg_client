import Image from '@common/Image/Image';
import { MatchDetailType } from 'lib/types/match';
import React, { useEffect, useState } from 'react';
import BuildLayout from './BuildLayout';
import styles from './MatchBuild.module.scss';
import SkillBuild from './SkillBuild';
import ItemBuild from './ItemBuild';
import { PerkType } from 'lib/types/participant';
import { IoMdArrowDropright } from 'react-icons/io';
import { getImagePath } from 'lib/utils/utils';
import { useSelector } from 'react-redux';
import { selectSummonerState } from 'lib/slice/summonerSlice';
import CircularLoading from '@common/Loading/CircularLoading';
import ReloadButton from '@common/Button/ReloadButton';

type Props = {
  matchId: string;
  perk: PerkType;
};

const MatchBuild = ({ matchId, perk }: Props) => {
  // const [build, setBuild] = useState<MatchBuildType>(null);
  const { puuid } = useSelector(selectSummonerState);

  // const [matchBuild, { loading, error }] = useMutation<{
  //   matchBuild: MatchBuildType;
  // }>(MATCH_BUILD, {
  //   onCompleted: ({ matchBuild }) => {
  //     setBuild(matchBuild);
  //   },
  //   onError: (e) => {
  //     console.log(e);
  //   },
  // });

  // useEffect(() => {
  //   matchBuild({ variables: { matchId, puuid } });
  // }, [matchBuild, matchId, puuid]);

  // useEffect(() => {
  //   return () => {
  //     setBuild(null);
  //   };
  // }, []);

  console.log(perk);

  return (
    <>
      {/* {loading && <CircularLoading />}
      {error && (
        <ReloadButton
          onClick={() => matchBuild({ variables: { matchId, puuid } })}
          loading={loading}
        />
      )} */}
      {/* {build  */}

      {true && (
        <div className={styles.layout}>
          {/* <div className={styles.build}>
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
          </div> */}
          <div className={styles.build}>
            <BuildLayout title="룬">
              <div className={styles.main}>
                <Image
                  src={getImagePath(perk.primaryStyle, 'perk')}
                  alt="메인룬 이미지"
                  width={40}
                  height={40}
                />
                <IoMdArrowDropright className={styles.icon} />

                <Image
                  src={getImagePath(perk.primary_1, 'perk')}
                  alt="메인룬1 이미지"
                  width={30}
                  height={30}
                  key={`rune-image-${matchId}-main1`}
                />
                <Image
                  src={getImagePath(perk.primary_2, 'perk')}
                  alt="메인룬2 이미지"
                  width={30}
                  height={30}
                  key={`rune-image-${matchId}-main2`}
                />
                <Image
                  src={getImagePath(perk.primary_3, 'perk')}
                  alt="메인룬3 이미지"
                  width={30}
                  height={30}
                  key={`rune-image-${matchId}-main3`}
                />
              </div>

              <div className={styles.sub}>
                <Image
                  src={getImagePath(perk.subStyle, 'perk')}
                  alt="서브룬 이미지"
                  width={40}
                  height={40}
                />
                <IoMdArrowDropright className={styles.icon} />

                <Image
                  src={getImagePath(perk.sub_1, 'perk')}
                  alt="서브룬1 이미지"
                  width={30}
                  height={30}
                  key={`rune-image-${matchId}-sub1`}
                />
                <Image
                  src={getImagePath(perk.sub_2, 'perk')}
                  alt="서브룬2 이미지"
                  width={30}
                  height={30}
                  key={`rune-image-${matchId}-sub2`}
                />
              </div>
            </BuildLayout>

            <BuildLayout title="스텟">
              <div className={styles.stats}>
                {[5008, 5005, 5007].map((id, index) => {
                  return (
                    <Image
                      src={getImagePath(id.toString(), 'stat')}
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
                      src={getImagePath(id.toString(), 'stat')}
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
                      src={getImagePath(id.toString(), 'stat')}
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
