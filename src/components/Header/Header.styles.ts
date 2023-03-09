import { styled } from 'solid-styled-components';

interface IStyledHeaderProps {

}

export const StyledHeader = styled('div') <IStyledHeaderProps>`
  margin-bottom: 30px;

  h2 {
    margin-bottom: 5px;
    text-transform: uppercase;
  }
`;