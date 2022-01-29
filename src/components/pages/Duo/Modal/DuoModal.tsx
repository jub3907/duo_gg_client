import PageTitleLayout from '@common/Layout/PageTitleLayout';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import {
  PostInputKey,
  PostInputType,
  PostQueueType,
  PostRoleType,
} from 'lib/types/post';
import { preventEvent } from 'lib/utils/utils';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import styles from './DuoModal.module.scss';
import produce from 'immer';

type Props = {
  closeModal: () => void;
  open: boolean;
};

const DuoModal = ({ closeModal, open }: Props) => {
  const onSubmit = (e: any) => {
    preventEvent(e);
    console.log('submit');
  };

  const [input, setInput] = useState<PostInputType>({
    name: '',
    text: '',
    tier: '',
    queueType: '솔로랭크',
    role: '포지션 상관없이 구함',
  });

  const blockSubmit = useMemo(
    () =>
      input.name.length === 0 ||
      input.text.length === 0 ||
      input.tier.length === 0,
    [input],
  );

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const key = e.target.name as 'name' | 'text' | 'tier';

      if (key === 'text' && e.target.value.length > 200) {
        return;
      }

      setInput(
        produce(input, (draft: PostInputType) => {
          draft[key] = e.target.value;
        }),
      );
    },
    [input],
  );

  const onChangeSelect = useCallback(
    (e: SelectChangeEvent) => {
      console.log(e.target.name, e.target.value);
      const key = e.target.name as 'queueType' | 'role';
      if (key === 'queueType') {
        setInput(
          produce(input, (draft) => {
            draft.queueType = e.target.value as PostQueueType;
          }),
        );
      } else if (key === 'role') {
        setInput(
          produce(input, (draft) => {
            draft.role = e.target.value as PostRoleType;
          }),
        );
      }
    },
    [input],
  );

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={onSubmit}>
        <div className={styles.layout}>
          <div className={styles.title}>듀오 신청 등록</div>
          <div className={styles.divider} />
          <div className={styles.dropdown}>
            <FormControl fullWidth>
              <InputLabel id="queueType">게임 타입</InputLabel>
              <Select
                name="queueType"
                id="queueType"
                value={input.queueType}
                label="게임 타입"
                onChange={onChangeSelect}
              >
                <MenuItem value="솔로랭크">솔로랭크</MenuItem>
                <MenuItem value="자유랭크">자유랭크</MenuItem>
                <MenuItem value="무작위총력전">무작위총력전</MenuItem>
                <MenuItem value="일반">일반</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>포지션</InputLabel>
              <Select
                name="role"
                id="role"
                value={input.role}
                label="포지션"
                onChange={onChangeSelect}
              >
                <MenuItem value="포지션 상관없이 구함">
                  포지션 상관없이 구함
                </MenuItem>
                <MenuItem value="탑">탑</MenuItem>
                <MenuItem value="정글">정글</MenuItem>
                <MenuItem value="미드">미드</MenuItem>
                <MenuItem value="원딜">원딜</MenuItem>
                <MenuItem value="서폿">서폿</MenuItem>
              </Select>
            </FormControl>
          </div>

          <TextField
            name="name"
            value={input.name}
            onChange={onChangeInput}
            className={styles.name}
            placeholder="소환사명을 입력해 주세요."
            label="소환사 명"
            fullWidth
          />

          <TextField
            name="tier"
            value={input.tier}
            onChange={onChangeInput}
            className={styles.tier}
            placeholder="듀오를 원하시는 티어를 입력해 주세요."
            label="티어"
            fullWidth
          />

          <TextField
            name="text"
            value={input.text}
            onChange={onChangeInput}
            className={styles.text}
            placeholder="200자 이내 내용"
            label="본문"
            fullWidth
            multiline
            rows={4}
          />
          <div className={styles.button}>
            <Button
              variant="contained"
              type="submit"
              disabled={blockSubmit}
              className={styles.submit}
            >
              등록
            </Button>
            <Button
              variant="text"
              onClick={closeModal}
              className={styles.cancel}
            >
              취소
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default DuoModal;
