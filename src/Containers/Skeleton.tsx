import React from 'react';
import styled from 'styled-components';

interface Props {
  children: any
};

export const Skeleton: React.FC<Props> = ({ children }) => {
  return(
    <Main>
      {children}
    </Main>
  )
}

/* export default Skeleton */

// STYLES

const Main = styled.main`
  width: 100vw;
  padding-inline: 5vw;
`
