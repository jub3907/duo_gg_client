import { ReactElement, ReactNode } from 'react';
import styles from './List.module.scss';

type Props = {
  title: string;
  button?: ReactElement;
  contents: ReactElement;
};
const List = ({ title, button, contents }: Props) => {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>{title}</div>
      {contents}
      {button}
    </div>
  );
};

export default List;
