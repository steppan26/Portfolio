import React from 'react';
import styled from 'styled-components';
import { Sizes } from '../Utilities';

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

const Main = styled.main`
/*   margin-top: ${ Sizes.navbarHeight }; */
  width: 100vw;
  padding: 1rem clamp(1rem, 5vw, 75px);
`
