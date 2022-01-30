import { Button, TextField } from '@mui/material';
import { parseMultiSearchInput, preventEvent } from 'lib/utils/utils';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import styles from './MultiSearchForm.module.scss';

type Props = {
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: any) => void;
};

const MultiSearchForm = ({ text, onChange, onSubmit }: Props) => {
  const placeholder = useMemo(
    () =>
      `Duo TOP님이 방에 참가했습니다.
Duo MID님이 방에 참가했습니다.
Duo JUG님이 방에 참가했습니다.
Duo BOT님이 방에 참가했습니다.
Duo SUP님이 방에 참가했습니다.`,
    [],
  );

  const helperText = useMemo(() => parseMultiSearchInput(text), [text]);

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.layout}>
        <TextField
          id="names"
          value={text}
          onChange={onChange}
          placeholder={placeholder}
          helperText={`검색 대상: ${helperText}`}
          multiline
          rows={7}
        />
        <div className={styles.bottom}>
          <div className={styles.helper}>
            채팅창의 내용을 복사해 붙여넣은 후 검색하면, 내 팀원들의 최근 전적을
            확인할 수 있습니다.
          </div>
          <Button className={styles.button} type="submit" variant="contained">
            검색
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MultiSearchForm;
