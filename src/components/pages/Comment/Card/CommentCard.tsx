import { Button, TextField } from '@mui/material';
import { CommentType } from 'lib/types/comment';
import { getDateFromNow } from 'lib/utils/date';
import { useCallback, useState } from 'react';
import styles from './CommentCard.module.scss';
import DeleteCommentForm from '../Form/DeleteCommentForm';
import { MdDelete } from 'react-icons/md';

type Props = {
  comment: CommentType;
};

const CommentCard = ({ comment }: Props) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const toggleDeleteOpen = useCallback(() => {
    setDeleteOpen(!deleteOpen);
  }, [deleteOpen]);

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.nickname}>{comment.nickname}</div>
        <div className={styles.info}>
          {deleteOpen === false && (
            <div className={styles.date}>
              {getDateFromNow(comment.createdAt)}
            </div>
          )}

          {deleteOpen === true && <DeleteCommentForm id={comment._id} />}
          <MdDelete className={styles.delete} onClick={toggleDeleteOpen} />
        </div>
      </div>
      <div className={styles.text}>{comment.text}</div>
    </div>
  );
};

export default CommentCard;
