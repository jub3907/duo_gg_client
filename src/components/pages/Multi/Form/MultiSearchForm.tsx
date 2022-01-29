import { Button, TextField } from '@mui/material';
import { parseMultiSearchInput, preventEvent } from 'lib/utils/utils';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import styles from './MultiSearchForm.module.scss';

const MultiSearchForm = () => {
  const [value, setValue] = useState('');
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = (e: any) => {
    preventEvent(e);
    console.log('submit');
  };

  const placeholder = useMemo(
    () =>
      `Duo TOP님이 방에 참가했습니다.
Duo MID님이 방에 참가했습니다.
Duo JUG님이 방에 참가했습니다.
Duo BOT님이 방에 참가했습니다.
Duo SUP님이 방에 참가했습니다.`,
    [],
  );

  const helperText = useMemo(() => {
    return parseMultiSearchInput(value);
  }, [value]);

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.layout}>
        <TextField
          id="names"
          value={value}
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
