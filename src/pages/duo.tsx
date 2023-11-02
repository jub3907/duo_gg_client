import SubHeader from '@common/Header/SubHeader';
import Layout from '@common/Layout/Layout';
import PageTitleLayout from '@common/Layout/PageTitleLayout';
import ErrorToast from '@common/Toast/ErrorToast';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import DuoCard from '@pages/Duo/Card/DuoCard';
import styles from '@pages/Duo/DuoPage.module.scss';
import DuoModal from '@pages/Duo/Modal/DuoModal';
import { addPosts, initPosts, selectPostState } from 'lib/slice/postSlice';
import { PostType } from 'lib/types/post';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DuoPage = () => {
  const dispatch = useDispatch();
  const { createdAt, posts } = useSelector(selectPostState);
  const [modalOpen, setModalOpen] = useState(false);

  // const [postQuery, { loading }] = useLazyQuery<{ posts: PostType[] }>(POSTS, {
  //   onCompleted: ({ posts }) => {
  //     if (posts.length > 0) {
  //       dispatch(addPosts(posts));
  //     }
  //   },
  //   onError: (e) => {
  //     ErrorToast('포스트를 불러오는데 실패했습니다.');
  //   },
  // });

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  // const fetchPost = useCallback(async () => {
  //   await postQuery({ variables: { createdAt, limit: 6 } });
  // }, [createdAt, postQuery]);

  // useEffect(() => {
  //   fetchPost();
  // }, []);

  return (
    <Layout subHeader={<SubHeader />} activeMenu="duo">
      <PageTitleLayout title="듀오 신청">
        <div className={styles.button}>
          <Button variant="contained" onClick={openModal}>
            듀오 신청
          </Button>
        </div>

        <div className={styles.grid}>
          {posts.map((post, index) => {
            return (
              <DuoCard
                post={post}
                key={`duo-card-${post.createdAt}-${index}`}
              />
            );
          })}
        </div>
        <div className={styles.fetch}>
          {/* <LoadingButton
            fullWidth
            onClick={fetchPost}
            className={styles['fetch-button']}
            loading={loading}
            variant="contained"
          >
            더보기
          </LoadingButton> */}
        </div>
      </PageTitleLayout>

      <DuoModal closeModal={closeModal} open={modalOpen} />
    </Layout>
  );
};

export default DuoPage;
