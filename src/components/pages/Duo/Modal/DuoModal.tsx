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
  PostFormType,
  PostRankType,
  PostRoleType,
  PostType,
} from 'lib/types/post';
import { preventEvent } from 'lib/utils/utils';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import styles from './DuoModal.module.scss';
import produce from 'immer';
import ErrorToast from '@common/Toast/ErrorToast';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { addCreatedPost } from 'lib/slice/postSlice';
import apiPath from 'config/apiPath';

type Props = {
  closeModal: () => void;
  open: boolean;
};

const DuoModal = ({ closeModal, open }: Props) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createPost = () => {
    setIsLoading(true);
    const uri = apiPath.base + apiPath.duo;

    fetch(uri, {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) {
        ErrorToast('포스트 작성에 실패했습니다.');
        setIsLoading(false);
        setIsError(true);
        return null;
      }
      setIsLoading(false);
      dispatch(addCreatedPost(input));
    });
  };

  const initInput: PostFormType = {
    name: '',
    body: '',
    tier: '',
    rankType: '솔로랭크',
    position: '모든 포지션',
  };

  const [input, setInput] = useState<PostFormType>(initInput);

  const onSubmit = async (e: any) => {
    preventEvent(e);
    createPost();

    closeModal();
    setInput(initInput);
  };

  const blockSubmit = useMemo(
    () =>
      input.name.length === 0 ||
      input.body.length === 0 ||
      input.tier.length === 0,
    [input],
  );

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const key = e.target.name as 'name' | 'body' | 'tier';

      if (key === 'body' && e.target.value.length > 200) {
        return;
      }

      setInput(
        produce(input, (draft: PostFormType) => {
          draft[key] = e.target.value;
        }),
      );
    },
    [input],
  );

  const onChangeSelect = useCallback(
    (e: SelectChangeEvent) => {
      const key = e.target.name as 'rankType' | 'position';
      if (key === 'rankType') {
        setInput(
          produce(input, (draft) => {
            draft.rankType = e.target.value as PostRankType;
          }),
        );
      } else if (key === 'position') {
        setInput(
          produce(input, (draft) => {
            draft.position = e.target.value as PostRoleType;
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
              <InputLabel id="rankType">게임 타입</InputLabel>
              <Select
                name="rankType"
                id="rankType"
                value={input.rankType}
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
                name="position"
                id="position"
                value={input.position}
                label="포지션"
                onChange={onChangeSelect}
              >
                <MenuItem value="모든 포지션">모든 포지션</MenuItem>
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
            name="body"
            value={input.body}
            onChange={onChangeInput}
            className={styles.text}
            placeholder="200자 이내 내용"
            label="본문"
            fullWidth
            multiline
            rows={4}
          />
          <div className={styles.button}>
            <LoadingButton
              variant="contained"
              type="submit"
              disabled={blockSubmit}
              className={styles.submit}
              loading={isLoading}
            >
              등록
            </LoadingButton>
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
