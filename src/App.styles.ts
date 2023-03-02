import { styled } from 'solid-styled-components';

interface IStyledAppProps {

}

export const StyledApp = styled('div') <IStyledAppProps>`
  height: 100vh;
  display: flex;
  overflow: auto;

  .content {
    width: 100%;
  }
`;