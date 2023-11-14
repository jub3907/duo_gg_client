import NameLink from '@common/Link/NameLink';
import { PostType } from 'lib/types/post';
import { getDateFromNow } from 'lib/utils/date';
import styles from './DuoCard.module.scss';

type Props = {
  post: PostType;
};

const DuoCard = ({ post }: Props) => {
  return (
    <NameLink name={post.name} className={styles.layout}>
      <div className={styles.info}>
        <div className={styles.name}>{post.name}</div>
        <div className={styles.date}>{getDateFromNow(post.createdDate)}</div>
      </div>
      <div className={styles.title}>
        {post.rankType} {post.tier} {post.position}
      </div>

      <div className={styles.text}>{post.body}</div>
    </NameLink>
  );
};

export default DuoCard;
