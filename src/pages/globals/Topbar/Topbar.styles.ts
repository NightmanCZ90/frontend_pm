import { styled } from 'solid-styled-components';

interface IStyledTopbarProps {

}

export const StyledTopbar = styled("nav") <IStyledTopbarProps>`
  display: flex;
  justify-content: flex-end;
  height: 69px;
  padding: 16px;
  position: sticky;
`;