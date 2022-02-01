import { useState } from 'react';
import styles from './SkillBuild.module.scss';
import cn from 'classnames';

type Props = {
  skillId: number;
  skillName: string;
  skills: number[];
};

const SkillBuild = ({ skillId, skillName, skills }: Props) => {
  return (
    <div className={styles.list}>
      <div className={styles.name}>{skillName}</div>
      {skills.map((item, index) => {
        return item === skillId ? (
          <div
            key={`${skillId}-${skillName}-${index}`}
            className={cn(styles.skill)}
          >
            {index + 1}
          </div>
        ) : (
          <div
            className={styles.blank}
            key={`${skillId}-${skillName}-${index}`}
          />
        );
      })}
    </div>
  );
};

export default SkillBuild;
