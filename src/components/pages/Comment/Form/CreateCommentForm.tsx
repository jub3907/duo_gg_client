import { Button, TextField } from '@mui/material';
import { preventEvent } from 'lib/utils/utils';
import { ChangeEvent, useMemo, useState } from 'react';
import styles from './CreateCommentForm.module.scss';

type CommentInput = 'nickname' | 'password' | 'text';

type Props = {
  name: string;
};

const CreateCommentForm = ({ name }: Props) => {
  const onSubmit = (e: any) => {
    preventEvent(e);
    console.log('submit');
  };

  const [input, setInput] = useState({
    nickname: '',
    password: '',
    text: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id as CommentInput;

    if (key === 'nickname') {
      if (e.target.value.length < 11) {
        setInput({ ...input, nickname: e.target.value });
      }
    } else if (key === 'text') {
      if (e.target.value.length < 201) {
        setInput({ ...input, text: e.target.value });
      }
    } else {
      setInput({ ...input, password: e.target.value });
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

        <Button
          variant="contained"
          type="submit"
          className={styles.button}
          sx={{ height: '100%' }}
          disabled={blockSubmit}
        >
          등록
        </Button>
      </div>
    </form>
  );
};

export default CreateCommentForm;
