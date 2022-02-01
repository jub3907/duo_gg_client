/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { width } from '@mui/system';

type Props = {
  color: string;
  flexLength?: number;
  text?: string;
  width?: string;
  className?: string;
};

const Graph = ({ color, flexLength, text, width, className }: Props) => {
  return (
    <div
      css={{
        flex: flexLength,
        width: width,
        backgroundColor: color,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className={className}
    >
      {text}
    </div>
  );
};

export default Graph;
