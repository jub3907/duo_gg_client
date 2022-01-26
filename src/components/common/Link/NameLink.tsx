import { getSummonerTotalUrl } from 'config/path';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  name: string;
  children?: ReactNode;
};

const NameLink = ({ className, name, children }: Props) => {
  return (
    <Link href={getSummonerTotalUrl(name)}>
      <a className={className}>{children ? children : name}</a>
    </Link>
  );
};

export default NameLink;
