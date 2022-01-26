import styles from './Image.module.scss';
import NextImage, { ImageProps } from 'next/image';
import cn from 'classnames';

type Props = {
  className?: string;
  variant: 'rect' | 'circle';
} & ImageProps;

const Image = ({ className, variant = 'rect', src, ...props }: Props) => {
  return (
    <NextImage
      src={src}
      className={cn(className, {
        [styles.circle]: variant === 'circle',
      })}
      {...props}
    />
  );
};

export default Image;
