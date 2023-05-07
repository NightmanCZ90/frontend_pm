import { styled } from 'solid-styled-components';

interface IStyledAppProps {

}

export const StyledApp = styled('div') <IStyledAppProps>`
  height: 100vh;
  display: flex;
  overflow-x: hidden;
  
  main {
    flex: 1;
    height: 100vh;
    overflow: hidden;
    
    .content {
      /* Topbar height */
      height: calc(100% - 69px);
      overflow-y: auto;
    }
  }
`;