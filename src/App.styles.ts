import { styled } from 'solid-styled-components';

interface IStyledAppProps {

}

export const StyledApp = styled('div') <IStyledAppProps>`
  height: 100vh;
  display: flex;
  
  main {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    
    .content {
      /* Topbar height */
      height: calc(100% - 69px);
      overflow-y: auto;
    }
  }
`;