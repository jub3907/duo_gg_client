import styles from './SummonerSearch.module.scss';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useState } from 'react';
import Path from 'config/path';

const SubHeaderSearchForm = () => {
  const router = useRouter();
  const [name, setName] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onClick = () => {
    router.push({
      pathname: Path.summoner,
      query: { name },
    });
  };

  return (
    <div className={styles.layout}>
      <input
        type="text"
        onChange={onChange}
        placeholder="소환사명을 입력해 전적을 확인해 보세요."
        className={styles.input}
      />
      <Divider sx={{ height: 28 }} orientation="vertical" />
      <IconButton onClick={onClick} sx={{ p: '12px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SubHeaderSearchForm;
