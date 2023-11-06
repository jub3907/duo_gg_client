import styles from './SummonerSearch.module.scss';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useState, KeyboardEvent } from 'react';
import Path from 'config/path';
import ErrorToast from '@common/Toast/ErrorToast';
import { FaSearch } from 'react-icons/fa';

const SubHeaderSearch = () => {
  const router = useRouter();
  const [name, setName] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onClick = () => {
    if (name === '') {
      ErrorToast('소환사명을 입력해 주세요.');
      return;
    }
    router.push({
      pathname: Path.summoner,
      query: { name },
    });
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div className={styles.layout}>
      <input
        type="text"
        onChange={onChange}
        placeholder="소환사명을 입력해 전적을 확인해 보세요."
        className={styles.input}
        onKeyPress={handleOnKeyPress}
      />
      <Divider sx={{ height: 28 }} orientation="vertical" />
      <IconButton onClick={onClick} sx={{ p: '12px' }} aria-label="search">
        <FaSearch fontSize={16} />
      </IconButton>
    </div>
  );
};

export default SubHeaderSearch;
