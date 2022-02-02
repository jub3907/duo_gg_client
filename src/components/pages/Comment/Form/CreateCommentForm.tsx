import { gql, useMutation } from '@apollo/client';
import { Button, TextField } from '@mui/material';
import produce from 'immer';
import { selectSummonerState } from 'lib/slice/summonerSlice';
import { CommentType } from 'lib/types/comment';
import { COMMENTS } from 'lib/utils/query';
import { preventEvent } from 'lib/utils/utils';
import { ChangeEvent, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './CreateCommentForm.module.scss';
import { LoadingButton } from '@mui/lab';
import ErrorToast from '@common/Toast/ErrorToast';

type CommentInput = 'nickname' | 'password' | 'text';

const CREATE_COMMENT = gql`
  mutation createComment($input: CommentCreateInput!, $name: String!) {
    createComment(input: $input, name: $name) {
      _id
      createdAt
      nickname
      text
    }
  }
`;

const CreateCommentForm = () => {
  const { name } = useSelector(selectSummonerState);
  const [createComment, { loading }] = useMutation<{
    createComment: CommentType;
  }>(CREATE_COMMENT, {
    onError: (e) => {
      console.log(e);
      ErrorToast('댓글 작성에 실패했습니다.');
    },
    refetchQueries: [COMMENTS],
  });

  const initState = useMemo(
    () => ({
      nickname: '',
      password: '',
      text: '',
    }),
    [],
  );

  const [input, setInput] = useState(initState);

  const onSubmit = async (e: any) => {
    preventEvent(e);
    await createComment({ variables: { input, name } });
    setInput(initState);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id as CommentInput;

    if (key === 'nickname') {
      if (e.target.value.length < 11) {
        setInput(
          produce(input, (draft) => {
            draft.nickname = e.target.value;
          }),
        );
      }
    } else if (key === 'text') {
      if (e.target.value.length < 201) {
        setInput(
          produce(input, (draft) => {
            draft.text = e.target.value;
          }),
        );
      }
    } else {
      setInput(
        produce(input, (draft) => {
          draft.password = e.target.value;
        }),
      );
    }
  };

  const blockSubmit = useMemo(
    () =>
      input.nickname.length === 0 ||
      input.password.length === 0 ||
      input.text.length === 0,
    [input],
  );

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.layout}>
        <div className={styles.user}>
          <TextField
            id="nickname"
            helperText={`${input.nickname.length}/10`}
            value={input.nickname}
            onChange={onChange}
            placeholder="닉네임"
            className={styles.nickname}
          />

          <TextField
            id="password"
            type="password"
            value={input.password}
            onChange={onChange}
            placeholder="비밀번호"
            className={styles.password}
          />
        </div>
        <TextField
          id="text"
          helperText={`${input.text.length}/200`}
          value={input.text}
          onChange={onChange}
          placeholder="소환사님에 대한 한마디를 남겨주세요. 무분별한 인신공격의 경우 삭제될 수 있습니다."
          className={styles.body}
          multiline
          rows={5}
        />

        <LoadingButton
          variant="contained"
          type="submit"
          className={styles.button}
          sx={{ height: '100%' }}
          disabled={blockSubmit}
          loading={loading}
        >
          등록
        </LoadingButton>
      </div>
    </form>
  );
};

export default CreateCommentForm;
