/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

type Props = {
  color: string;
  flexLength: number;
  text?: string;
};

const Graph = ({ color, flexLength, text }: Props) => {
  return (
    <div
      css={{
        flex: flexLength,
        backgroundColor: color,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {text}
    </div>
  );
};

export default Graph;
