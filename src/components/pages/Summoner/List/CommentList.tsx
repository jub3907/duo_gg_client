import { gql, useQuery } from '@apollo/client';
import List from '@common/List/List';
import { Button, ListSubheader } from '@mui/material';
import { style } from '@mui/system';
import { getSummonerCommentUrl } from 'config/path';
import summonerSlice, { selectSummonerState } from 'lib/slice/summonerSlice';
import { CommentType } from 'lib/types/comment';
import { PostType } from 'lib/types/post';
import { getDateFromNow } from 'lib/utils/date';
import { COMMENTS } from 'lib/utils/query';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styles from './CommentList.module.scss';

// TODO: 컴포넌트 분리
const CommentList = () => {
  const { name } = useSelector(selectSummonerState);

  const { data, loading } = useQuery<{ comments: CommentType[] }>(COMMENTS, {
    skip: name === undefined,
    variables: { name: name, count: 2 },
    onError: (e) => {
      console.log('error', e);
    },
  });

  const Comments = ({ comments }: { comments: CommentType[] }) => {
    return (
      <div className={styles.comments}>
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
      </div>
    );
  };

  const CommentButton = ({ name }: { name: string }) => {
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
      contents={
        loading ? <div>Loading</div> : <Comments comments={data.comments} />
      }
      button={<CommentButton name={name} />}
    />
  );
};

export default CommentList;
