import SubHeader from '@common/Header/SubHeader';
import Layout from '@common/Layout/Layout';
import PageTitleLayout from '@common/Layout/PageTitleLayout';
import ErrorToast from '@common/Toast/ErrorToast';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import DuoCard from '@pages/Duo/Card/DuoCard';
import styles from '@pages/Duo/DuoPage.module.scss';
import DuoModal from '@pages/Duo/Modal/DuoModal';
import apiPath from 'config/apiPath';
import { addPosts, initPosts, selectPostState } from 'lib/slice/postSlice';
import { PostType } from 'lib/types/post';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DuoPage = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(selectPostState);
  const [modalOpen, setModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const fetchPost = (offset: number, limit: number) => {
    setIsLoading(true);
    const uri = apiPath.base + apiPath.duo + `?offset=${offset}&limit=${limit}`;

    fetch(uri, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          setIsError(true);
          setIsLoading(false);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        console.log('posts: ', data);
        setIsLoading(false);
        dispatch(addPosts(data));
      });
  };

  useEffect(() => {
    fetchPost(0, 6);
  }, []);

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
                key={`duo-card-${post.createdDate}-${index}`}
              />
            );
          })}
        </div>
        <div className={styles.fetch}>
          <LoadingButton
            fullWidth
            onClick={() => {
              fetchPost(posts.length, 6);
            }}
            className={styles['fetch-button']}
            loading={isLoading}
            variant="contained"
          >
            더보기
          </LoadingButton>
        </div>
      </PageTitleLayout>

      <DuoModal closeModal={closeModal} open={modalOpen} />
    </Layout>
  );
};

export default DuoPage;
