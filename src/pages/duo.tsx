import SubHeader from '@common/Header/SubHeader';
import Layout from '@common/Layout/Layout';
import PageTitleLayout from '@common/Layout/PageTitleLayout';
import { Button } from '@mui/material';
import styles from '@pages/Duo/DuoPage.module.scss';
import DuoModal from '@pages/Duo/Modal/DuoModal';
import { useCallback, useState } from 'react';

const posts = [
  {
    createdAt: 1643438988703,
    name: '21세기광부',
    text: '듀오 구해요',
    title: '솔로랭크 실버3 포지션 상관없이 구함',
  },
  {
    createdAt: 1643439002202,
    name: '21세기광부',
    text: '듀오 구해요',
    title: '자유랭크 실버3 포지션 상관없이 구함',
  },
  {
    createdAt: 1643439007827,
    name: '21세기광부',
    text: '듀오 구해요',
    title: '자유랭크 실버3 탑',
  },
  {
    createdAt: 1643439009265,
    name: '21세기광부',
    text: '듀오 구해요',
    title: '자유랭크 실버3 탑',
  },
  {
    createdAt: 1643439010210,
    name: '21세기광부',
    text: '듀오 구해요',
    title: '자유랭크 실버3 탑',
  },
  {
    createdAt: 1643439011326,
    name: '21세기광부',
    text: '듀오 구해요',
    title: '자유랭크 실버3 탑',
  },
  {
    createdAt: 1643439013107,
    name: '21세기광부',
    text: '듀오 구해요',
    title: '자유랭크 실버3 탑',
  },
];

const DuoPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  return (
    <Layout subHeader={<SubHeader />} activeMenu="duo">
      <PageTitleLayout title="듀오 신청">
        <div className={styles.button}>
          <Button onClick={openModal}>듀오 신청</Button>
        </div>
      </PageTitleLayout>

      <DuoModal closeModal={closeModal} open={modalOpen} />
    </Layout>
  );
};

export default DuoPage;
