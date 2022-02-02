import { gql, useLazyQuery, useQuery } from '@apollo/client';
import ReloadButton from '@common/Button/ReloadButton';
import List from '@common/List/List';
import CircularLoading from '@common/Loading/CircularLoading';
import ErrorToast from '@common/Toast/ErrorToast';
import { Button, ListSubheader } from '@mui/material';
import { style } from '@mui/system';
import { getSummonerCommentUrl } from 'config/path';
import summonerSlice, { selectSummonerState } from 'lib/slice/summonerSlice';
import { CommentType } from 'lib/types/comment';
import { PostType } from 'lib/types/post';
import { getDateFromNow } from 'lib/utils/date';
import { COMMENTS } from 'lib/utils/query';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styles from './CommentList.module.scss';

const Comments = ({ comments }: { comments: CommentType[] }) => {
  return (
    <div className={styles.comments}>
      {comments &&
        comments.length > 0 &&
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
// TODO: 컴포넌트 분리
const CommentList = () => {
  const { name } = useSelector(selectSummonerState);

  const [comments, { data, loading, error }] = useLazyQuery<{
    comments: CommentType[];
  }>(COMMENTS, {
    variables: { name: name, count: 2 },
    onError: (e) => {
      ErrorToast('댓글을 불러오는데 실패했어요.');
    },
  });

  useEffect(() => {
    if (name !== undefined) {
      comments();
    }
  }, [comments, name]);

  return (
    <List
      title="최근 한마디"
      contents={<Comments comments={data?.comments} />}
      button={<CommentButton name={name} />}
      loading={loading}
      error={error}
      reloadButton={
        <ReloadButton
          onClick={() => {
            comments();
          }}
          className={styles.reload}
          loading={loading}
        />
      }
    />
  );
};

export default CommentList;
