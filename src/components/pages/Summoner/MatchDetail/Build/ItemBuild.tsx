import Image from '@common/Image/Image';
import React from 'react';
import styles from './ItemBuild.module.scss';
import { IoIosArrowForward } from 'react-icons/io';

type Props = {
  iconPathes: string[];
  timestamp: number;
};

const ItemBuild = ({ timestamp, iconPathes }: Props) => {
  return (
    <React.Fragment>
      <div className={styles.times}>
        <div className={styles.items}>
          {iconPathes.map((iconPath, index) => {
            return (
              <Image
                src={iconPath}
                alt="아이템 아이콘"
                width={25}
                height={25}
                key={`item-builds-${index}`}
              />
            );
          })}
        </div>
        <div className={styles.timestamp}>{timestamp}분</div>
      </div>
      <IoIosArrowForward className={styles.icon} />
    </React.Fragment>
  );
};

export default ItemBuild;
