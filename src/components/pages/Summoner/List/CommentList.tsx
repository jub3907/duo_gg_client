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
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styles from './CommentList.module.scss';
import apiPath from 'config/apiPath';

const Comments = ({ comments }: { comments: CommentType[] }) => {
  return (
    <div className={styles.comments}>
      {comments && comments.length > 0 ? (
        comments.map(
          ({ createdDate, nickname, content }: CommentType, index) => {
            return (
              <div
                className={styles.comment}
                key={`comment-${createdDate}-${index}}`}
              >
                <div className={styles.writer}>
                  <div className={styles.nickname}>{nickname}</div>
                  <div className={styles.date}>
                    TODO: 시간
                    {
                      // getDateFromNow(createdDate)
                    }
                  </div>
                </div>
                <div className={styles.divider} />
                <div className={styles.text}>{content}</div>
              </div>
            );
          },
        )
      ) : (
        <div className={styles.empty}>작성된 댓글이 없습니다!</div>
      )}
    </div>
  );
};

const CommentButton = ({ name }: { name: string }) => {
  return (
    <Link href={getSummonerCommentUrl(name)}>
      <Button variant="contained" fullWidth className={styles.button}>
        더보기 {'>'}
      </Button>
    </Link>
  );
};

// TODO: 컴포넌트 분리
const CommentList = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setLoading] = useState(true);

  const { puuid, name } = useSelector(selectSummonerState);
  const uri = (apiPath.base + apiPath.comment + '?offset=0&limit=2').replace(
    '[puuid]',
    puuid,
  );

  const fetchData = () => {
    fetch(uri, {
      method: 'GET',
      next: { revalidate: 300 },
    })
      .then((res) => {
        if (!res.ok) {
          return null;
        }
        return res.json();
      })
      .then((data) => {
        setComments(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [puuid]);

  return (
    <>
      <List
        title="최근 한마디"
        contents={<Comments comments={comments} />}
        button={<CommentButton name={name} />}
        loading={isLoading}
        error={null}
        reloadButton={
          <ReloadButton
            onClick={() => {
              fetchData();
            }}
            className={styles.reload}
            loading={isLoading}
          />
        }
      />
    </>
  );
};

export default CommentList;
