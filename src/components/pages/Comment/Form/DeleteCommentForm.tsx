import { LoadingButton } from '@mui/lab';
import { Button, TextField } from '@mui/material';
import { selectSummonerState } from 'lib/slice/summonerSlice';
import { CommentType } from 'lib/types/comment';
import { preventEvent } from 'lib/utils/utils';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './DeleteCommentForm.module.scss';
import apiPath from 'config/apiPath';
import ErrorToast from '@common/Toast/ErrorToast';

type Props = {
  id: string;
  refetchComments: (offset: number, limit: number) => void;
};

const DeleteCommentForm = ({ id, refetchComments }: Props) => {
  const initState = useMemo(
    () => ({
      password: '',
    }),
    [],
  );

  const [input, setInput] = useState(initState);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const deleteComment = (offset: number, limit: number) => {
    const uri = (apiPath.base + apiPath.deleteComment).replace(
      '[commentId]',
      id,
    );

    fetch(uri, {
      method: 'DELETE',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) {
        ErrorToast('댓글 삭제에 실패했습니다.');
        setIsLoading(false);
        setIsError(true);
        return null;
      }
      setIsLoading(false);
      refetchComments(offset, limit);
    });
  };

  const onSubmit = useCallback(
    async (e: any) => {
      preventEvent(e);
      deleteComment(0, 10);
    },
    [input],
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ password: e.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.layout}>
        <TextField
          type="text"
          value={input.password}
          onChange={onChange}
          className={styles.input}
          placeholder="비밀번호"
        />
        <LoadingButton
          variant="contained"
          className={styles.button}
          type="submit"
          loading={isLoading}
        >
          삭제
        </LoadingButton>
      </div>
    </form>
  );
};

export default DeleteCommentForm;
