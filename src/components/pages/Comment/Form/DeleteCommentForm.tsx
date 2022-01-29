import { Button, TextField } from '@mui/material';
import { preventEvent } from 'lib/utils/utils';
import { ChangeEvent, useState } from 'react';
import styles from './DeleteCommentForm.module.scss';

type CommentInput = 'nickname' | 'password' | 'text';

type Props = {
  id: string;
  name: string;
};

const DeleteCommentForm = ({ id, name }: Props) => {
  const onSubmit = (e: any) => {
    preventEvent(e);
    console.log('delete');
  };

  const [password, setPassword] = useState('');

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
        <Button variant="contained" className={styles.button} type="submit">
          삭제
        </Button>
      </div>
    </form>
  );
};

export default DeleteCommentForm;
