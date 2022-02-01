import { gql, useMutation } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import { Button, TextField } from '@mui/material';
import { selectSummonerState } from 'lib/slice/summonerSlice';
import { CommentType } from 'lib/types/comment';
import { COMMENTS } from 'lib/utils/query';
import { preventEvent } from 'lib/utils/utils';
import { ChangeEvent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './DeleteCommentForm.module.scss';

type Props = {
  id: string;
};

const DELETE_COMMENT = gql`
  mutation deleteComment($input: CommentDeleteInput!) {
    deleteComment(input: $input)
  }
`;

const DeleteCommentForm = ({ id }: Props) => {
  const { name } = useSelector(selectSummonerState);
  const [password, setPassword] = useState('');
  const [deleteComment, { loading }] = useMutation<{
    deleteComment: boolean;
  }>(DELETE_COMMENT, {
    onCompleted: ({ deleteComment }) => {
      console.log(deleteComment);
    },
    onError: (e) => {
      console.log(e);
    },
    refetchQueries: [COMMENTS],
  });

  const onSubmit = useCallback(
    async (e: any) => {
      preventEvent(e);
      await deleteComment({
        variables: {
          input: {
            summonerName: name,
            id,
            password,
          },
        },
      });
    },
    [name, id, password],
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.layout}>
        <TextField
          type="text"
          value={password}
          onChange={onChange}
          className={styles.input}
          placeholder="비밀번호"
        />
        <LoadingButton
          variant="contained"
          className={styles.button}
          type="submit"
          loading={loading}
        >
          삭제
        </LoadingButton>
      </div>
    </form>
  );
};

export default DeleteCommentForm;
