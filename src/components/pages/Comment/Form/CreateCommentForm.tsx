import { Button, TextField } from '@mui/material';
import produce from 'immer';
import { selectSummonerState } from 'lib/slice/summonerSlice';
import { CommentFormType, CommentType } from 'lib/types/comment';
import { preventEvent } from 'lib/utils/utils';
import { ChangeEvent, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './CreateCommentForm.module.scss';
import { LoadingButton } from '@mui/lab';
import ErrorToast from '@common/Toast/ErrorToast';
import apiPath from 'config/apiPath';

type CommentInput = 'nickname' | 'password' | 'content';

const CreateCommentForm = ({
  refetchComments,
}: {
  refetchComments: (offset: number, limit: number) => void;
}) => {
  const { name, puuid } = useSelector(selectSummonerState);
  const initState = useMemo(
    () => ({
      nickname: '',
      password: '',
      content: '',
    }),
    [],
  );

  const [input, setInput] = useState(initState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const addComment = (input: CommentFormType) => {
    setIsLoading(true);
    const uri = (apiPath.base + apiPath.comment).replace('[puuid]', puuid);

    fetch(uri, {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) {
        ErrorToast('댓글 작성에 실패했습니다.');
        setIsLoading(false);
        setIsError(true);
        return null;
      }
      setIsLoading(false);
      refetchComments(0, 10);
    });
  };

  const onSubmit = async (e: any) => {
    preventEvent(e);
    addComment(input);
    if (!isError) {
      setInput(initState);
    }
    setIsError(false);
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
    } else if (key === 'content') {
      if (e.target.value.length < 201) {
        setInput(
          produce(input, (draft) => {
            draft.content = e.target.value;
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
      input.content.length === 0,
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
          id="content"
          helperText={`${input.content.length}/200`}
          value={input.content}
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
          loading={isLoading}
        >
          등록
        </LoadingButton>
      </div>
    </form>
  );
};

export default CreateCommentForm;
