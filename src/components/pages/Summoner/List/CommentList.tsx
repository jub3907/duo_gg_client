import List from '@common/List/List';
import { Button, ListSubheader } from '@mui/material';
import { style } from '@mui/system';
import { getSummonerCommentUrl } from 'config/path';
import { CommentType } from 'lib/types/comment';
import { getDateFromNow } from 'lib/utils/date';
import Link from 'next/link';
import styles from './CommentList.module.scss';

type Props = {
  name: string;
};
const comments = [
  {
    _id: '61ef74b7e397ccb38e4b4469',
    createdAt: 1643082935708,
    nickname: '패배',
    text: '오우야5',
  },
  {
    _id: '61ef74b5e397ccb38e4b4462',
    createdAt: 1643082933881,
    nickname: '패배ㅁㄴㅇㅁㄴㅇ',
    text: '목업데이터에요',
  },
];

// TODO: 컴포넌트 분리
const CommentList = ({ name }: Props) => {
  const Comments = () => {
    return (
      <>
        {comments.length > 0 &&
          comments.map(({ createdAt, nickname, text }: CommentType, index) => {
            return (
              <div
                className={styles.comment}
                key={`comment-${createdAt}-${index}}`}
              >
                <div className={styles.writer}>
                  <div className={styles.nickname}>{nickname}</div>
                  <div className={styles.date}>{getDateFromNow(createdAt)}</div>
                </div>
                <div className={styles.divider} />
                <div className={styles.text}>{text}</div>
              </div>
            );
          })}
      </>
    );
  };

  const CommentButton = () => {
    return (
      <Link href={getSummonerCommentUrl(name)}>
        <a>
          <Button variant="contained" fullWidth className={styles.button}>
            더보기 {'>'}
          </Button>
        </a>
      </Link>
    );
  };

  return (
    <List
      title="최근 한마디"
      contents={<Comments />}
      button={<CommentButton />}
    />
  );
};

export default CommentList;
