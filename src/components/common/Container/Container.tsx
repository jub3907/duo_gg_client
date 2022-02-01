import styles from './Container.module.scss';
import { ReactNode } from 'react';
import cn from 'classnames';

type Props = {
  children: ReactNode;
  container?: string;
  layout?: string;
};

const Container = ({ children, container, layout }: Props) => {
  return (
    <div className={cn(styles.container, container)}>
      <div className={cn(styles.inner, layout)}>{children}</div>
    </div>
  );
};

export default Container;
