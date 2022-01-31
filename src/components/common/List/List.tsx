import ReloadButton from '@common/Button/ReloadButton';
import CircularLoading from '@common/Loading/CircularLoading';
import { ReactElement, ReactNode } from 'react';
import styles from './List.module.scss';

type Props = {
  title: string;
  button?: ReactElement;
  contents: ReactElement;
  error: Error;
  loading: boolean;
  reloadButton: ReactElement;
};
const List = ({
  title,
  button,
  contents,
  error,
  loading,
  reloadButton,
}: Props) => {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>{title}</div>
      {error ? reloadButton : loading ? <CircularLoading /> : contents}
      {button}
    </div>
  );
};

export default List;
